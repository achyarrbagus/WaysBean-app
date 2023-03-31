package handlers

import (
	profiledto "backEnd/dto/profile"
	dto "backEnd/dto/result"
	"context"
	"fmt"
	"os"

	// usersdto "backEnd/dto/users"
	"backEnd/models"
	"backEnd/repositories"

	"net/http"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) UpdateProfile(c echo.Context) error {
	// request := new(profiledto.UpdateProfileRequest)
	// getting id from param
	id, _ := strconv.Atoi(c.Param("id"))
	profil, err := h.ProfileRepository.GetProfile(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	// get data file
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	// getting value from form file
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Waysbeen"})

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	numberPhone := c.FormValue("phone")
	profileUpdate := models.Profile{
		ID:      id,
		Photo:   resp.SecureURL,
		Phone:   numberPhone,
		Gender:  c.FormValue("gender"),
		Address: c.FormValue("address"),
		UserID:  profil.UserID,
	}
	data, err := h.ProfileRepository.UpdateProfile(profileUpdate)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})

	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})

}

func (h *handlerProfile) CreateProfil(c echo.Context) error {
	request := new(profiledto.CreateProfileRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// data form pattern submit to pattern entity db user
	profil := models.Profile{
		Gender:  request.Gender,
		Address: request.Address,
	}

	data, err := h.ProfileRepository.CreateProfil(profil)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProfile(data)})
}

func (h *handlerProfile) FindProfile(c echo.Context) error {
	profil, err := h.ProfileRepository.FindProfile()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: profil})
}

func (h *handlerProfile) GetProfile(c echo.Context) error {
	// id, _ := strconv.Atoi(c.Param("id"))
	loginUser := c.Get("userLogin")
	isLoginUser := loginUser.(jwt.MapClaims)["id"].(float64)

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(int(isLoginUser))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProfile(profile)})
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:      u.ID,
		Gender:  u.Gender,
		Address: u.Address,
		User:    u.User,
		Phone:   u.Phone,
		Photo:   u.Photo,
	}
}
