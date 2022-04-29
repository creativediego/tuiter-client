import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setGlobalError} from '../../redux/errorSlice';
import {findMessagesByConversationThunk} from '../../redux/messageThunks';
import {deleteMessage} from '../../services/messages-service';
import './Message.css';

const Message = ({message}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data.id);
    const isLoggedInUser = message.sender.id === userId;
    const [showOptions, setShowOptions] = useState(false);

    const bgColor = isLoggedInUser ? 'bg-primary' : 'bg-light';
    const position = isLoggedInUser ? 'flex-row-reverse' : 'justify-row';
    const displayAvatar = !isLoggedInUser;
    const bubbleBorder = isLoggedInUser
        ? 'logged-in-user-message'
        : 'other-user-message';

    const handleDeleteMessage = async () => {
        const res = await deleteMessage(userId, message.id);
        setShowOptions(false);
        if (res.error) {
            return dispatch(setGlobalError(res));
        }
        return dispatch(findMessagesByConversationThunk(message.conversation));
    };

    return (
        <div className={`d-flex ${position} align-items-center mb-4`}>
            {displayAvatar && (
                <span style={{width: '8%'}}>
          <img
              className='img-fluid rounded-circle'
              src={message.sender.profilePhoto}
              alt='profile'
          />
        </span>
            )}

            <div className={`d-flex ${position} align-items-center`}>
        <span
            className={`btn rounded-pill text-white w-auto text-start ${bgColor} ${bubbleBorder}`}
            onClick={() => setShowOptions(!showOptions)}
        >
          {message.message}
        </span>
                {showOptions && (
                    <span className='px-2 btn text-danger' onClick={handleDeleteMessage}>
            <i className='fa-solid fa-trash-can'></i> Delete for you
          </span>
                )}
            </div>

            <span className='px-2 badge text-dark'>{message.createdAt}</span>
        </div>
    );
};

export default Message;
