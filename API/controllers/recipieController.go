package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
)

type Recipie struct{
	ID			string	`json:"id,omitempty"`
	Title		string	`json:"title,omitempty"`
	Metadata	string	`json:"metadata,omitempty"`
	User		*User	`json:"user,omitempty"`
}
type User struct{
	ID			string	`json:"id,omitempty"`
	Username	string	`json:"username,omitempty"`
}

var recipies []Recipie

func GetRecipies(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(recipies)
}
func GetRecipie(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    for _, item := range recipies {
        if item.ID == params["id"] {
            json.NewEncoder(w).Encode(item)
            return
        }
    }
    json.NewEncoder(w).Encode(&Recipie{})
}
func CreateRecipie(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    var recipie Recipie
    _ = json.NewDecoder(r.Body).Decode(&recipie)
    recipie.ID = params["id"]
    recipies = append(recipies, recipie)
    json.NewEncoder(w).Encode(recipies)
}
func DeleteRecipie(w http.ResponseWriter, r *http.Request) {

}

