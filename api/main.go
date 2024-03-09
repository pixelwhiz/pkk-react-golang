package main

import (
	"api/controllers"
	"api/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/handlers"
	"net/http"
	"os"
	"time"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	secretKey := os.Getenv("secret")
	store := cookie.NewStore([]byte(secretKey))
	store.Options(sessions.Options{
		HttpOnly: true,
		MaxAge:   int(time.Hour * 24),
		Path:     "/",
	})
	router.Use(sessions.Sessions("session", store))

	router.POST("/api/login", controllers.Login)
	router.POST("/api/create", controllers.Create)
	router.DELETE("/api/siswa/:nis", controllers.DeleteSiswaByNIS)
	router.GET("/api/get", controllers.GetAll)
	router.POST("/api/update", controllers.Update)
	router.GET("/api/user", controllers.User)
	router.POST("/api/logout", controllers.Logout)

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origin := handlers.AllowedOrigins([]string{"http://localhost:3000", "http://192.168.0.222:3000"})
	credentials := handlers.AllowCredentials()

	http.ListenAndServe(":8000", handlers.CORS(headers, methods, origin, credentials)(router))
}

func ParseBodyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			http.Error(w, "Failed to parse request body", http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	})
}
