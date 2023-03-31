package routes

import (
	"backEnd/handlers"
	"backEnd/pkg/middleware"
	"backEnd/pkg/mysql"
	"backEnd/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	TransactionRepository := repositories.RepositoryTransaction(mysql.DB)
	CartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerTransaction(TransactionRepository, CartRepository)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.GET("/transaction", middleware.Auth(h.FindTransaction))
	e.POST("/notification", h.Notification)
	e.GET("/transaction-user", middleware.Auth(h.GetUserTransaction))

}
