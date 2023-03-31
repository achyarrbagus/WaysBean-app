package models

import (
	"time"
)

type Transaction struct {
	ID         int                  `json:"id" gorm:"primary_key:auto_increment"`
	UserID     int                  `json:"user_id" gorm:"type:int"`
	Name       string               `json:"name" gorm:"type:varchar(225)"`
	Email      string               `json:"email" gorm:"type:varchar(225)"`
	Phone      string               `json:"phone" gorm:"type:varchar(225)"`
	TotalPrice int                  `json:"price"`
	Address    string               `json:"address"`
	Date       time.Time            `json:"date"`
	Status     string               `json:"status" gorm:"type:varchar(225)"`
	User       UsersProfileResponse `json:"user"`
	Cart       []CartResponse       `json:"cart"`
	CreatedAt  time.Time            `json:"created_at"`
	UpdatedAt  time.Time            `json:"updated_at"`
}

type TransactionUserResponse struct {
	ID int `json:"transaction_id"`
}

type TransactionResponse struct {
	ID   int       `json:"id"`
	Date time.Time `json:"date"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}

func (TransactionUserResponse) TableName() string {
	return "transactions"
}
