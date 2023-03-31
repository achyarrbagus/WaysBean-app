package handlers

import (
	productsdto "backEnd/dto/products"
	dto "backEnd/dto/result"
	"backEnd/models"
	"context"
	"fmt"
	"os"
	"strconv"

	"backEnd/repositories"
	"net/http"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandleProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) GetProduct(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(product)})
}

func (h *handlerProduct) FindProduct(c echo.Context) error {
	product, err := h.ProductRepository.FindProduct()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {

	request := new(productsdto.CreateProductRequset)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// get data file
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	// get jwt tokens witk key "id"
	loginUser := c.Get("userLogin")
	isLoginUser := loginUser.(jwt.MapClaims)["id"].(float64)

	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("stock"))
	// category_id, _ := strconv.Atoi(c.FormValue("category_id"))
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Waysbeen"})

	if err != nil {
		fmt.Println(err.Error())
	}
	product := models.Product{
		Name:        c.FormValue("name"),
		Price:       price,
		Description: c.FormValue("desc"),
		Stock:       qty,
		Photo:       resp.SecureURL,
		UserID:      int(isLoginUser),
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})

	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(data)})

}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	data, err := h.ProductRepository.DeleteProduct(product)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(data)})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {

	//geting id from params
	id, _ := strconv.Atoi(c.Param("id"))
	product, _ := h.ProductRepository.GetProduct(id)

	// get data file
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	//
	// category_id, _ := strconv.Atoi(c.FormValue("category_id"))
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Waysbeen"})

	//getting value from form file
	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("stock"))
	name := c.FormValue("name")
	description := c.FormValue("description")
	//

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// if request.Name != "" {
	// 	product.Name = c.FormValue("name")
	// }

	// if request.Price != "" {
	// 	product.Price = price
	// }

	// if request.Photo != "" {
	// 	product.Photo = dataFile
	// }
	// if request.Stock != "" {
	// 	product.Stock = qty
	// }
	// if request.Description != "" {
	// 	product.Description = c.FormValue("description")
	// }

	productUpdate := models.Product{
		ID:          id,
		Name:        name,
		Description: description,
		Price:       price,
		Stock:       qty,
		Photo:       resp.SecureURL,
		UserID:      product.UserID,
	}

	data, err := h.ProductRepository.UpdateProduct(productUpdate)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})

}

func convertProduct(u models.Product) productsdto.ProductResponse {
	return productsdto.ProductResponse{
		Name:        u.Name,
		Description: u.Description,
		Price:       u.Price,
		Stock:       u.Stock,
		Photo:       u.Photo,
	}
}
