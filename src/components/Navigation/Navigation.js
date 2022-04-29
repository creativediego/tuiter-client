import React from 'react';
import './navigation.css';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { findUnreadNotificationsForUser } from '../../services/notifications-service';
import { setUnreadNotifications } from '../../redux/userSlice';
import { socket } from '../../services/socket-config';
import {AlertBox} from "../index";

/**
 * Displays the main navigation menu of the app.
 */
function Navigation() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.unreadNotifications);
  const [error, setError] = useState();

  const authUser = useSelector((state) => state.user.data);

  // find all the unread notifications for a given user
  const findUnreadNotifications = async () => {
    const res = await findUnreadNotificationsForUser(authUser.id);
    if (res.error) {
      return setError('We ran into an issue. Please try again later.');
    }
    dispatch(setUnreadNotifications(res));
  };

  let notificationColor;
  if (notifications.length > 0) {
    notificationColor = '#2a9fd6';
  } else {
    notificationColor = 'white';
  }

  const listenForNewNotificationsOnSocket = async () => {
    socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
    socket.on('NEW_NOTIFICATION', () => {
      findUnreadNotifications();
    });
  };

  useEffect(() => {
    listenForNewNotificationsOnSocket();
    findUnreadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const links = [
    { label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter', color: 'white' },
    { label: 'Home', icon: 'fa-home', path: '/home', color: 'white' },
    { label: 'Explore', icon: 'fa-hashtag', path: '/explore', color: 'white' },
    {
      label: 'Notifications',
      icon: 'fa-bell',
      path: '/notifications',
      color: notificationColor,
    },
    {
      label: 'Messages',
      icon: 'fa-envelope',
      path: '/messages',
      color: 'white',
    },
    {
      label: 'Bookmarks',
      icon: 'fa-bookmark',
      path: '/bookmarks',
      color: 'white',
    },
    { label: 'Lists', icon: 'fa-list', path: '/lists', color: 'white' },
    {
      label: 'Profile',
      icon: 'fa-user',
      path: '/profile/my-tuits',
      color: 'white',
    },
    {
      label: 'More',
      icon: 'fa-circle-ellipsis',
      path: '/more',
      color: 'white',
    },
  ];

  return (
    <div className='ttr-navigation'>
      <ul className='list-group'>
        {links.map((link, ndx) => {
          return (
            <li
              key={ndx}
              className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
         ${pathname.indexOf(link.path) >= 0 ? 'fw-bold' : ''}`}
            >
              <Link
                to={link.path}
                id={link.label}
                className='text-decoration-none text-black'
              >
                <span className='position-relative'>
                  <i
                    className={`fa ${link.icon} text-center mx-2 position-relative`}
                    style={{ color: link.color }}
                  >
                    {link.label === 'Notifications' &&
                    notifications.length > 0 ? (
                      <span
                        className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                        style={{ fontSize: '.7rem' }}
                      >
                        {notifications.length}
                      </span>
                    ) : null}
                  </i>
                  <span className='ttr-label'>{link.label}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {error && <AlertBox message={error}/>}
    </div>
  );
}

export default Navigation;
