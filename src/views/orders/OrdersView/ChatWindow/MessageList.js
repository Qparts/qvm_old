import clsx from 'clsx';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';
import React, { useEffect, useState, useRef } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: { height: '100%', padding: theme.spacing(3) }
}));

// ----------------------------------------------------------------------

MessageList.propTypes = {
  // conversation: PropTypes.object.isRequired,
  className: PropTypes.string
};

function MessageList({ className, ...other }) {
  const classes = useStyles();
  const scrollRef = useRef();
  const { pathname } = useLocation();
  const {
    messages,
    activeConversation,
  } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.authJwt);

  //members of active conversation.
  const currentContact = activeConversation?.members?.filter(x => x.id != user.subscriber.id);



  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [messages , activeConversation]);

  return (
    <Scrollbars
      scrollableNodeProps={{ ref: scrollRef }}
      className={classes.scroll}
    >
      <div className={clsx(classes.root, className)} {...other}>
        { pathname != '/app/chat/new' && messages?.map((message , index) => (
          <MessageItem
            key={index}
            message={message}
            currentContact={currentContact}
          />
        ))}
      </div>
    </Scrollbars>
  );
}

export default MessageList;
