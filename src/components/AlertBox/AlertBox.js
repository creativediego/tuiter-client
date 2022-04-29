import React, {useEffect, useState} from 'react';
import {Alert} from 'react-bootstrap';
import './AlertBox.css';

/**
 * Displays an alert message with option to dismiss message.
 */
const AlertBox = ({heading, message}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (message) setShow(true);
    }, [message]);

    if (show) {
        return (
            <Alert
                variant='warning'
                className='alert-fixed'
                onClose={() => setShow(false)}
                dismissible
            >
                <Alert.Heading>{heading && heading}</Alert.Heading>
                <p>{message && message}</p>
            </Alert>
        );
    }
    return null;
};

export default AlertBox;
