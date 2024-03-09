package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase()  {
	dsn := "root:@tcp(localhost:3306)/pkk"
	database, err := gorm.Open(mysql.Open(dsn))
	if err != nil {
		panic(err)
	}

	database.AutoMigrate(&Siswa{})

	DB = database
}