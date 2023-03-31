package routes

import (
	"backEnd/handlers"
	"backEnd/pkg/middleware"
	"backEnd/pkg/mysql"
	"backEnd/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	profilRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerAuth(authRepository, profilRepository)

	e.POST("/login", h.Login)
	e.POST("/register", h.Register)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))

}
