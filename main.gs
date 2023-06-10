function myfunction() {
  let calendarID = "YOUR_CALENDAR_ID"
  let myCalendar = CalendarApp.getCalendarById(calendarID)
  // Googleカレンダーから取得するイベントの開始日(今日)を設定する
  let startDate = new Date();
  // Googleカレンダーから取得するイベントの終了日(2日後)を設定する
  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 2);
  //開始日～終了日に存在するGoogleカレンダーのイベントを取得する
  let myEvent = myCalendar.getEvents(startDate, endDate);

  let events = ParseEvents(myEvent)

  SendToDiscord(events)
}

function ParseEvents(events) {
  var output = []
  if (events.length !== 0) {
    for (var i = 0; i < events.length; i++) {
      const event = events[i]
      const title = event.getTitle()
      const startTime = `${event.getStartTime().getFullYear()}/${(event.getStartTime().getMonth()+1)}/${event.getStartTime().getDate()} ${('00' + event.getStartTime().getHours()).slice(-2)}:${('00' + event.getStartTime().getMinutes()).slice(-2)}`
      output.push({
        name: title,
        value: `期限: ${startTime}`
      })
    }
  }
  Logger.log(output)
  return output
}

function SendToDiscord(events) {
  const WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL"); //取得したWebhookURLを追加
  const currentTime = new Date();
  const currentTimeStr = `${currentTime.getFullYear()}-${('00' + (currentTime.getMonth()+1)).slice(-2)}-${('00' + currentTime.getDate()).slice(-2)}T${('00' + currentTime.getHours()).slice(-2)}:${('00' + currentTime.getMinutes()).slice(-2)}:${('00' + currentTime.getSeconds()).slice(-2)}+09:00`
  const payload = {
    username: "hoge", // 投稿するメッセージのユーザ名。なんでも良い。
    content: events.length === 0 ? "" : "@everyone", // イベントが1つ以上ある場合は全員に通知
    embeds: [
      {
        title: events.length === 0 ? "お疲れ様です" : "課題出せ",
        description: events.length === 0 ? "*48時間以内に提出する必要のある課題はありません（研究公正は除く）*" : `*48時間以内に提出する必要のある課題が${events.length}個あります*`,
        color: parseInt("00ced1", 16),
        author: {
          name: "Moodle",
        },
        timestamp: currentTimeStr,
        fields: events,
        footer: {
          text: "これは9AM~10AMに自動投稿されたメッセージです",
        },
      }
    ]

  };

  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}