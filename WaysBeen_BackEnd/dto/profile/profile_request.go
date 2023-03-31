package profiledto

type CreateProfileRequest struct {
	ID      int    `json:"id" gorm:"primary_key:auto_increment"`
	Phone   int    `json:"phone" gorm:"type: varchar(255)"`
	Gender  string `json:"gender" gorm:"type: varchar(255)"`
	Address string `json:"address" gorm:"type: text"`
}

type UpdateProfileRequest struct {
	ID      int    `json:"id" gorm:"primary_key:auto_increment"`
	Phone   int    `json:"phone" gorm:"type: varchar(255)"`
	Gender  string `json:"gender" gorm:"type: varchar(255)"`
	Address string `json:"address" gorm:"type: varchar(255)"`
	Photo   string `json:"photo" gorm:"type: varchar(255)"`
}
