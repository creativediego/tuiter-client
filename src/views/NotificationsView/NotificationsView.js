import { findNotificationsForUser, findAllNotifications } from '../../services/notifications-service';

import React, {useEffect, useState} from 'react';
import Notifications from "../../components/Notifications/index.js";
import {useSelector} from "react-redux";
import { socket } from '../../services/socket-config';

/**
 * Creates a page that displays all of the notifications for a given user 
 */
const NotificationsView = () => {
    const [notifications, setNotifications] = useState([]);
    const [setError] = useState();

    const authUser = useSelector((state) => state.user.data);

    // find all the notifications for a given user
    const findMyNotifications = async () => {
        const res = await findNotificationsForUser(authUser.id);
        if (res.error) {
            return setError(
                'We ran into an issue showing your notifications. Please try again later.'
            );
        }
        setNotifications(res);
    };

    const listenForNewFollowsOnSocket = async () => {
        socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
        socket.on('NEW_FOLLOW', () => {
        // when a new message is emitted to the room
        console.log('new follow from server!');
        findMyNotifications();
    });
    };


    useEffect(() => {
        listenForNewFollowsOnSocket();
    });
    return (
        <div>
            <h1>Notifications</h1>
            <Notifications notifications={notifications}/>
        </div>
    );
};
export default NotificationsView;