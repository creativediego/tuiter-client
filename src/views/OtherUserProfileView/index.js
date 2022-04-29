import React, {useState, useEffect} from 'react';

import {Routes, Route, useParams} from 'react-router-dom';
import UsersTuits from './UsersTuits';
import UsersLikes from './UsersLikes';
import UsersDislikes from './UsersDislikes';
import ProfileNav from './ProfileNav';
import * as usersService from '../../services/users-service';
import * as followsService from '../../services/follows-service';
import {useSelector} from 'react-redux';
import {AlertBox} from '../../components';

/**
 * This component will render the profile of another user, seperate from the user who is currently logged in.
 * This profile page will look very similar to the current profile page, but will instead include follow and unfollow buttons
 * instead of edit profile buttons.
 *
 * @returns A page which renders another user's profile
 */
const OtherUserProfileView = () => {
    // We will maintain a user, the user whose profile page we are currently looking at,
    // and an authUser, the user who is currently logged in.
    const [user, setUser] = useState(null);
    const [error, setError] = useState();
    const [following, setFollowing] = useState(false);
    let {uid} = useParams();
    const authUser = useSelector((state) => state.user.data);

    // Find the user we want to render from the path parameters
    const findUser = async () => {
        const res = await usersService.findUserById(uid);
        if (res.error) {
            return setError(
                'We ran into an issue finding the user. Please try again later.'
            );
        }

        setUser(res);
    };

    // authUser requests to follow the user
    const followUser = async () => {
        const res = await followsService.followUser(uid, authUser.id);
        if (res.error) {
            return setError(
                'We ran into an issue following the user. Please try again later.'
            );
        }
        checkIfFollowing();
        findUser();
    };

    // authUser requests to unfollow the user
    const unfollowUser = async () => {
        const res = await followsService.unfollowUser(uid, authUser.id);
        if (res.error) {
            return setError(
                'We ran into an issue unfollowing the user. Please try again later.'
            );
        }
        checkIfFollowing();
        findUser();
    };

    // Check if the authenticated user is following the given user
    const checkIfFollowing = async () => {
        const res = await followsService.findAllFollowers(uid);

        // If we have an error return it
        if (res.error) {
            return setError(
                'We ran into an issue finding the user. Please try again later.'
            );
        } else {
            // Otherwise, check if the authUser is in the list of followers for this user.
            if (res.some((follower) => follower.username === authUser.username)) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        }
    };

    useEffect(() => {
        checkIfFollowing();
        findUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='ttr-profile'>
            <div className='border border-bottom-0'>
                <div className='mb-5 position-relative'>
                    <div className='bottom-0 left-0 position-relative'>
                        <div className='position-relative'>
                            <img
                                className='position-relative img-fluid ttr-z-index-1 ttr-top-40px ttr-width-150px rounded-circle'
                                alt='user profile'
                                src={user ? user.profilePhoto : ''}
                            />
                        </div>
                    </div>
                </div>

                <div className='p-2'>
                    <h5 className='fw-bolder pb-0 mb-0'>
                        {`${user ? user.name : ''}`}
                        <i className='fa fa-badge-check text-primary'></i>
                    </h5>
                    <h6 className='pt-0'>{`@${user ? user.username : ''}`}</h6>
                    <p className='pt-2'>{user ? user.bio : ''}</p>
                    <p>
                        {user
                            ? user.location
                                ? <i className='far fa-location-dot me-2'></i> + user.location
                                : ''
                            : ''}
                        <i className='far fa-link ms-3 me-2'></i>
                        {user ? (
                            user.website ? (
                                <a href={user.website} className='text-decoration-none'>
                                    {user.website}:
                                </a>
                            ) : (
                                ''
                            )
                        ) : (
                            ''
                        )}
                        <i className='far fa-calendar me-2'></i>
                        {user ? user.joinedDate : ''}
                    </p>
                    <b>{user ? user.followeeCount : 0}</b> Following
                    <b className='ms-4'>{user ? user.followerCount : 0}</b> Followers
                    {
                        // If the authenticated user is following this user, display the unFollow button.
                        // Otherwise, display the follow button
                        following ? (
                            <button onClick={unfollowUser}>UnFollow</button>
                        ) : (
                            <button onClick={followUser}>Follow</button>
                        )
                    }
                    <ProfileNav uid={uid}/>
                    {error && <AlertBox message={error}/>}
                </div>
            </div>
            <Routes>
                <Route path='/tuits' element={<UsersTuits uid={uid}/>}/>
                <Route path='/likes' element={<UsersLikes uid={uid}/>}/>
                <Route path='/dislikes' element={<UsersDislikes uid={uid}/>}/>
            </Routes>
        </div>
    );
};
export default OtherUserProfileView;
