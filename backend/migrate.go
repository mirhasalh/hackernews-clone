package main

import (
	"github.com/mirhasalh/hackernews-clone/backend/config"
	"github.com/mirhasalh/hackernews-clone/backend/db/models"
)

func main() {
	config.ConnectDB()
	config.DB.AutoMigrate(&models.Post{}, &models.User{})
}
