package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mirhasalh/hackernews-clone/backend/config"
	"github.com/mirhasalh/hackernews-clone/backend/handlers"
	"github.com/mirhasalh/hackernews-clone/backend/middleware"
)

func main() {
	config.ConnectDB()

	r := gin.Default()

	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	r.POST("/posts", middleware.AuthMiddleware(), handlers.CreatePost)
	r.GET("/posts", handlers.GetPosts)    // Public
	r.GET("/posts/:id", handlers.GetPost) // Public
	r.POST("/posts/:id/upvote", middleware.AuthMiddleware(), handlers.UpvotePost)
	r.POST("/posts/:id/downvote", middleware.AuthMiddleware(), handlers.DownvotePost)

	r.Run(":8080")
}
