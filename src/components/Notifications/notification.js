import React, { useState } from 'react';
import {
  markNotificationAsRead,
  findUnreadNotificationsForUser,
  findNotificationsForUser,
} from './../../services/notifications-service';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadNotifications } from '../../redux/userSlice';

/**
 * @File A component to render one notification.
 */
const Notification = ({ notificationFromList }) => {
  const [notification, setNotification] = useState(notificationFromList);
  const authUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // create a notification message depending on the type of notification
  let notificationLink;
  if (notification.type === 'FOLLOWS') {
    notificationLink = (
      <Link
        className='text-decoration-none text-white'
        to={`/tuiter/${notification.userActing.id}/tuits`}
      >
        {' '}
        <span className='ttr-follows-notification-text'>
          {' '}
          followed you.
        </span>{' '}
      </Link>
    );
  } else if (notification.type === 'LIKES') {
    notificationLink = (
      <Link
        className='text-decoration-none text-white'
        to={`/tuiter/${notification.userNotified.id}/tuits`}
      >
        {' '}
        <span className='ttr-likes-notification-text'> liked your tuit.</span>
      </Link>
    );
  } else {
    notificationLink = (
      <Link className='text-decoration-none text-white' to={`/messages`}>
        {' '}
        <span className='ttr-messages-notification-text'>
          {' '}
          messaged you.
        </span>{' '}
      </Link>
    );
  }

  const userActingLink = (
    <Link to={`/tuiter/${notification.userActing.id}`}>
      {' '}
      <span className='ttr-useracting-username'>
        {' '}
        @{notification.userActing && notification.userActing.username}{' '}
      </span>
    </Link>
  );

  let boxColor;
  if (notification.read) {
    boxColor = 'black';
  } else {
    boxColor = '#0f2d3c';
  }

  const handleMarkAsRead = async (notificationId) => {
    await markNotificationAsRead(notificationId);

    // Retrieve the lists of unread notifications and total notifications
    const freshNotifications = await findUnreadNotificationsForUser(
      authUser.id
    );
    const allNotifications = await findNotificationsForUser(
        authUser.id
    );

    // If either results in an error, return
    if (freshNotifications.err || allNotifications.err) {
      return;
    }

    // Find this notification in the resultSet and re-render it
    for (var notification of allNotifications) {
        if (notification.id === notificationId) {
            setNotification(notification);
        }
    }

    // Otherwise dispatch the updated data to redux
    dispatch(setUnreadNotifications(freshNotifications));
  };

  return (
    <li
      className={'p-2 list-group-item d-flex rounded-0'}
      data-testid='ttr-notification-component'
      onClick={() => handleMarkAsRead(notification.id)}
      ref={(el) => {
        if (el) {
          el.style.setProperty('background-color', boxColor, 'important');
        }
      }}
    >
      <div className='pe-2'>
        {notification.userActing && (
          <img
            src={
              notification.userActing.profilePhoto
                ? notification.userActing.profilePhoto
                : `../images/${notification.userActing.username}.jpg`
            }
            className='ttr-tuit-avatar-logo rounded-circle'
            alt='profile'
          />
        )}
      </div>
      <span className='ttr-text'>
        {notification.read ? (
          <span className='ttr-text-normal'>
            {' '}
            {userActingLink} {notificationLink}{' '}
          </span>
        ) : (
          <strong className='ttr-text-strong'>
            {' '}
            {userActingLink} {notificationLink}
          </strong>
        )}
      </span>
    </li>
  );
};
export default Notification;
