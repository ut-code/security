package sql

import (
	"html/template"
	"log"
	"os"

	"github.com/go-yaml/yaml"
	escape "github.com/microcosm-cc/bluemonday"
	md "github.com/russross/blackfriday/v2"
	"gorm.io/gorm"
)

var mails []Mail

func init() {
	f, err := os.Open("./services/sql/data.yml")
	if err != nil {
		log.Fatalln(err)
	}

	var data []Mail
	err = yaml.NewDecoder(f).Decode(&data)
	if err != nil {
		log.Fatalln(err)
	}

	for _, mail := range data {
		html := md.Run([]byte(mail.Content), md.WithNoExtensions())
		safeHTML := escape.UGCPolicy().SanitizeBytes(html)
		mail.Content = template.HTML(safeHTML)
		mails = append(mails, mail)
	}
}

func Prefill(db *gorm.DB) error {
	for _, mail := range mails {
		err := db.Create(&mail).Error
		if err != nil {
			return err
		}
	}
	return nil
}

func PrefillTest(db *gorm.DB) error {
	for _, mail := range test_mails {
		if err := db.Create(&mail).Error; err != nil {
			return err
		}
	}
	return nil
}

var test_mails = []Mail{
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "東大太郎",
		ToType:  "送信",
		To:      "駒場優",
		Content: "こんにちは from 東大太郎 to 駒場優！",
	},
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "東大太郎",
		ToType:  "送信",
		To:      "本郷花子",
		Content: "こんにちは from 東大太郎 to 本郷花子！",
	},
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "駒場優",
		ToType:  "送信",
		To:      "東大太郎",
		Content: "こんにちは from 駒場優 to 東大太郎！",
	},
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "駒場優",
		ToType:  "送信",
		To:      "本郷花子",
		Content: "こんにちは from 駒場優 to 本郷花子！",
	},
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "本郷花子",
		ToType:  "送信",
		To:      "東大太郎",
		Content: "こんにちは from 本郷花子 to 東大太郎！",
	},
	{
		Subject: "こんにちは",
		Date:    "2024-05-10",
		From:    "本郷花子",
		ToType:  "送信",
		To:      "駒場優",
		Content: "こんにちは from 本郷花子 to 駒場優！",
	},
}
