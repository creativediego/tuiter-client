import {createAsyncThunk} from '@reduxjs/toolkit';
import * as messageAPI from '../services/messages-service';
import {dataOrStateError} from './helpers';

/**
 * The following thunks call the messages API for different CRUD operations and to return the data to the messages slice where state is updated.
 */

/**
 * Fetch inbox messages.
 */
export const findInboxMessagesThunk = createAsyncThunk(
    'messages/findInbox',
    async (data, ThunkAPI) => {
        const userId = ThunkAPI.getState().user.data.id;
        let inboxMessages = await messageAPI.findInboxMessages(userId, ThunkAPI);
        // inboxMessages.forEach((inboxMessage) => {
        //   // Remove logged-in user from list of recipients
        //   inboxMessage.recipients = inboxMessage.recipients.filter(
        //     (recipient) => recipient._id !== userId
        //   );
        // });
        return dataOrStateError(inboxMessages, ThunkAPI);
    }
);

/**
 * Fetch a specific conversation and all messages related to it.
 */
export const findMessagesByConversationThunk = createAsyncThunk(
    'messages/findMessagesByConversation',
    async (conversationId, ThunkAPI) => {
        const userId = ThunkAPI.getState().user.data.id;
        let conversation = await messageAPI.findConversation(
            userId,
            conversationId
        );
        let messages = await messageAPI.findMessagesByConversation(
            userId,
            conversationId
        );
        conversation = dataOrStateError(conversation, ThunkAPI);
        messages = dataOrStateError(messages, ThunkAPI);
        return {conversation, messages};
    }
);

/**
 * Post a new message.
 */
export const sendMessageThunk = createAsyncThunk(
    'messages/sendMessage',
    async (messageBody, ThunkAPI) => {
        const userId = messageBody.sender;
        const conversationId = messageBody.conversationId;
        const message = messageBody.message;
        const newMessage = await messageAPI.sendMessage(
            userId,
            conversationId,
            message
        );
        console.log(newMessage);
        ThunkAPI.dispatch(findMessagesByConversationThunk(conversationId));
        // push message to front of array in state
        return dataOrStateError(newMessage, ThunkAPI);
    }
);
/**
 * Post a new conversation.
 */
export const createConversationThunk = createAsyncThunk(
    'messages/createConversation',
    async (conversation, ThunkAPI) => {
        const userId = ThunkAPI.getState().user.data.id;
        const newConversation = await messageAPI.createConversation(
            userId,
            conversation
        );
        return dataOrStateError(newConversation, ThunkAPI);
    }
);
