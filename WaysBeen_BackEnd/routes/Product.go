package routes

import (
	"backEnd/handlers"
	"backEnd/pkg/middleware"
	"backEnd/pkg/mysql"
	"backEnd/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	ProductRepository := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandleProduct(ProductRepository)

	e.GET("/product", h.FindProduct)
	e.POST("/product", middleware.Auth(middleware.UploadFile(h.CreateProduct)))
	e.GET("/product/:id", h.GetProduct)
	e.PATCH("/product/:id", middleware.Auth(middleware.UploadFile(h.UpdateProduct)))
	e.DELETE("/product/:id", middleware.Auth(h.DeleteProduct))
}
