//twtichのwebsocketを試す イベントをlogで出している
let socket = new WebSocket("wss://eventsub-beta.wss.twitch.tv/ws")

socket.onopen = function (event) {
    console.log("[open] Connection established")
    console.log("Sending to server")
    //socket.sendで送りたいメッセージを送る
    // socket.send()
}

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`)
}

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
        // e.g. サーバのプロセスが停止、あるいはネットワークダウン
        // この場合、event.code は通常 1006 になります
        console.log('[close] Connection died')
    }
}

socket.onerror = function (error) {
    console.log(`[error] ${error.message}`)
}

// Service Worker インストール時に実行される
self.addEventListener('install', (event) => {
    console.log('service worker install ...')
})

// Service Worker アクティベート時に実行される
//scope内のリクエストがフェッチできるようになった
self.addEventListener('activate', (event) => {
    console.info('activate', event)
})


//イベントがあった際に実行される
self.addEventListener('fetch', function(event) {
    //イベントで起きた処理を表示
    // console.log('fetch', event.request.url)
})