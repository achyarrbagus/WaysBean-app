package productsdto

type ProductResponse struct {
	Name        string `json:"name" gorm:"type:varchar(225)"`
	Price       int    `json:"price" gorm:"type:int"`
	Description string `json:"description" gorm:"type:varchar(225)"`
	Stock       int    `json:"stock" gorm:"type:varchar(225)"`
	Photo       string `json:"photo" gorm:"type:varchar(225)"`
}
