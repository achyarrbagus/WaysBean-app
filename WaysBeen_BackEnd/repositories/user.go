package repositories

import (
	"backEnd/models"
	"time"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Exec("INSERT INTO users(name,email,password,created_at,updated_at) VALUES (?,?,?,?,?)", user.Name, user.Email, user.Password, time.Now(), time.Now()).Error

	return user, err
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Preload("Profile").Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User

	err := r.db.Preload("Profile").First(&user, ID).Error

	return user, err
}

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error // Using Save method

	return user, err
}
func (r *repository) DeleteUser(user models.User) (models.User, error) {
	err := r.db.Delete(&user).Error // Using Delete method

	return user, err
}
