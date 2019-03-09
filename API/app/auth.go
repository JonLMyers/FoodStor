package app

import (
	"net/http"
	u "lens/utils"
	"strings"
	"go-contacts/models"
	jwt "github.com/dgrijalva/jwt-go"
	"os"
	"context"
	"fmt"
)
//https://medium.com/@adigunhammedolalekan/build-and-deploy-a-secure-rest-api-with-go-postgresql-jwt-and-gorm-6fadf3da505b
var JwtAuthentication = func(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//List of non auth'd endpoints
		notAuth := []string{"/api/user/new", "/api/user/login"} 
		requestPath := r.URL.Path

		//serve request if it does not need authentication
		for _, value := range notAuth {
			if value == requestPath {
				next.ServeHTTP(w, r)
				return
			}
		}

		response := make(map[string] interface{})
		tokenHeader := r.Header.Get("Authorization") //Grab the token from the header

		// Token is missing, returns with error code 403 Unauthorized
		if tokenHeader == "" { 
			response = u.Message(false, "No Authentication token")
			w.WriteHeader(http.StatusForbidden)
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, response)
			return
		}

		//The token normally comes in format `Bearer {token-body}`, we check if the retrieved token matched this requirement
		splitted := strings.Split(tokenHeader, " ")
		if len(splitted) != 2 {
			response = u.Message(false, "Invalid/Malformed auth token")
			w.WriteHeader(http.StatusForbidden)
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, response)
			return
		}

		//Grab the token part, what we are truly interested in
		tokenPart := splitted[1] 
		tk := &models.Token{}

		token, err := jwt.ParseWithClaims(tokenPart, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("token_password")), nil
		})

		//Malformed token, returns with http code 403 as usual
		if err != nil { 
			response = u.Message(false, "Malformed authentication token")
			w.WriteHeader(http.StatusForbidden)
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, response)
			return
		}

		//Token is invalid, maybe not signed on this server
		if !token.Valid { 
			response = u.Message(false, "Token is not valid.")
			w.WriteHeader(http.StatusForbidden)
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, response)
			return
		}

		//Everything went well, proceed with the request and set the caller to the user retrieved from the parsed token
		fmt.Sprintf("User %", tk.Username) //Some debugging
		ctx := context.WithValue(r.Context(), "user", tk.UserId)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r) 
	});
}