import React from 'react';
import {logoutThunk} from '../../redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const LogoutButton = () => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const logout = async () => {
        dispatch(logoutThunk(user));
    };
    return (
        <button
            onClick={() => logout()}
            className='mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right'
        >
            Logout
        </button>
    );
};

export default LogoutButton;
