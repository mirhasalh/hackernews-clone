package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mirhasalh/hackernews-clone/backend/config"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()
	config.ConnectRedis()

	r := gin.Default()

	// Basic test route
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hacker News Clone API"})
	})

	port := os.Getenv("PORT")
	log.Println("Server running on port", port)
	r.Run(":" + port)
}
