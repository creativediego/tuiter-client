import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import ConversationsInbox from '../../components/Messages/ConversationsInbox';
import Chat from '../../components/Messages/Chat';
import {findInboxMessagesThunk} from '../../redux/messageThunks';
import {AlertBox} from '../../components';

/**
 * Displays inbox or active chat based on the route. Uses the inbox messages fetched
 * and stored in redux state to set up custom URLs for each conversation based on its ID.
 */
const MessagesView = () => {
    const inbox = useSelector((state) => state.messages.inbox);
    const activeChat = useSelector((state) => state.messages.activeChat);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findInboxMessagesThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <h1>Messages</h1>
            {inbox && inbox.length < 1 && <AlertBox message={'No conversations.'}/>}
            <Routes>
                <Route
                    exact
                    path={`/`}
                    element={<ConversationsInbox conversations={inbox}/>}
                />
                <Route
                    exact
                    path={`/${activeChat && activeChat.id}`}
                    element={<Chat conversationId={activeChat && activeChat.id}/>}
                />
                {inbox && inbox.length > 0
                    ? inbox.map((message) => (
                        <Route
                            key={message.id}
                            path={`/${message.conversation}`}
                            element={<Chat conversationId={message.conversation}/>}
                        ></Route>
                    ))
                    : null}
            </Routes>
        </div>
    );
};

export default MessagesView;
