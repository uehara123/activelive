// //streaddata保存領域
// let array = {}

// //フォローしている配信者の配信状況を取得
// function collAPI() {
//     const json = coll()
//     if ('Twitch_token' in localStorage) {
//         const res = fetch("https://api.twitch.tv/helix/streams/followed?user_id=" + json.user_id, {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem("Twitch_token"),
//                 'Client-Id': json.client_id
//             }
//         })
//         //promise11を分解
//         //フォローリスト
//         const streams = res.json()
//         //特定の配信者
//         const livedata = streams.data
//         //配信中の人数
//         const length = livedata.length

//         for (i = 0; i < length; i++) {
//             //画像の大きさを指定
//             let thumbnail = livedata[i].thumbnail_url
//             const thumbnail_width = thumbnail.replace('{width}', '640');
//             const thumbnail_height = thumbnail_width.replace('{height}', '360');
//             thumbnail = thumbnail_height

//             //配列に入れる配信情報
//             const channelname = livedata[i].user_name
//             const channelURL = 'https://www.twitch.tv/' + channelname

//             array[channelURL] = {
//                 category: livedata[i].game_name, thumbnail_url: thumbnail,
//                 title: livedata[i].title, user_name: livedata[i].user_name, url: channelURL,
//             }
//             //localStrageのStreamに保存
//             localStorage.setItem('stream', JSON.stringify(array))
//         }
//     }
// }

// function coll() {
//     try {
//         //fetchでURLにアクセス
//         const user = fetch("https://id.twitch.tv/oauth2/validate", {
//             headers: {
//                 'Authorization': 'OAuth ' + localStorage.getItem("Twitch_token"),
//             }
//         })
//         //200~299のstatusだった場合の処理
//         if (user.ok) {
//             const json = user.json();
//             return json
//             //それ以外
//         } else {
//             localStorage.setItem('stream', JSON.stringify(array))
//         }
//         //エラーの場合の処理
//     } catch (error) {
//         console.log('Error 発生: ' + error);
//     }
// }