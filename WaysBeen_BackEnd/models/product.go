package models

import "time"

type Product struct {
	ID          int                  `json:"id"`
	Name        string               `json:"name" form:"name" gorm:"type: varchar(255)"`
	Description string               `json:"description" form:"description" gorm:"type: varchar(255)"`
	Price       int                  `json:"price" form:"price" gorm:"type: int"`
	Stock       int                  `json:"stock" form:"stock" gorm:"type: int"`
	Photo       string               `json:"photo" form:"photo" gorm:"type: varchar(255)"`
	UserID      int                  `json:"user_id" form:"user_id"`
	User        UsersProfileResponse `json:"user"`
	Cart        []CartResponse       `json:"-"`
	CreatedAt   time.Time            `json:"created_at"`
	UpdatedAt   time.Time            `json:"updated_at"`
}

type ProductCartResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Price       int    `json:"price"`
	Description string `json:"description"`
	Stock       int    `json:"stock"`
	Photo       string `json:"photo"`
}

type ProductResponse struct {
	ID          int                  `json:"id"`
	Name        string               `json:"name" form:"name"`
	Price       int                  `json:"price" form:"price"`
	Description string               `json:"description" form:"description"`
	Stock       int                  `json:"stock" form:"stock"`
	Photo       string               `json:"photo" form:"photo"`
	UserID      int                  `json:"-"`
	User        UsersProfileResponse `json:"user"`
}

type ProductUserResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Price       int    `json:"price"`
	Description string `json:"description"`
	Stock       int    `json:"stock"`
	Photo       string `json:"photo"`
	UserID      int    `json:"-"`
}

func (ProductCartResponse) TableName() string {
	return "products"
}

func (ProductResponse) TableName() string {
	return "products"
}

func (ProductUserResponse) TableName() string {
	return "products"
}
