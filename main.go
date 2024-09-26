package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	practicesql "github.com/ut-code/security/practice-sql/practice-sql"
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
}

func main() {
	e := echo.New()
	e.Pre(middleware.AddTrailingSlash())

	e.Static("/", "./build")

	practicesql.Route(e.Group("/practice-sql"))

	if err := e.Start(":" + fmt.Sprint(PORT)); err != nil {
		log.Fatalln(err)
	}
}
