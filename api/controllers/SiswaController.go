package controllers

import (
	"api/helpers"
	"api/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetAll(c *gin.Context) {
	var siswa []models.Siswa
	models.DB.Find(&siswa)
	c.JSON(http.StatusOK, siswa)
}

func Create(c *gin.Context) {
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if c.Request.Method != "POST" {
		c.String(http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	nis := c.PostForm("nis")
	fullname := c.PostForm("name")
	gender := c.PostForm("gender")
	address := c.PostForm("address")
	phone_number := c.PostForm("phone_number")

	if nis == "" || fullname == "" || gender == "" || address == "" || phone_number == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	var existingSiswa models.Siswa
	if err := models.DB.Where("nis = ?", nis).First(&existingSiswa).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NIS already exists"})
		return
	}

	newSiswa := models.Siswa{
		NIS:         nis,
		Name:        fullname,
		Gender:      gender,
		Address:     address,
		PhoneNumber: phone_number,
	}

	if err := models.DB.Create(&newSiswa).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new siswa"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Siswa created successfully"})
}

func Update(c *gin.Context) {
	nis := c.Param("nis")
	
	var siswa models.Siswa
	err := c.ShouldBind(&siswa)
	if err != nil {
		errorMessage := helpers.GenerateValidationResponse(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": errorMessage,
		})
		return
	}

	fullname := c.PostForm("fullname")
	gender := c.PostForm("gender")
	address := c.PostForm("address")
	phonenumber := c.PostForm("phone_number")

	siswa.NIS = nis
	siswa.Name = fullname
	siswa.Gender = gender
	siswa.Address = address
	siswa.PhoneNumber = phonenumber

	result := models.DB.Model(&siswa).Where("nis = ?", nis).Updates(&siswa)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Siswa updated",
		"siswa":   siswa,
	})
}


func DeleteSiswaByNIS(c *gin.Context) {
	result := models.DB.Delete(&models.Siswa{}, c.Param("nis"))
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message":
		"Siswa deleted successfully"})
}

type Siswa struct {
	NIS         string `json:"nis"`
	Name        string `json:"name"`
	Gender      string `json:"gender"`
	Address     string `json:"address"`
	PhoneNumber string `json:"phone_number"`
}

func GetSiswaByNIS(c *gin.Context) {
	var siswa Siswa
	nis := c.Param("nis")

	result := models.DB.First(&siswa, "nis = ?", nis)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Siswa not found"})
		return
	}

	c.JSON(http.StatusOK, siswa)
}