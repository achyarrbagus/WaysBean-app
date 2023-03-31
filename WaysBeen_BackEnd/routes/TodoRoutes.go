package routes

import (
	"backEnd/handlers"

	"github.com/labstack/echo/v4"
)

func TodoRoutes(e *echo.Group) {
	e.GET("/", handlers.Home)
	e.GET("/todo", handlers.FindTodos)
	e.GET("/todo/:id", handlers.GetTodo)
	e.POST("/todo", handlers.CreateTodo)
	e.DELETE("/todo/:id", handlers.DeleteTodo)
	e.PATCH("/todo/:id", handlers.UpdateTodo)

}
