package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

func main() {
	config := oauth1.NewConfig(
		"NBv8u4VsQmxwsYE9wQlAKnrTY",
		"8Zgi10TR3qzvGH1PqHVnMGBQx0EY0okyNzfxneZ7Us62EDihNQ")
	token := oauth1.NewToken(
		"1088155195123662848-22n7PR66IJC3aS8oMA1AdvL2NyPsUR",
		"qjW5jQfnYuO5kaQxvl1JEgulxT9Z0BRpU7Yiyuurv84wF")

	// http.Client will automatically authorize Requests
	httpClient := config.Client(oauth1.NoContext, token)

	// Twitter client
	client := twitter.NewClient(httpClient)

	//tweet, resp, err := client.Statuses.Update("OMG MY TWITTER APP WORK!", nil)

	// fmt.Println(tweet)
	// fmt.Println(resp)
	// fmt.Println(err)
	choose := "Get"

	type Todo struct {
		UserID    int    `json:"userId"`
		ID        int    `json:"id"`
		Title     string `json:"title"`
		Completed bool   `json:"completed"`
	}

	switch choose {
	case "Get":
		fmt.Println("1. Performing Http Get...")
		search, resp, err := client.Search.Tweets(&twitter.SearchTweetParams{
			Query: "trends/place",
		})
		var a = resp

		fmt.Println("Hello, Den")

		fmt.Println(search.Statuses)
		fmt.Println("------------------------------------------------------------")
		fmt.Println("------------------------------------------------------------")
		fmt.Println("------------------------------------------------------------")
		fmt.Println("------------------------------------------------------------")
		fmt.Println(a)
		fmt.Println("------------------------------------------------------------")
		fmt.Println(err)

	case "Post":

		fmt.Println("2. Performing Http Post...")
		todo := Todo{1, 2, "lorem ipsum dolor sit amet", true}
		jsonReq, err := json.Marshal(todo)
		resp, err := http.Post("https://jsonplaceholder.typicode.com/todos", "application/json; charset=utf-8", bytes.NewBuffer(jsonReq))
		if err != nil {
			log.Fatalln(err)
		}

		defer resp.Body.Close()
		bodyBytes, _ := ioutil.ReadAll(resp.Body)

		// Convert response body to string
		bodyString := string(bodyBytes)
		fmt.Println(bodyString)

		// Convert response body to Todo struct
		var todoStruct Todo
		json.Unmarshal(bodyBytes, &todoStruct)
		fmt.Printf("%+v\n", todoStruct)

	case "Put":

		fmt.Println("3. Performing Http Put...")
		todo := Todo{1, 2, "lorem ipsum dolor sit amet", true}
		jsonReq, err := json.Marshal(todo)
		req, err := http.NewRequest(http.MethodPut, "https://jsonplaceholder.typicode.com/todos/1", bytes.NewBuffer(jsonReq))
		req.Header.Set("Content-Type", "application/json; charset=utf-8")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Fatalln(err)
		}

		defer resp.Body.Close()
		bodyBytes, _ := ioutil.ReadAll(resp.Body)

		// Convert response body to string
		bodyString := string(bodyBytes)
		fmt.Println(bodyString)

		// Convert response body to Todo struct
		var todoStruct Todo
		json.Unmarshal(bodyBytes, &todoStruct)
		fmt.Printf("API Response as struct:\n%+v\n", todoStruct)

	default:
		fmt.Println("Something go wrong")
	}

}
