package repositories

import (
	"backEnd/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	GetProfile(ID int) (models.Profile, error)
	FindProfile() ([]models.Profile, error)
	CreateProfil(profil models.Profile) (models.Profile, error)
	UpdateProfile(profil models.Profile) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetProfile(ID int) (models.Profile, error) {
	var profil models.Profile
	err := r.db.Preload("User").First(&profil, ID).Error

	return profil, err
}
func (r *repository) UpdateProfile(profil models.Profile) (models.Profile, error) {
	// err := r.db.Raw("UPDATE products SET name=?, price=?, description=?, stock=?, WHERE id=?", product.Name, product.Price, product.Description, product.Stock, ID).Scan(&product).Error
	err := r.db.Save(&profil).Error

	return profil, err
}

func (r *repository) FindProfile() ([]models.Profile, error) {
	var Profil []models.Profile
	err := r.db.Preload("User").Find(&Profil).Error

	return Profil, err
}

func (r *repository) CreateProfil(profil models.Profile) (models.Profile, error) {
	err := r.db.Create(&profil).Error // Using Create method

	return profil, err
}
