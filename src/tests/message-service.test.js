import {
    createConversation,
    api,
    sendMessage,
    findInboxMessages,
    findConversation,
    deleteConversation,
    deleteMessage,
    findMessagesByConversation,
    findAllMessagesSentByUser
} from '../services/messages-service';

describe('MESSAGE API SERVICE', () => {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const MESSAGES_API = `${BASE_URL}/users`;

    const mockGroupConversationPromise = {
        createdAt: '04/19/22, 06:42 PM',
        createdBy: {
            email: 'batman@email.com',
            name: 'Bruce Wayne',
            profilePhoto:
                'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
            updatedAt: '2022-04-17T21:02:35.653Z',
            username: 'batman',
            id: '623a18276cd5e5d3d27ee790',
        },
        participants: [
            {
                email: 'batman@email.com',
                name: 'Bruce Wayne',
                profilePhoto:
                    'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                updatedAt: '2022-04-17T21:02:35.653Z',
                username: 'batman',
                id: '623a18276cd5e5d3d27ee790',
            },
            {
                email: 'ironmannnn@ironman.com',
                name: 'Tony Stark',
                profilePhoto:
                    'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
                username: 'ironman',
                id: '6254cd7b89b74408547a3eff',
            },
            {
                email: 'clark@superman.com',
                name: 'Clark Kent',
                profilePhoto:
                    'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',

                username: 'superman',
                id: '6254d53089b7440854862f7b',
            },
        ],
        removeFor: [],
        type: 'GROUP',
        updatedAt: '2022-04-19',
        id: '625f3af2e0084f5f093ed10b',
    };

    const mockMessagePromise = {
        sender: {
            name: 'Bruce Wayne',
            profilePhoto:
                'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
            username: 'batman',
            id: '623a18276cd5e5d3d27ee790',
        },
        conversation: '6254d5c5c7c6a5e06a32e60b',
        message: 'Hello, group. I am Bruce',
        removeFor: [],
        createdAt: '04/11/22, 09:29 PM',
        updatedAt: '2022-04-12',
        id: '6254d5e9c7c6a5e06a32e60f',
    };

    const mockInboxPromise = [
        {
            id: '62573c47972e03c27f8dc52f',
            message: "hey what's up",
            sender: {
                name: 'Bruce Wayne',
                profilePhoto:
                    'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                id: '623a18276cd5e5d3d27ee790',
            },
            conversation: '62570f06e0084f5f095333a2',
            recipients: [
                {
                    _id: '623a18276cd5e5d3d27ee790',
                    name: 'Bruce Wayne',
                    profilePhoto:
                        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                },
                {
                    _id: '6254d53089b7440854862f7b',
                    name: 'Clark Kent',
                    profilePhoto:
                        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
                },
            ],
            createdAt: '2022-04-13T21:10:31.623Z',
        },
        {
            id: '6254d5e9c7c6a5e06a32e60f',
            message: 'Hello superman and ironman. I am batman',
            sender: {
                name: 'Bruce Wayne',
                profilePhoto:
                    'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                id: '623a18276cd5e5d3d27ee790',
            },
            conversation: '6254d5c5c7c6a5e06a32e60b',
            recipients: [
                {
                    _id: '623a18276cd5e5d3d27ee790',
                    name: 'Bruce Wayne',
                    profilePhoto:
                        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                },
                {
                    _id: '6254cd7b89b74408547a3eff',
                    name: 'Tony Stark',
                    profilePhoto:
                        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
                },
                {
                    _id: '6254d53089b7440854862f7b',
                    name: 'Clark Kent',
                    profilePhoto:
                        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
                },
            ],
            createdAt: '2022-04-12T01:29:13.775Z',
        },
    ];

    const mockDeletedConversationPromise = {
        id: '625f3af2e0084f5f093ed10b',
        type: 'GROUP',
        createdBy: '623a18276cd5e5d3d27ee790',
        participants: [
            '623a18276cd5e5d3d27ee790',
            '6254cd7b89b74408547a3eff',
            '6254d53089b7440854862f7b',
        ],
        removeFor: ['623a18276cd5e5d3d27ee790'],
    };

    const mockDeletedMessagePromise = {
        id: '6254d5e9c7c6a5e06a32e60f',
        message: 'Hello superman and ironman. I am batman',
        sender: {
            name: 'Bruce Wayne',
            profilePhoto:
                'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
            id: '623a18276cd5e5d3d27ee790',
        },
        conversation: '6254d5c5c7c6a5e06a32e60b',
        removeFor: ['623a18276cd5e5d3d27ee790'],
    };

    const mockMessagesByConversation = [
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
                "followeeCount": 3,
                "followerCount": 1,
                "headerImage": "",
                "name": "Bruce Wayne",
                "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                "updatedAt": "2022-04-20T15:54:14.550Z",
                "username": "batman",
                "id": "623a18276cd5e5d3d27ee790"
            },
            "conversation": "624f2dfa42178976213396be",
            "message": "test",
            "removeFor": [],
            "createdAt": "04/25/22, 01:28 PM",
            "updatedAt": "2022-04-25",
            "id": "6266da45c6876f65252c36a4"
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
                "followeeCount": 3,
                "followerCount": 1,
                "headerImage": "",
                "name": "Bruce Wayne",
                "profilePhoto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                "updatedAt": "2022-04-20T15:54:14.550Z",
                "username": "batman",
                "id": "623a18276cd5e5d3d27ee790"
            },
            "conversation": "624f2dfa42178976213396be",
            "message": "hello",
            "removeFor": [],
            "createdAt": "04/25/22, 01:28 PM",
            "updatedAt": "2022-04-25",
            "id": "6266da4dc6876f65252c36ae"
        }
    ]

    const mockMessagesSentByUser = [
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "Hello there",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/07/22, 02:33 PM",
            "updatedAt": "2022-04-25",
            "id": "624f2e6eca2a243f270716dd"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "test",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/12/22, 06:47 PM",
            "updatedAt": "2022-04-25",
            "id": "62560178d7acd7d2dbe58426"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "it's me",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/12/22, 06:49 PM",
            "updatedAt": "2022-04-25",
            "id": "625601e5d7acd7d2dbe58433"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "test 2",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/13/22, 03:29 PM",
            "updatedAt": "2022-04-25",
            "id": "6257247c3e3603d2572539f9"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "hello",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/13/22, 05:06 PM",
            "updatedAt": "2022-04-25",
            "id": "62573b4a7f4c4015dcb21ae8"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "hello",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 11:42 AM",
            "updatedAt": "2022-04-25",
            "id": "626029d5c136900277379f56"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6260327e9cea71a463366635",
            "message": "hello",
            "removeFor": [],
            "createdAt": "04/20/22, 12:19 PM",
            "updatedAt": "2022-04-20",
            "id": "62603284f98c6f7e6f85ae49"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "1",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 01:59 PM",
            "updatedAt": "2022-04-25",
            "id": "626049f9f98c6f7e6f85b023"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "3",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:19 PM",
            "updatedAt": "2022-04-25",
            "id": "62604ec79be19187d1300a12"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "4",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:23 PM",
            "updatedAt": "2022-04-25",
            "id": "62604f8f9be19187d1300a26"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "5",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:23 PM",
            "updatedAt": "2022-04-25",
            "id": "62604f9f9be19187d1300a3c"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "6",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:25 PM",
            "updatedAt": "2022-04-25",
            "id": "62605029b2e664d81f649db6"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "7",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:26 PM",
            "updatedAt": "2022-04-25",
            "id": "62605069715c497bd3de379e"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "10",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:30 PM",
            "updatedAt": "2022-04-25",
            "id": "6260515d372d403de5a51c8f"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "11",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 02:31 PM",
            "updatedAt": "2022-04-25",
            "id": "62605176372d403de5a51c9a"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "14",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 04:58 PM",
            "updatedAt": "2022-04-25",
            "id": "626073e002f457fc7595b05c"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "18",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/20/22, 08:39 PM",
            "updatedAt": "2022-04-25",
            "id": "6260a7dd02f457fc7595b156"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "20",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/22/22, 12:32 PM",
            "updatedAt": "2022-04-25",
            "id": "6262d8852e124fbc4e0b3da7"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "21",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 08:22 PM",
            "updatedAt": "2022-04-25",
            "id": "62649855cbf469cb7c37c54d"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "21",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 08:25 PM",
            "updatedAt": "2022-04-25",
            "id": "62649914cbf469cb7c37c573"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "hello",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 08:32 PM",
            "updatedAt": "2022-04-25",
            "id": "62649aadc2bc872f4c0de511"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "hello there",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 08:40 PM",
            "updatedAt": "2022-04-25",
            "id": "62649c70edeb1d2ac12eace0"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "Testing all the notifications",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 08:53 PM",
            "updatedAt": "2022-04-25",
            "id": "62649fa6076921340374a8ab"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "22",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 09:02 PM",
            "updatedAt": "2022-04-25",
            "id": "6264a1c07303078f70574fab"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "hi",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/23/22, 09:14 PM",
            "updatedAt": "2022-04-25",
            "id": "6264a45d7303078f70574fef"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "26",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/24/22, 08:20 PM",
            "updatedAt": "2022-04-25",
            "id": "6265e93e9a9a4258ca882ea3"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "aloha",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/24/22, 08:55 PM",
            "updatedAt": "2022-04-25",
            "id": "6265f195f10c967194e5cdab"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "Thissdfsd",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/24/22, 11:05 PM",
            "updatedAt": "2022-04-25",
            "id": "62660ff4f10c967194e5ce3f"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6260a74b9cea71a46300950b",
            "message": "test message",
            "removeFor": [],
            "createdAt": "04/24/22, 11:28 PM",
            "updatedAt": "2022-04-25",
            "id": "6266154cf10c967194e5ce86"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "test",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 01:15 AM",
            "updatedAt": "2022-04-25",
            "id": "62662e71cde2cfa89981c999"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6266308c9cea71a463518d1d",
            "message": "Hello friend.This is Bruce 2",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 01:24 AM",
            "updatedAt": "2022-04-25",
            "id": "6266309aa45330cef4d031a6"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6266308c9cea71a463518d1d",
            "message": "Hello friend.This is Bruce 2",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 01:26 AM",
            "updatedAt": "2022-04-25",
            "id": "626630fba45330cef4d031b1"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6266308c9cea71a463518d1d",
            "message": "Hello friend.This is Bruce 2",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 01:28 AM",
            "updatedAt": "2022-04-25",
            "id": "6266316e088f4fa4a4ac8482"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "6266308c9cea71a463518d1d",
            "message": "Hello friend.This is Bruce 54534534",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 01:33 AM",
            "updatedAt": "2022-04-25",
            "id": "626632b55a24cd005532e2ba"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62663ea39cea71a4636ad0f7",
            "message": "hello selina",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 02:28 AM",
            "updatedAt": "2022-04-25",
            "id": "62663f85e74a72e81ce0145c"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62663ea39cea71a4636ad0f7",
            "message": "hello again",
            "removeFor": [],
            "createdAt": "04/25/22, 03:20 AM",
            "updatedAt": "2022-04-25",
            "id": "62664bcc9f153dbdd463e875"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "62649aa89cea71a463a3273b",
            "message": "Hello bob. Your name is very inspiriting. ",
            "removeFor": [
                "623a18276cd5e5d3d27ee790"
            ],
            "createdAt": "04/25/22, 12:38 PM",
            "updatedAt": "2022-04-25",
            "id": "6266ce76abff663efcbdd4bb"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "test",
            "removeFor": [],
            "createdAt": "04/25/22, 01:28 PM",
            "updatedAt": "2022-04-25",
            "id": "6266da45c6876f65252c36a4"
        },
        {
            "sender": "623a18276cd5e5d3d27ee790",
            "conversation": "624f2dfa42178976213396be",
            "message": "hello",
            "removeFor": [],
            "createdAt": "04/25/22, 01:28 PM",
            "updatedAt": "2022-04-25",
            "id": "6266da4dc6876f65252c36ae"
        }
    ]

    it('can create a group conversation', async () => {
        const mockPost = jest.spyOn(api, 'post');
        api.post.mockImplementation(() =>
            Promise.resolve({data: mockGroupConversationPromise})
        );
        const groupConversationParameter = {
            createdBy: '623a18276cd5e5d3d27ee790',
            participants: [
                '623a18276cd5e5d3d27ee790',
                '6254cd7b89b74408547a3eff',
                '6254d53089b7440854862f7b',
            ],
        };
        const userId = '123456';
        const groupConversationResponse = await createConversation(
            userId,
            groupConversationParameter
        );
        expect(mockPost).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/conversations`,
            groupConversationParameter
        );
        expect(groupConversationResponse).toStrictEqual(
            mockGroupConversationPromise
        );
        mockPost.mockRestore();
    });

    it('can send a message', async () => {
        const mockAxios = jest.spyOn(api, 'post');
        api.post.mockImplementation(() =>
            Promise.resolve({data: mockMessagePromise})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const conversationId = '6254d5c5c7c6a5e06a32e60b';
        const message = 'Hello, group. I am Bruce';

        const newMessage = await sendMessage(userId, conversationId, message);

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`,
            {message}
        );
        expect(newMessage).toStrictEqual(mockMessagePromise);
        mockAxios.mockRestore();
    });

    it('find latest inbox messages', async () => {
        const mockAxios = jest.spyOn(api, 'get');
        api.get.mockImplementation(() =>
            Promise.resolve({data: mockInboxPromise})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const inbox = await findInboxMessages(userId);

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/messages/`
        );
        expect(inbox).toStrictEqual(mockInboxPromise);
        mockAxios.mockRestore();
    });

    it('find a specific conversation', async () => {
        const mockAxios = jest.spyOn(api, 'get');
        api.get.mockImplementation(() =>
            Promise.resolve({data: mockGroupConversationPromise})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const conversationId = '6254d5c5c7c6a5e06a32e60b';
        const conversationToBeFound = await findConversation(
            userId,
            conversationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/conversations/${conversationId}`
        );
        expect(conversationToBeFound).toStrictEqual(mockGroupConversationPromise);
        mockAxios.mockRestore();
    });

    it('delete a conversation for a user', async () => {
        const mockAxios = jest.spyOn(api, 'delete');
        api.delete.mockImplementation(() =>
            Promise.resolve({data: mockDeletedConversationPromise})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const conversationId = '6254d5c5c7c6a5e06a32e60b';
        const conversationToBeDeleted = await deleteConversation(
            userId,
            conversationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/conversations/${conversationId}`
        );
        expect(conversationToBeDeleted).toStrictEqual(
            mockDeletedConversationPromise
        );
        mockAxios.mockRestore();
    });

    it('delete a message for a user', async () => {
        const mockAxios = jest.spyOn(api, 'delete');
        api.delete.mockImplementation(() =>
            Promise.resolve({data: mockDeletedMessagePromise})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const messageId = '6254d5e9c7c6a5e06a32e60f';
        const messageToBeDeleted = await deleteMessage(userId, messageId);

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/messages/${messageId}`
        );
        expect(messageToBeDeleted).toStrictEqual(mockDeletedMessagePromise);
        mockAxios.mockRestore();
    });

    it('fetch messages in a conversation', async () => {
        const mockAxios = jest.spyOn(api, 'get');
        api.get.mockImplementation(() =>
            Promise.resolve({data: mockMessagesByConversation})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const conversationId = '624f2dfa42178976213396be';
        const messagesToBeFound = await findMessagesByConversation(
            userId,
            conversationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`
        );
        expect(messagesToBeFound).toStrictEqual(mockMessagesByConversation);
        mockAxios.mockRestore();
    });

    it('fetch messages sent by a user', async () => {
        const mockAxios = jest.spyOn(api, 'get');
        api.get.mockImplementation(() =>
            Promise.resolve({data: mockMessagesSentByUser})
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const sentMessagesToBeFound = await findAllMessagesSentByUser(
            userId,
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/messages/sent`
        );
        expect(sentMessagesToBeFound).toStrictEqual(mockMessagesSentByUser);
        mockAxios.mockRestore();
    });
});
