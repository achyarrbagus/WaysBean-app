package transactiondto

type CreateRequestCart struct {
	ID            int `json:"id"`
	OrderQuantity int `json:"orderQuantity"`
}

type CreateTransactionRequest struct {
	Name       string              `json:"name"`
	Email      string              `json:"email"`
	Phone      string              `json:"phone"`
	Gender     string              `json:"gender"`
	Address    string              `json:"address"`
	Product    []CreateRequestCart `json:"products"`
	TotalPrice int                 `json:"price"`
	Status     string              `json:"status"`
}
