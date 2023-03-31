package models

import (
	"time"
)

type Profile struct {
	ID        int                  `json:"id" gorm:"primary_key:auto_increment"`
	Email     string               `json:"email" gorm:"type: varchar(225)"`
	Photo     string               `json:"photo" form:"photo"`
	Phone     string               `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Gender    string               `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Address   string               `json:"address" form:"address" gorm:"type: text"`
	UserID    int                  `json:"user_id"`
	User      UsersProfileResponse `json:"user"`
	CreatedAt time.Time            `json:"-"`
	UpdatedAt time.Time            `json:"-"`
}

// for association relation with another table (user)
type ProfileResponse struct {
	Phone   string `json:"phone"`
	Gender  string `json:"gender"`
	Address string `json:"address"`
	UserID  int    `json:"user_id"`
	Photo   string `json:"photo"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
