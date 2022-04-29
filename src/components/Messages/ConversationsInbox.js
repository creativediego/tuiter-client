import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {findInboxMessagesThunk} from '../../redux/messageThunks';
import {useDispatch, useSelector} from 'react-redux';
import {socket} from '../../services/socket-config';
import InboxMessage from './InboxMessage';
import {PopupModal} from '../index';
import FindUsers from '../FindUsers/FindUsers';
import {setGlobalError} from '../../redux/errorSlice';
import {setActiveChat} from '../../redux/messageSlice';
import {createConversation as APIcreateConversation} from '../../services/messages-service';

/**
 * A container component to display a list of conversations.
 * @param conversations conversations list returned by an API
 * @returns {JSX.Element}
 */
const ConversationsInbox = ({conversations = []}) => {
    const loggedInUser = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [showNewMessageModal, setShowNewMessageModal] = useState(false);
    const [newConversationUsers, setNewConversationUsers] = useState([]);
    let navigateToChatView = useNavigate();

    const listenForNewMessagesOnSocket = () => {
        socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
        socket.on('NEW_MESSAGE', () => {
            dispatch(findInboxMessagesThunk()); // Fetch fresh conversations.
        });
    };

    const createNewConversation = async () => {
        const conversation = {
            createdBy: loggedInUser.id,
            participants: newConversationUsers.map((user) => user.id),
        };
        const newConversation = await APIcreateConversation(
            loggedInUser,
            conversation
        );

        if (newConversation.error) {
            return dispatch(setGlobalError(newConversation.error));
        }
        dispatch(setActiveChat(newConversation));
        navigateToChatView(`/messages/${newConversation.id}`, {
            replace: true,
        });
    };

    useEffect(() => {
        listenForNewMessagesOnSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newMessageModalProps = {
        content: {
            size: 'md',
            title: 'New Message',
            body: (
                <FindUsers
                    selectedUsers={newConversationUsers}
                    setSelectedUsers={setNewConversationUsers}
                />
            ),
            submitLabel: 'Next',
        },
        show: showNewMessageModal,
        setShow: setShowNewMessageModal,
        handleSubmit: createNewConversation,
    };

    return (
        <div>
            <ul className='ttr-tuits list-group'>
                {conversations ? (
                    conversations.map((conversation) => (
                        <InboxMessage conversation={conversation} key={conversation.id}/>
                    ))
                ) : (
                    <p>Empty conversations</p>
                )}
            </ul>
            <button
                onClick={() => setShowNewMessageModal(true)}
                className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
            >
                <span>New message</span>
            </button>
            <PopupModal props={newMessageModalProps}/>
        </div>
    );
};

export default ConversationsInbox;
