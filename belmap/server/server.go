package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

func getTrends(w http.ResponseWriter, req *http.Request) {
	config := oauth1.NewConfig(
		"YmxsBUxEX6RtY4YPFNAuO6wYx",
		"Dp5VZreWr4H3RVjFqykpjS8s2kzZ9Xl6SxJrFiipxAwiSmgubd")
	token := oauth1.NewToken(
		"1088155195123662848-Fpl4TrcsCAUKYdsb1wiFotcggwN1DB",
		"qITnWW0LiRr5kYy6LMTowoqelHabjfVicAgZoOpfuJZIl")

	enableCors(&w)

	// http.Client will automatically authorize Requests
	httpClient := config.Client(oauth1.NoContext, token)

	// Twitter client
	client := twitter.NewClient(httpClient)

	// var place int64 = 824382 //Belarus 23424765
	var place int64 = 825978 //Belarus 23424765

	trends, _, err := client.Trends.Place(place, &twitter.TrendsPlaceParams{})

	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < len(trends); i++ {
		for j := 0; j < 10; j++ {
			fmt.Println(trends[i].Locations)
		}
		json.NewEncoder(w).Encode(trends)
	}
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	http.HandleFunc("/", getTrends)
	http.ListenAndServe(":8080", nil)
	// port := os.Getenv("PORT")
	// http.ListenAndServe(":"+port, nil)
}
