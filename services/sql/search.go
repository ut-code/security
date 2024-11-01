package sql

import (
	"html/template"
	"log"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Mail struct {
	gorm.Model
	Date    string        `json:"date" yaml:"date"`
	From    string        `json:"from" yaml:"from"`
	ToType  string        `json:"toType" yaml:"toType"` // BCC or CC
	To      string        `json:"to" yaml:"to"`
	Subject string        `json:"subject" yaml:"subject"`
	Content template.HTML `json:"content" yaml:"content"`
}

var player = "駒場 優"

func Search(c echo.Context) error {
	db, err := initDB()
	if err != nil {
		log.Println(err)
		return c.JSON(500, echo.Map{"error": "Failed to init DB"})
	}

	from := c.QueryParam("from")
	var mails []Mail
	if from == "" {
		err := db.Raw(`SELECT * FROM mails WHERE "to" = '` + player + `' ORDER BY date DESC`).Find(&mails).Error
		if err != nil {
			return c.JSON(400, echo.Map{"error": err.Error()})
		} else {
			return c.JSON(200, mails)
		}
	} else {
		err := db.Raw(`SELECT * FROM mails WHERE "to" = '` + player + `' AND "from" = '` + from + `' ORDER BY date DESC`).Find(&mails).Error
		if err != nil {
			return c.JSON(400, echo.Map{"error": err.Error()})
		} else {
			return c.JSON(200, mails)
		}
	}
}

func initDB() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	_ = db.AutoMigrate(&Mail{})
	err = Prefill(db)
	if err != nil {
		return nil, err
	}
	return db, nil
}
