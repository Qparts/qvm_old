import Sidebar from './Sidebar';
import Page from 'src/components/Page';
import ChatWindow from './ChatWindow';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getConversations, getContacts } from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  card: {
    height: '89.8vh',
    display: 'flex',
    borderTop: '5px solid' + theme.palette.secondary.darker,
    [theme.breakpoints.up('lg')]: {
      height: '87.75vh',
    }
  }
}));

// ----------------------------------------------------------------------

function ChatView() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat-App | Minimal-UI">
      <Box className={classes.card}>
        <Sidebar />
        <ChatWindow />
      </Box>
    </Page>
  );
}

export default ChatView;
