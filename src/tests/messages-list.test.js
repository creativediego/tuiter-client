import {Provider, useSelector} from "react-redux";
import configureStore from "redux-mock-store";
import Chat from "../components/Messages/Chat";
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

const mockMessages = [
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "I think we have some similarities.",
        "removeFor": [],
        "createdAt": "04/26/22, 11:01 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b20b32f51236524b19f8"
    },
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "test",
        "removeFor": [
            "6268aa7e6e3891d67bd34d12"
        ],
        "createdAt": "04/26/22, 11:02 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b23b32f51236524b1a25"
    },
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "👀",
        "removeFor": [],
        "createdAt": "04/26/22, 11:03 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b27f32f51236524b1a46"
    },
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "👍",
        "removeFor": [],
        "createdAt": "04/26/22, 11:04 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b2b632f51236524b1a59"
    },
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "😆",
        "removeFor": [],
        "createdAt": "04/26/22, 11:05 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b31532f51236524b1a75"
    },
    {
        "sender": {
            "_id": "6268aa7e6e3891d67bd34d12",
            "email": "tony@tony.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "PERSONAL",
            "bio": "",
            "birthday": "2022-04-04T00:00:00.000Z",
            "createdAt": "2022-04-27T02:29:18.481Z",
            "followeeCount": 0,
            "followerCount": 1,
            "headerImage": "",
            "name": "Tony Stark",
            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
            "updatedAt": "2022-04-27T03:48:33.680Z",
            "username": "ironman",
            "id": "6268aa7e6e3891d67bd34d12"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "🤠",
        "removeFor": [],
        "createdAt": "04/26/22, 11:06 PM",
        "updatedAt": "2022-04-27",
        "id": "6268b34532f51236524b1aa6"
    },
    {
        "sender": {
            "_id": "623a18276cd5e5d3d27ee790",
            "email": "batman@email.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "Personal",
            "bio": "I am vengeance. ",
            "birthday": "2022-03-09T00:00:00.000Z",
            "createdAt": "2022-03-22T18:40:39.910Z",
            "followeeCount": 4,
            "followerCount": -18,
            "headerImage": "",
            "name": "Bruce Wayne",
            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
            "updatedAt": "2022-04-27T03:48:33.731Z",
            "username": "batman",
            "id": "623a18276cd5e5d3d27ee790"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "hello!",
        "removeFor": [],
        "createdAt": "04/26/22, 11:41 PM",
        "updatedAt": "2022-04-27",
        "id": "6268bb6632f51236524b1b2c"
    },
    {
        "sender": {
            "_id": "623a18276cd5e5d3d27ee790",
            "email": "batman@email.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "Personal",
            "bio": "I am vengeance. ",
            "birthday": "2022-03-09T00:00:00.000Z",
            "createdAt": "2022-03-22T18:40:39.910Z",
            "followeeCount": 4,
            "followerCount": -18,
            "headerImage": "",
            "name": "Bruce Wayne",
            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
            "updatedAt": "2022-04-27T03:48:33.731Z",
            "username": "batman",
            "id": "623a18276cd5e5d3d27ee790"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "test",
        "removeFor": [],
        "createdAt": "04/26/22, 11:42 PM",
        "updatedAt": "2022-04-27",
        "id": "6268bba132f51236524b1b53"
    },
    {
        "sender": {
            "_id": "623a18276cd5e5d3d27ee790",
            "email": "batman@email.com",
            "__v": 0,
            "accountStatus": "ACTIVE",
            "accountType": "Personal",
            "bio": "I am vengeance. ",
            "birthday": "2022-03-09T00:00:00.000Z",
            "createdAt": "2022-03-22T18:40:39.910Z",
            "followeeCount": 4,
            "followerCount": -18,
            "headerImage": "",
            "name": "Bruce Wayne",
            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
            "updatedAt": "2022-04-27T03:48:33.731Z",
            "username": "batman",
            "id": "623a18276cd5e5d3d27ee790"
        },
        "conversation": "6268aab86e3891d67bd3b159",
        "message": "test",
        "removeFor": [],
        "createdAt": "04/26/22, 11:46 PM",
        "updatedAt": "2022-04-27",
        "id": "6268bcb332f51236524b1b6d"
    }
]
const mockStore = configureStore([]);
describe('Render chat', () => {
    let store;
    let component;
    const initialState = {
        "error": {
            "data": "",
            "status": null
        },
        "user": {
            "data": {
                "_id": "623a18276cd5e5d3d27ee790",
                "email": "batman@email.com",
                "__v": 0,
                "accountStatus": "ACTIVE",
                "accountType": "Personal",
                "bio": "I am vengeance. ",
                "birthday": "2022-03-09T00:00:00.000Z",
                "createdAt": "2022-03-22T18:40:39.910Z",
                "followeeCount": 4,
                "followerCount": -18,
                "headerImage": "",
                "name": "Bruce Wayne",
                "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                "updatedAt": "2022-04-27T03:48:33.731Z",
                "username": "batman",
                "id": "623a18276cd5e5d3d27ee790"
            },
            "loading": false,
            "profileComplete": true,
            "loggedIn": false,
            "foundUsers": []
        },
        "tuits": {
            "list": [],
            "loading": false
        },
        "messages": {
            "inbox": [
                {
                    "id": "6268bcb332f51236524b1b6d",
                    "message": "test",
                    "sender": {
                        "name": "Bruce Wayne",
                        "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                        "id": "623a18276cd5e5d3d27ee790"
                    },
                    "conversation": "6268aab86e3891d67bd3b159",
                    "removeFor": [],
                    "recipients": [
                        {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1"
                        }
                    ],
                    "createdAt": "2022-04-27T03:46:59.439Z"
                },
                {
                    "id": "626857c701c2dd150d320205",
                    "message": "test 2",
                    "sender": {
                        "name": "Bruce Wayne",
                        "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                        "id": "623a18276cd5e5d3d27ee790"
                    },
                    "conversation": "62684f059cea71a46348d061",
                    "removeFor": [
                        "623a18276cd5e5d3d27ee790"
                    ],
                    "recipients": [
                        {
                            "_id": "624ca65b417f103f5e0bcd0e",
                            "name": "Spencer Solomon",
                            "profilePhoto": "https://lh3.googleusercontent.com/a/AATXAJzwVHUqQHuc7Gl6bWqiwwVJCWlmUCgnFukjK_u2=s96-c"
                        },
                        {
                            "_id": "626028989cea71a46324a466",
                            "name": "jane",
                            "profilePhoto": "https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
                        }
                    ],
                    "createdAt": "2022-04-26T20:36:23.120Z"
                },
                {
                    "id": "62664bcc9f153dbdd463e875",
                    "message": "hello again",
                    "sender": {
                        "name": "Bruce Wayne",
                        "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                        "id": "623a18276cd5e5d3d27ee790"
                    },
                    "conversation": "62663ea39cea71a4636ad0f7",
                    "removeFor": [],
                    "recipients": [
                        {
                            "_id": "62663d419cea71a46368587e",
                            "name": "Cat Woman",
                            "profilePhoto": "https://cdn.dribbble.com/users/318663/screenshots/4006614/ashley-catwoman-dribbble.jpg\n"
                        }
                    ],
                    "createdAt": "2022-04-25T07:20:44.471Z"
                },
                {
                    "id": "6266154cf10c967194e5ce86",
                    "message": "test message",
                    "sender": {
                        "name": "Bruce Wayne",
                        "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                        "id": "623a18276cd5e5d3d27ee790"
                    },
                    "conversation": "6260a74b9cea71a46300950b",
                    "removeFor": [],
                    "recipients": [
                        {
                            "_id": "624ca4a2417f103f5e08eaea",
                            "name": "Spencer Solomon",
                            "profilePhoto": "https://lh3.googleusercontent.com/a-/AOh14Ghanw5Nhxj6P3kE8_pf-bYFOETWJBcaBuTYTRZMFw=s96-c"
                        }
                    ],
                    "createdAt": "2022-04-25T03:28:12.766Z"
                }
            ],
            "activeChat": {
                "id": "6268aab86e3891d67bd3b159",
                "messages": [
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "I think we have some similarities.",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:01 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b20b32f51236524b19f8"
                    },
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "test",
                        "removeFor": [
                            "6268aa7e6e3891d67bd34d12"
                        ],
                        "createdAt": "04/26/22, 11:02 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b23b32f51236524b1a25"
                    },
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "👀",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:03 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b27f32f51236524b1a46"
                    },
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "👍",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:04 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b2b632f51236524b1a59"
                    },
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "😆",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:05 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b31532f51236524b1a75"
                    },
                    {
                        "sender": {
                            "_id": "6268aa7e6e3891d67bd34d12",
                            "email": "tony@tony.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "PERSONAL",
                            "bio": "",
                            "birthday": "2022-04-04T00:00:00.000Z",
                            "createdAt": "2022-04-27T02:29:18.481Z",
                            "followeeCount": 0,
                            "followerCount": 1,
                            "headerImage": "",
                            "name": "Tony Stark",
                            "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                            "updatedAt": "2022-04-27T03:48:33.680Z",
                            "username": "ironman",
                            "id": "6268aa7e6e3891d67bd34d12"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "🤠",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:06 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268b34532f51236524b1aa6"
                    },
                    {
                        "sender": {
                            "_id": "623a18276cd5e5d3d27ee790",
                            "email": "batman@email.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "Personal",
                            "bio": "I am vengeance. ",
                            "birthday": "2022-03-09T00:00:00.000Z",
                            "createdAt": "2022-03-22T18:40:39.910Z",
                            "followeeCount": 4,
                            "followerCount": -17,
                            "headerImage": "",
                            "name": "Bruce Wayne",
                            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                            "updatedAt": "2022-04-27T05:17:57.149Z",
                            "username": "batman",
                            "id": "623a18276cd5e5d3d27ee790"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "hello!",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:41 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268bb6632f51236524b1b2c"
                    },
                    {
                        "sender": {
                            "_id": "623a18276cd5e5d3d27ee790",
                            "email": "batman@email.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "Personal",
                            "bio": "I am vengeance. ",
                            "birthday": "2022-03-09T00:00:00.000Z",
                            "createdAt": "2022-03-22T18:40:39.910Z",
                            "followeeCount": 4,
                            "followerCount": -17,
                            "headerImage": "",
                            "name": "Bruce Wayne",
                            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                            "updatedAt": "2022-04-27T05:17:57.149Z",
                            "username": "batman",
                            "id": "623a18276cd5e5d3d27ee790"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "test",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:42 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268bba132f51236524b1b53"
                    },
                    {
                        "sender": {
                            "_id": "623a18276cd5e5d3d27ee790",
                            "email": "batman@email.com",
                            "__v": 0,
                            "accountStatus": "ACTIVE",
                            "accountType": "Personal",
                            "bio": "I am vengeance. ",
                            "birthday": "2022-03-09T00:00:00.000Z",
                            "createdAt": "2022-03-22T18:40:39.910Z",
                            "followeeCount": 4,
                            "followerCount": -17,
                            "headerImage": "",
                            "name": "Bruce Wayne",
                            "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                            "updatedAt": "2022-04-27T05:17:57.149Z",
                            "username": "batman",
                            "id": "623a18276cd5e5d3d27ee790"
                        },
                        "conversation": "6268aab86e3891d67bd3b159",
                        "message": "test",
                        "removeFor": [],
                        "createdAt": "04/26/22, 11:46 PM",
                        "updatedAt": "2022-04-27",
                        "id": "6268bcb332f51236524b1b6d"
                    }
                ],
                "participants": [
                    {
                        "_id": "623a18276cd5e5d3d27ee790",
                        "email": "batman@email.com",
                        "__v": 0,
                        "accountStatus": "ACTIVE",
                        "accountType": "Personal",
                        "bio": "I am vengeance. ",
                        "birthday": "2022-03-09T00:00:00.000Z",
                        "createdAt": "2022-03-22T18:40:39.910Z",
                        "followeeCount": 4,
                        "followerCount": -17,
                        "headerImage": "",
                        "name": "Bruce Wayne",
                        "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                        "updatedAt": "2022-04-27T05:17:57.149Z",
                        "username": "batman",
                        "id": "623a18276cd5e5d3d27ee790"
                    },
                    {
                        "_id": "6268aa7e6e3891d67bd34d12",
                        "email": "tony@tony.com",
                        "__v": 0,
                        "accountStatus": "ACTIVE",
                        "accountType": "PERSONAL",
                        "bio": "",
                        "birthday": "2022-04-04T00:00:00.000Z",
                        "createdAt": "2022-04-27T02:29:18.481Z",
                        "followeeCount": 0,
                        "followerCount": 1,
                        "headerImage": "",
                        "name": "Tony Stark",
                        "profilePhoto": "https://th.bing.com/th/id/OIP.iqTe2cm5YWUl8H_GZkA_owHaHa?pid=ImgDet&rs=1",
                        "updatedAt": "2022-04-27T03:48:33.680Z",
                        "username": "ironman",
                        "id": "6268aa7e6e3891d67bd34d12"
                    }
                ]
            },
            "loading": false
        }
    };

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
        component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Chat conversationId={mockMessages.id}/>
                </BrowserRouter>
            </Provider>
        );
    });

    it('chat matches snapshots"', () => {
        expect(component.toJSON()).toMatchSnapshot();
        // store = mockStore(initialState);
        //
        // const {getByText} = render(
        //     <Provider store={store}>
        //         {/*<BrowserRouter>*/}
        //             <Chat conversationId={mockMessages.id}/>
        //         {/*</BrowserRouter>*/}
        //     </Provider>
        // );
        //
        // for (const conversation of mockMessages) {
        //     // expect(screen.getByText(conversation.recipients[0].name)).not.toBeNull();
        //     expect(screen.getByText(conversation.message)).not.toBeNull();
        // }
    });

    it('should dispatch an action on button click', () => {
        for (const message of mockMessages) {
            expect(JSON.stringify(component.toJSON())).toContain(message.createdAt);
            expect(JSON.stringify(component.toJSON())).toContain(message.message);
        }
    });
});