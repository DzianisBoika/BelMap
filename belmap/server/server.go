package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

func getTrends(w http.ResponseWriter, req *http.Request) {
	config := oauth1.NewConfig(
		"t1QH6skWrmz7h6VYfI5F6Gp1G",
		"eLrOM1nOU2rM3JdhE4zNHM4DN7urH73srD2YoxfGwhGSboprfR")
	token := oauth1.NewToken(
		"1088155195123662848-be4Tq1eft4AIWOfksttsAWRDUWOdNB",
		"YXBcqX52lT1YmtcM5s6FSvA3Ty6k6UhK9tbMv87ASkrLa")

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
	port := os.Getenv("PORT")
	http.HandleFunc("/", getTrends)
	http.ListenAndServe(":"+port, nil)
}
