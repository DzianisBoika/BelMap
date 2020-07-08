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
		"NBv8u4VsQmxwsYE9wQlAKnrTY",
		"8Zgi10TR3qzvGH1PqHVnMGBQx0EY0okyNzfxneZ7Us62EDihNQ")
	token := oauth1.NewToken(
		"1088155195123662848-22n7PR66IJC3aS8oMA1AdvL2NyPsUR",
		"qjW5jQfnYuO5kaQxvl1JEgulxT9Z0BRpU7Yiyuurv84wF")

	enableCors(&w)

	// http.Client will automatically authorize Requests
	httpClient := config.Client(oauth1.NoContext, token)

	// Twitter client
	client := twitter.NewClient(httpClient)

	var place int64 = 23424765 //Belarus

	trends, _, err := client.Trends.Place(place, &twitter.TrendsPlaceParams{})

	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < len(trends); i++ {
		for j := 0; j < 10; j++ {
			fmt.Println(trends[i].Trends[j].Name)
		}
	}
	json.NewEncoder(w).Encode(trends)
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	http.HandleFunc("/", getTrends)

	http.ListenAndServe(":8080", nil)
}
