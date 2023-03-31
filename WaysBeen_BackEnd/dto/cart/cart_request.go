package dto

type CreateRequestCart struct {
	ID            int `json:"id"`
	OrderQuantity int `json:"orderQuantity"`
}
