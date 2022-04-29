import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFoundUsers, findUsersByNameThunk } from '../../redux/userSlice';
import Search from '../Search/Search';

/**
 * Container that displays a search bar to search for users and results.
 * @param {{}} selectedUsers the users selected from the search result; the state is maintained by the parent, which uses it to dispatch an action to another component
 * @param {Function} setSelectedUsers sets the selectedUsers state
 */
const FindUsers = ({ selectedUsers, setSelectedUsers }) => {
  const dispatch = useDispatch();
  const allFoundUsers = useSelector((state) => state.user.foundUsers);
  const [searchValue, setSearchValue] = useState('');

  /**
   * Uses search value from Search component to dispatch an API call to find users by name or username.
   */
  const findAllUsers = useCallback(
    (searchValue) => {
      if (!searchValue) return;
      return dispatch(findUsersByNameThunk(searchValue));
    },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue]
  );

  useEffect(() => {
    findAllUsers(searchValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findAllUsers]);

  /**
   * When the user selects someone from the search results, this function resets the search inbox value, clears the found users in the results in redux state, and sets the state of the selected users maintained by the parent component (which then makes an API call).
   */
  const selectUsersForParentComponent = (user) => {
    setSearchValue('');
    dispatch(clearFoundUsers());
    return setSelectedUsers([...selectedUsers, user]);
  };
  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {selectedUsers.map((user) => (
        <span key={user.id} className='badge rounded-pill bg-primary'>
          {user.name || user.firstName}
        </span>
      ))}
      <hr />

      <h5 className='mt-4'>Results</h5>
      {allFoundUsers.map((user) => (
        <div key={user.id}>
          <p
            className='btn'
            onClick={() => selectUsersForParentComponent(user)}
          >
            {user.name || user.firstName} @{user.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FindUsers;
