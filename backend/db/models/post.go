package models

import "time"

type Post struct {
	ID        uint   `gorm:"primaryKey"`
	Title     string `gorm:"not null"`
	URL       string `gorm:"unique"`
	Text      string
	Score     int
	AuthorID  uint
	CreatedAt time.Time
	UpdatedAt time.Time
}
