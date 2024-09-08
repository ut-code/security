package practicesql

import "gorm.io/gorm"

func Prefill(db *gorm.DB) error {
	for _, mail := range mails {
		if err := db.Create(&mail).Error; err != nil {
			return err
		}
	}
	return nil
}

var mails = []Mail{
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
