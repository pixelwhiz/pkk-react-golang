package models

import (
	"time"
)

type Siswa struct {
	NIS          uint      `gorm:"primaryKey" json:"nis"`
	Name         string    `gorm:"type:varchar(191);not null" json:"name"`
	JenisKelamin string    `gorm:"column:jenis_kelamin;type:varchar(191);not null" json:"jenis_kelamin"`
	Alamat       string    `gorm:"type:varchar(191);not null" json:"alamat"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}


type Siswas []Siswa