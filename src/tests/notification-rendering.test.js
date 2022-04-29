/* eslint-disable testing-library/no-unnecessary-act */
import Notification from '../components/Notifications/notification';
import { MemoryRouter } from "react-router-dom";
import { act, create } from 'react-test-renderer';

/**
 * @File contains tests that ensures follows, likes, and messages notifications are rendered correctly, as well as 
 * rendering a read vs unread notification.
 */
describe('Notification types', () => {

    // test to ensure that a notification of type FOLLOWS renders correctly
    test('follows notification renders correctly', () => {
        let notification = {
            id: "123", type: "FOLLOWS", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: "false"
        };
        let followNotification
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-follows-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" followed you.")
    });

    // test to ensure that a notification of type messages renders correctly
    test('messages notification renders correctly', () => {
        let notification = {
            id: "123", type: "MESSAGES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: true
        };
        let followNotification;
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-messages-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" messaged you.")
    });

    // test to ensure that a notification of type likes renders correctly
    test('likes notification renders correctly', () => {
        let notification = {
            id: "123", type: "LIKES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: false
        };
        let followNotification;
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-likes-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" liked your tuit.")
    });

    // test to ensure username of the userActing is properly displayed
    test('username of userActing is displayed as part of the notification', () => {
        let notification = {
            id: "123", type: "LIKES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: false
        };
        let followNotification;
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-useracting-username' });
        const text = followsTextComponent.children;
        expect(text).toContain('alice');
    });

    // test to ensure that an unread notification is rendered using a strong tag
    test('unread notification renders with bold text', () => {
        let notification = {
            id: "123", type: "LIKES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: false
        };
        let followNotification;
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} />
                </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-text' });
        const text = followsTextComponent.children[0].type;
        expect(text).toBe('strong');
    });

    // test to ensure that an unread notification renders using a span tag (not strong)
    test('read notification renders with normal text', () => {
        let notification = {
            id: "123", type: "LIKES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: true
        };
        let followNotification;
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} />
                </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-text' });
        const text = followsTextComponent.children[0].type;
        expect(text).toBe('span');
    });
});