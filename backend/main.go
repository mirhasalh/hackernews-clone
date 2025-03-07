package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Define a simple route
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	// Start the server on port 8080
	r.Run(":8080")
}
