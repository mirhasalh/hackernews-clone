package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mirhasalh/hackernews-clone/backend/config"
	"github.com/mirhasalh/hackernews-clone/backend/db/models"
)

// CreatePost allows an authenticated user to submit a post
func CreatePost(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Default values
	post.Score = 0 // Initial score
	post.CreatedAt = post.CreatedAt.UTC()

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post created", "post": post})
}

// GetPosts fetches all posts sorted by Score (Highest first)
func GetPosts(c *gin.Context) {
	var posts []models.Post
	config.DB.Order("score DESC").Find(&posts) // Order by highest score
	c.JSON(http.StatusOK, gin.H{"posts": posts})
}

// GetPost fetches a single post by ID
func GetPost(c *gin.Context) {
	var post models.Post
	id, _ := strconv.Atoi(c.Param("id"))

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"post": post})
}

// UpvotePost increases the score of a post
func UpvotePost(c *gin.Context) {
	var post models.Post
	id, _ := strconv.Atoi(c.Param("id"))

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	post.Score++
	config.DB.Save(&post)

	c.JSON(http.StatusOK, gin.H{"message": "Post upvoted", "post": post})
}

// DownvotePost decreases the score of a post
func DownvotePost(c *gin.Context) {
	var post models.Post
	id, _ := strconv.Atoi(c.Param("id"))

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	post.Score--
	config.DB.Save(&post)

	c.JSON(http.StatusOK, gin.H{"message": "Post downvoted", "post": post})
}
