package routes

import (
	"backEnd/handlers"
	"backEnd/pkg/middleware"
	"backEnd/pkg/mysql"
	"backEnd/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", middleware.Auth(h.FindUsers))
	e.GET("/users/:id", middleware.Auth(h.GetUser))
	e.PATCH("/users/:id", middleware.Auth(h.UpdateUser))
	e.DELETE("/users/:id", middleware.Auth(h.DeleteUser))
}
