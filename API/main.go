package main

import(
    "log"
    "net/http"
	"github.com/gorilla/mux"
	"API/app"
	"API/controllers"
)

func main() {
	router := mux.NewRouter()
	recipieController.people = append(recipies, Recipie{ID: "1", Firstname: "John", Lastname: "Doe", Address: &Address{City: "City X", State: "State X"}})
	router.HandleFunc("/recipies", GetRecipies).Methods("GET")
    router.HandleFunc("/recipies/{id}", GetRecipie).Methods("GET")
    router.HandleFunc("/recipies/{id}", CreateRecipie).Methods("POST")
    router.HandleFunc("/recipies/{id}", DeleteRecipie).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":8000", router))
}
