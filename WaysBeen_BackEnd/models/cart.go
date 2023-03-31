package models

type Cart struct {
	ID            int                 `json:"id" gorm:"primary_key"`
	OrderQuantity int                 `json:"order_quantity"`
	TransactionID int                 `json:"transaction_id"`
	Transaction   TransactionResponse `json:"transaction"`
	ProductID     int                 `json:"product_id"`
	Product       ProductCartResponse `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type CartResponse struct {
	OrderQuantity int             `json:"order_quantity"`
	ProductID     int             `json:"product_id"`
	Product       ProductResponse `json:"product"  gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	TransactionID int             `json:"-"`
}

func (CartResponse) TableName() string {
	return "carts"
}
