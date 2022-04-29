import ConversationsInbox from '../components/Messages/ConversationsInbox';
import {screen, render} from '@testing-library/react';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import * as redux from 'react-redux'
import {BrowserRouter} from "react-router-dom";

const mockConversations = [
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
]

describe('Render inbox', () => {

    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({data: 'test'})

    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
        useSelector: jest.fn(),
        useDispatch: () => mockDispatch
    }));

    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUsedNavigate,
    }));

    const initialState = {};
    const mockStore = configureStore();
    let store;

    it('Renders all conversations"', () => {
        store = mockStore(initialState);
        const {getByText} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ConversationsInbox conversations={mockConversations}/>
                </BrowserRouter>
            </Provider>
        );

        for (const conversation of mockConversations) {
            expect(screen.getByText(conversation.recipients[0].name)).not.toBeNull();
            expect(screen.getByText(conversation.message)).not.toBeNull();
        }
    });
});