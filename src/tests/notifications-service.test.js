/**
 * @File Contains tests for the notifications service file
 */
import {
    findNotificationsForUser,
    markNotificationAsRead,
    findUnreadNotificationsForUser,
    api
} from "../services/notifications-service"

// tests for notifications service
describe('NOTIFICATIONS API SERVICE TEST', () => {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const NOTIFICATIONS_API = `${BASE_URL}/notifications`;
    const USERS_API = `${BASE_URL}/users`;

    const mockNotificationsPromise = [{
        type: 'LIKES',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "false",
        _id: "6264a41f6065aecb93894fb4",
        createdAt: "2022-04-24T01:13:03.042Z",
        updatedAt: "2022-04-24T01:13:03.042Z",
        __v: 0
    },
    {
        type: 'FOLLOWS',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "true",
        _id: "6264a4046065aecb93894fa0",
        createdAt: "2022-04-23T01:13:03.042Z",
        updatedAt: "2022-04-23T01:13:03.042Z",
        __v: 0
    }]

    const mockReadNotificationPromise = {
        type: 'LIKES',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "true",
        _id: "6264a41f6065aecb93894fb4",
        createdAt: "2022-04-24T01:13:03.042Z",
        updatedAt: "2022-04-24T01:13:03.042Z",
        __v: 0
    }

    const mockUnreadNotificationsPromise = [{
        type: 'LIKES',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "false",
        _id: "6264a41f6065aecb93894fb4",
        createdAt: "2022-04-24T01:13:03.042Z",
        updatedAt: "2022-04-24T01:13:03.042Z",
        __v: 0
    },
    {
        type: 'FOLLOWS',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "false",
        _id: "6264a4046065aecb93894fa0",
        createdAt: "2022-04-23T01:13:03.042Z",
        updatedAt: "2022-04-23T01:13:03.042Z",
        __v: 0
    }, {
        type: 'MESSAGES',
        userNotified: "623a18276cd5e5d3d27ee790",
        userActing: "624ca4a2417f103f5e08eaea",
        read: "false",
        _id: "6264a4046065aecb93894fa0",
        createdAt: "2022-04-23T01:13:03.042Z",
        updatedAt: "2022-04-23T01:13:03.042Z",
        __v: 0
    }]

    // Test findNotificationsForUser to retrieve mock notifications for a particular user
    it('find notifications for user', async () => {
        const mockAxios = jest.spyOn(api, 'get');

        api.get.mockImplementation(() =>
            Promise.resolve({ data: mockNotificationsPromise })
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const userNotifications = await findNotificationsForUser(userId);

        expect(mockAxios).toHaveBeenCalledWith(
            `${USERS_API}/${userId}/notifications`
        );
        expect(userNotifications).toStrictEqual(mockNotificationsPromise);
        mockAxios.mockRestore();
    });

    // Test markNotificationAsRead service to mark a given notifications as read
    it('mark a notification as read', async () => {
        const mockAxios = jest.spyOn(api, 'put');
        api.put.mockImplementation(() =>
            Promise.resolve({ data: mockReadNotificationPromise })
        );
        const notificationId = '6264a41f6065aecb93894fb4';
        const notificationToBeUpdated = await markNotificationAsRead(
            notificationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${NOTIFICATIONS_API}/${notificationId}/read`
        );
        expect(notificationToBeUpdated).toStrictEqual(mockReadNotificationPromise);
        mockAxios.mockRestore();
    });

    // Test findNotificationsForUser to retrieve mock notifications for a particular user
    it('find unread notifications for user', async () => {
        const mockAxios = jest.spyOn(api, 'get');

        api.get.mockImplementation(() =>
            Promise.resolve({ data: mockUnreadNotificationsPromise })
        );
        const userId = '623a18276cd5e5d3d27ee790';
        const userNotifications = await findUnreadNotificationsForUser(userId);

        expect(mockAxios).toHaveBeenCalledWith(
            `${USERS_API}/${userId}/notifications/unread`
        );
        expect(userNotifications).toStrictEqual(mockUnreadNotificationsPromise);
        mockAxios.mockRestore();
    });
});