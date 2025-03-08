package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty"`
	Title     string         `gorm:"not null" json:"title"`
	URL       string         `gorm:"unique" json:"url"`
	Text      string         `json:"text"`
	Score     int            `json:"score"`
	AuthorID  uint           `json:"authorId"`
}
