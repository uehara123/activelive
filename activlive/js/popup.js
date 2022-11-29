//DOM操作
const wapper = document.getElementsByClassName('wapper');
//headerとメイン画面の追加
const header = document.createElement('div')
header.setAttribute('class', 'header')
wapper[0].insertBefore(header, wapper.firstChild)
const reload_div = document.createElement('div')
reload_div.setAttribute('class', 'reload_div')
header.insertBefore(reload_div, header.firstChild)
const reload_div2 = document.createElement('div')
reload_div2.setAttribute('class', 'reload_div2')
header.insertBefore(reload_div2, header.child)
const reload_container = document.createElement('div')
reload_container.setAttribute('class', 'reload_container')
reload_div2.insertBefore(reload_container, wapper.firstChild)
const reload = document.createElement('img')
reload.src = "../image/reload_image.png"
reload.setAttribute('class', 'reload')
reload_container.insertBefore(reload, wapper.firstChild)

//メイン画面の追加
let main = document.createElement('div')
main.setAttribute('class', 'main')
wapper[0].insertBefore(main, wapper.firstChild)

//streaddata保存領域
let array = {}

function Ycreate() {
    //ボタン画面の追加
    //Youtubeボタンの追加
    let main = document.getElementsByClassName('main')
    let login1 = document.createElement('div')
    login1.setAttribute('class', 'login1')
    main[0].before(login1)
    login1 = document.getElementsByClassName('login1')
    let Ybtn = document.createElement('button')
    Ybtn.setAttribute('id', 'Youtube')
    Ybtn.textContent = "Youtube login"
    login1[0].insertBefore(Ybtn, login1.firstChild)
}

function Yoauth() {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        console.log(token);
        localStorage.setItem('Youtube_token', token);
    })
}

function Tcreate() {
    //Twitchボタンの追加
    let main = document.getElementsByClassName('main');
    let login2 = document.createElement('div')
    login2.setAttribute('class', 'login2')
    main[0].before(login2)
    login2 = document.getElementsByClassName('login2')
    let Tbtn = document.createElement('button')
    Tbtn.setAttribute('id', 'Twitch')
    Tbtn.textContent = "Twitch login"
    login2[0].insertBefore(Tbtn, login2.firstChild)
}

function Toauth() {
    chrome.identity.launchWebAuthFlow({
        url: 'https://id.twitch.tv/oauth2/authorize?client_id=9ftxvhxbni3cuqprvhx7hod4o31ahs&redirect_uri=https://ggffioghbmkdkdkldinjgimojpdfaefo.chromiumapp.org&response_type=token&scope=user:read:follows+user:read:email',
        interactive: true
    }, responseUrl => {
        var url = responseUrl
        var access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        localStorage.setItem('Twitch_token', access_token);
    })
}

function scroll() {
    let scroll = document.createElement('div')
    scroll.setAttribute('class', 'scroll')
    let main = document.getElementsByClassName('main');
    main[0].appendChild(scroll)
}

function element() {
    let elements = document.createElement('div')
    elements.setAttribute('class', 'elements')
    let main = document.getElementsByClassName('scroll');
    main[0].appendChild(elements)
}

//フォローしている配信者の配信状況を取得
async function collAPI() {
    const json = await coll()
    if ('Twitch_token' in localStorage) {
        const res = await fetch("https://api.twitch.tv/helix/streams/followed?user_id=" + json.user_id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("Twitch_token"),
                'Client-Id': json.client_id
            }
        })
        //promise11を分解
        //フォローリスト
        const streams = await res.json()
        //特定の配信者
        const livedata = await streams.data
        //配信中の人数
        const length = await livedata.length
        localStorage.setItem('stream', JSON.stringify(array))

        for (i = 0; i < length; i++) {
            //画像の大きさを指定
            let thumbnail = await livedata[i].thumbnail_url
            const thumbnail_width = thumbnail.replace('{width}', '640');
            const thumbnail_height = thumbnail_width.replace('{height}', '360');
            thumbnail = thumbnail_height

            //配列に入れる配信情報
            const channelname = await livedata[i].user_name
            const channelURL = 'https://www.twitch.tv/' + channelname

            array[channelURL] = {
                category: livedata[i].game_name, thumbnail_url: thumbnail,
                title: livedata[i].title, user_name: livedata[i].user_name, url: channelURL,
            }
            //localStrageのStreamに保存
            localStorage.setItem('stream', JSON.stringify(array))
        }
    }
}

async function coll() {
    try {
        //fetchでURLにアクセス
        const user = await fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
                'Authorization': 'OAuth ' + localStorage.getItem("Twitch_token"),
            }
        })
        //200~299のstatusだった場合の処理
        if (user.ok) {
            const json = await user.json();
            return json
            //それ以外
        } else {
            localStorage.setItem('stream', JSON.stringify(array))
        }
        //エラーの場合の処理
    } catch (error) {
        console.log('Error 発生: ' + error);
    }
}

function streamcreate() {
    const stream_data = data()
    var i = 0

    for (key in stream_data) {
        //配信情報を表示する大枠
        let stream = document.createElement('div')
        stream.setAttribute('class', 'element-container')
        let main = document.getElementsByClassName('elements')
        main[0].appendChild(stream)


        //要素を配置
        let element = document.createElement('div')
        element.setAttribute('class', 'element')
        main = document.querySelector('.elements')
        let children = main.children;
        children[i].appendChild(element)

        //画像を挿入枠
        element = document.createElement('div')
        element.setAttribute('class', 'image-field')
        main = document.querySelector('.elements')
        children = main.children;
        let child = children[i].querySelector('.element')
        child.appendChild(element)

        //画像を挿入枠
        element = document.createElement('div')
        element.setAttribute('class', 'image-field-container')
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.image-field')
        child.appendChild(element)

        //画像
        const image = stream_data[key].thumbnail_url
        element = document.createElement('img')
        element.src = image
        element.setAttribute('class', 'image-thubnail')
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.image-field-container')
        child.appendChild(element)

        //文字の表示枠
        element = document.createElement('div')
        element.setAttribute('class', 'infomation-field')
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.element')
        child.appendChild(element)

        //配信者名
        element = document.createElement('p')
        element.setAttribute('class', 'name')
        element.innerHTML = stream_data[key].user_name
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.infomation-field')
        child.appendChild(element)

        //配信タイトル
        element = document.createElement('p')
        element.setAttribute('class', 'title')
        element.innerHTML = stream_data[key].title
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.infomation-field')
        child.appendChild(element)

        //ゲーム名
        element = document.createElement('p')
        element.setAttribute('class', 'game-title')
        element.innerHTML = stream_data[key].category
        main = document.querySelector('.elements')
        children = main.children;
        child = children[i].querySelector('.infomation-field')
        child.appendChild(element)

        i = i + 1
    }
}

//localstrageの中身を返す
function data() {
    const data = localStorage.getItem('stream')
    let array = JSON.parse(data);
    return array
}
