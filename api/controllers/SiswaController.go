package controllers

import (
	"api/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Create(c *gin.Context) {
	var siswa models.Siswa

	if err := c.ShouldBindJSON(&siswa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Create(&siswa)
	c.JSON(http.StatusOK, gin.H{"siswa": siswa})
}

func Delete(c *gin.Context) {
	var siswa models.Siswa

	if err := c.ShouldBindJSON(&siswa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Delete(&siswa)
	c.JSON(http.StatusOK, gin.H{"message": "Siswa deleted successfully"})
}

func GetAll(c *gin.Context) {
	var siswa []models.Siswa

	models.DB.Find(&siswa)
	c.JSON(http.StatusOK, gin.H{"siswa": siswa})
}

func Update(c *gin.Context) {
	var siswa models.Siswa

	if err := c.ShouldBindJSON(&siswa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Save(&siswa)
	c.JSON(http.StatusOK, gin.H{"siswa": siswa})
}
