package main

import (
	"fmt"
	"log"

	"github.com/labstack/echo/v4"
	practicesql "github.com/ut-code/security/practice-sql/practice-sql"
)

const PORT uint16 = 4000

func main() {
	e := echo.New()

	e.Static("/", "./build")

	practicesql.Route(e.Group("/practice-sql"))

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello from Echo!")
	})

	if err := e.Start(":" + fmt.Sprint(PORT)); err != nil {
		log.Fatalln(err)
	}
}
