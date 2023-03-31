package models

import "time"

type User struct {
	ID        int                   `json:"id"`
	Name      string                `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Email     string                `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password  string                `json:"password" form:"password" gorm:"type: varchar(255)"`
	Profile   ProfileResponse       `json:"profile"`
	Products  []ProductUserResponse `json:"products"`
	Role      string                `json:"role"`
	CreatedAt time.Time             `json:"-"`
	UpdatedAt time.Time             `json:"-"`
}

type UsersProfileResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
