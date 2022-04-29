import React from "react";
import {ChatFeed} from "react-chat-ui";

/**
 * A component to render the chat feed of a conversartion
 * @param messages messages between selected parties
 */
const Feed = ({messages}) => {
    return (
        <ChatFeed
            messages={messages} // Boolean: list of message objects
            maxHeight="500px"
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName={true} // show the name of the user who sent the message
            bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={{
                text: {
                    fontSize: 16,
                },
                chatbubble: {
                    borderRadius: 30,
                    padding: 20,
                    backgroundColor: "gray"
                },
                userBubble: {
                    backgroundColor: "#2a9fd6",
                },
            }}
        />
    );
};

export default Feed;