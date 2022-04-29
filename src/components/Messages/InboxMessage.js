import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    findInboxMessagesThunk,
    findMessagesByConversationThunk,
} from '../../redux/messageThunks';
import {deleteConversation} from '../../services/messages-service';
import {setGlobalError} from '../../redux/errorSlice';

/**
 * A component to render each individual conversation.
 * @param conversationconversation from a list of conversations
 */
const InboxMessage = ({conversation: message}) => {
    const userId = useSelector((state) => state.user.data.id);
    const dispatch = useDispatch();
    const handleDeleteConversation = async () => {
        const res = await deleteConversation(userId, message.conversation);

        if (res.error) {
            return dispatch(setGlobalError(res));
        }
        return dispatch(findInboxMessagesThunk());
    };
    return (
        <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
            <div className='pe-2'>
                {message.recipients && message.recipients.length > 0 && (
                    <img
                        src={
                            message.recipients[0].profilePhoto
                                ? message.recipients[0].profilePhoto
                                : `../images/${message.recipients[0].username}.jpg`
                        }
                        className='ttr-tuit-avatar-logo rounded-circle'
                        alt='profile'
                    />
                )}
            </div>
            <div className='w-100'>
                <i
                    onClick={() => handleDeleteConversation(message.id)}
                    className='fas btn fa-remove fa-2x fa-pull-right'
                ></i>
                <Link
                    to={`/messages/${message.conversation}`}
                    id={message.id}
                    className='text-decoration-none text-white'
                    onClick={() =>
                        dispatch(findMessagesByConversationThunk(message.conversation))
                    }
                >
                    <p className='fs-6 fw-bold'>
                        {message &&
                            message.recipients.length === 1 &&
                            message.recipients[0].name}
                        {message &&
                            message.recipients.length > 1 &&
                            message.recipients[0].name +
                            ', ' +
                            message.recipients[1].name +
                            ' ...'}
                    </p>
                    {message && message.message}
                </Link>
            </div>
        </li>
    );
};

export default InboxMessage;
