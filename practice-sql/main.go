package practicesql

import (
	"bytes"
	"html/template"
	"io"
	"log"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var searchTmpl = template.Must(template.ParseFiles("./practice-sql/templates/search.html"))

type Mail struct {
	gorm.Model
	Subject string
	Date    string
	From    string
	ToType  string // ?
	To      string
	Content string
}

func Route(g *echo.Group) {
	// todo: generate db every conn
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	_ = db.AutoMigrate(&Mail{})
	err = Prefill(db)
	if err != nil {
		log.Fatalln(err)
	}

	g.Static("/", "./practice-sql/assets")

	g.File("/", "./practice-sql/index.html")

	type Resp struct {
		IsError   bool
		Error     string
		NoContent bool
		Content   []Mail
	}

	g.GET("/search", func(c echo.Context) error {
		from := c.QueryParam("from")
		var resp Resp
		var mails []Mail
		if from == "" {
			err := db.Raw(`SELECT * FROM mails WHERE "to" = '駒場優'`).Find(&mails).Error
			if err != nil {
				resp.IsError = true
				resp.Error = err.Error()
			} else {
				resp.NoContent = len(mails) == 0
				resp.Content = mails
			}
		} else {
			err := db.Raw(`SELECT * FROM mails WHERE "to" = '駒場優' AND "from" = '` + from + `'`).Find(&mails).Error
			if err != nil {
				resp.IsError = true
				resp.Error = err.Error()
			} else {
				resp.NoContent = len(mails) == 0
				resp.Content = mails
			}
		}
		var b bytes.Buffer
		err := searchTmpl.Execute(&b, resp)
		if err != nil {
			return c.String(500, err.Error())
		}
		html, _ := io.ReadAll(&b)
		return c.HTML(200, string(html))
	})
}
