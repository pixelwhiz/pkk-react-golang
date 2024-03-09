package models

type Siswa struct {
	NIS         string    `gorm:"primaryKey" json:"nis"`
	Name        string    `gorm:"type:varchar(191);not null" json:"name"`
	Gender      string    `gorm:"column:gender;type:varchar(191);not null" json:"gender"`
	Address     string    `gorm:"type:varchar(191);not null" json:"address"`
	PhoneNumber string    `gorm:"type:varchar(20);not null" json:"phone_number"`
}

type siswa []siswa
