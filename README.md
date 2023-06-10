# KadaiReminder

Moodleに登録された授業課題をDiscordでリマインドしてくれるBotです。
提出期限まで48時間以内の課題をリマインドしてくれます。
今回は授業課題を対象に作りましたが、通常のカレンダーイベント通知としても活用できます。

## 設定手順

1. Moodleでカレンダーを取得し、Googleカレンダーに登録
	- [参考URL](https://docs.moodle.org/3x/ja/%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AE%E4%BD%BF%E7%94%A8#Google.E3.82.AB.E3.83.AC.E3.83.B3.E3.83.80.E3.83.BC)
1. Googleカレンダーに登録したカレンダーのカレンダー IDを取得し、`main.js`の`calenderID`に代入
	- 対象となるカレンダー設定画面を開き、カレンダーの統合 => カレンダーID
1. Discordでリマインドメッセージを投稿したいチャンネルの設定を開き、ウェブフックを作成
1. 作成したウェブフックのURLを取得し、`main.js`の`WEBHOOK_URL`に代入
	- GASの設定をした後、`WEBHOOK_URL`を以下のようにすると、環境変数が使えます
		```
		PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL")
		```
1. Google App Script (GAS)のプロジェクトを作成する
1. GASプロジェクト内の`コード.gs`を`main.gs`で置換
1. GASプロジェクトでトリガーを設定すると、指定した時刻（時間帯）にメッセージを自動投稿できます。

## ライセンス
本リポジトリはMITライセンスの下にあります
