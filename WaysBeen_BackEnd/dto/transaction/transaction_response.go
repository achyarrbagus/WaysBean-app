package transactiondto

type TransactionResponse struct {
	Name       string              `json:"name"`
	Email      string              `json:"email"`
	Phone      string              `json:"phone"`
	Gender     string              `json:"gender"`
	Address    string              `json:"address"`
	Product    []CreateRequestCart `json:"product"`
	TotalPrice int                 `json:"price"`
	Status     string              `json:"status"`
}
