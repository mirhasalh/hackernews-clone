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

	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	auth.GET("/protected", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "This is a protected route"})
	})

	r.Run(":8080")
}
