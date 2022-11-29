//画面を読み込んだ際の処理
window.addEventListener('load', function () {
  scroll()
  element()
  //youtubeのログイン処理
  //ログイン済みの場合APIからデータを取得し表示
  if ('Youtube_token' in this.localStorage) {
    console.log("ログイン成功")
  }
  //oauth処理
  else {
    Ycreate()
    document.querySelector('#Youtube').addEventListener('click', () => {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        localStorage.setItem('Youtube_token', token);
      })
    })
  }

  //twitchのログイン処理
  //ログイン済みの場合APIからデータを取得し表示
  if ('Twitch_token' in this.localStorage) {
    collAPI()
    streamcreate()
  }
  //oauth処理
  else {
    Tcreate()
    document.querySelector('#Twitch').addEventListener('click', () => {
      Toauth()
    })
  }
})
