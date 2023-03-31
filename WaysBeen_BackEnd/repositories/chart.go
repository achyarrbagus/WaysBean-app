package repositories

import (
	"backEnd/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	CreateCart(cart models.Cart) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error
	return cart, err
}
