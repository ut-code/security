package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ut-code/security/services/sql"
)

var PORT uint16 = 3000

func init() {
	port := os.Getenv("PORT")
	if port != "" {
		port, err := strconv.Atoi(port)
		if err != nil {
			log.Fatalln(err)
		}
		PORT = uint16(port)
	}

	godotenv.Load()
	var allowOrigins = strings.Split(os.Getenv("CORS_ALLOW_ORIGINS"), ",")
	fmt.Println("[debug] allowOrigins:", allowOrigins)
	cors = middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: allowOrigins,
	})
}

var cors echo.MiddlewareFunc

func main() {
	e := echo.New()
	e.Use(cors)

	e.Pre(middleware.AddTrailingSlash())
	e.GET("/services/sql/search/", sql.Search)
	e.Static("/", "./dist")

	if err := e.Start(":" + fmt.Sprint(PORT)); err != nil {
		log.Fatalln(err)
	}
}
