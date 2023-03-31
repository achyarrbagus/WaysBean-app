package productsdto

type CreateProductRequset struct {
	Name        string `json:"name" gorm:"type:varchar(225)"`
	Price       int    `json:"price" gorm:"type:int"`
	Description string `json:"description" gorm:"type:varchar(225)"`
	Stock       int    `json:"stock" gorm:"type:varchar(225)"`
}

type UpdateProductRequest struct {
	Name        string `json:"name"`
	Price       string `json:"price"`
	Description string `json:"description"`
	Stock       string `json:"stock"`
	Photo       string `json:"photo"`
}
