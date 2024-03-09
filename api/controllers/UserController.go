package controllers

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"strconv"
	"time"
)

func Login(c *gin.Context) {
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if c.Request.Method != "POST" {
		c.String(http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	username := c.PostForm("username")
	password := c.PostForm("password")

	if username == "admin" && password == "admin" {
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(1)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})

		secretKey := os.Getenv("secret")
		token, err := claims.SignedString([]byte(secretKey))

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Could not login",
			})
		}

		session := sessions.Default(c)
		session.Set("jwt", token)
		session.Save()

		c.SetCookie("jwt", token, 3600, "/", "", false, true)
		c.JSON(http.StatusOK, gin.H{
			"message": "Login Successfully",
			"token":   token,
		})

	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username or Password is incorrect"})
	}
}

func User(c *gin.Context) {
	cookie, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized: JWT Cookie not found",
		})
		return
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		secretKey := os.Getenv("secret")
		return []byte(secretKey), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized: Failed to parse JWT",
		})
		return
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized: Invalid JWT",
		})
		return
	}

	claims := token.Claims
	c.JSON(http.StatusOK, claims)
}

func Logout(c *gin.Context) {
	c.SetCookie("jwt", "", 0, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "Logout Successfully",
	})
}
