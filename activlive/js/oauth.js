//画面を読み込んだ際の処理
window.addEventListener('load', function () {
  //youtubeのログイン処理
  //ログイン済みの場合APIからデータを取得し表示
  if ('Youtube_token' in this.localStorage) {
    console.log("ログイン成功")
  }
  //oauth処理
  else {
    Ycreate()
    document.querySelector('#Youtube').addEventListener('click', () => {
      Yoauth()
    })
  }

  //twitchのログイン処理
  //ログイン済みの場合APIからデータを取得し表示
  if ('Twitch_token' in this.localStorage) {
    collAPI()
  }
  //oauth処理
  else {
    Tcreate()
    document.querySelector('#Twitch').addEventListener('click', () => {
      Toauth()
    })
  }


})
