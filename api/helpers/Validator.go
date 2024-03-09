package helpers

import (
	"fmt"
	"github.com/go-playground/validator/v10"
)

func GenerateValidationResponse(err error) (errorMessages []string) {
	for _, e := range err.(validator.ValidationErrors) {
		errorMessage := fmt.Sprintf("Field %s is %s", e.Field(), e.ActualTag())
		errorMessages = append(errorMessages, errorMessage)
	}

	return errorMessages
}