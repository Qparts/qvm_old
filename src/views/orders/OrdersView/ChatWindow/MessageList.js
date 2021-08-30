import clsx from 'clsx';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import chatService from 'src/services/chatService';
import { updateMessages } from 'src/redux/slices/chat';
import { useTranslation } from 'react-i18next';
import links from 'src/constants/links';
import {
  Avatar,
  Typography
} from '@material-ui/core';
// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: { height: '100%', padding: theme.spacing(3) },
  avatar: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginLeft: "auto",
    marginRight: "auto",
    '& .MuiAvatar-img': { borderRadius: '50%' },
    '& .MuiAvatar-root': { width: '100%', height: '100%' }
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

// ----------------------------------------------------------------------

MessageList.propTypes = {
  // conversation: PropTypes.object.isRequired,
  // className: PropTypes.string
};

const uploadUrl = links.upload;


function MessageList(props, ref) {
  const classes = useStyles();
  const scrollRef = useRef();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    messages,
    activeConversation,
    activeConversationId
  } = useSelector((state) => state.chat);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useSelector((state) => state.authJwt);
  const [enableScroll, setEnableScroll] = useState(true);
  const { t } = useTranslation();

  //members of active conversation.
  const currentContact = activeConversation?.members?.filter(x => x.id != user.subscriber.id);


  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeConversationId]);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current && page == 1) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    scrollMessagesToBottom();
  }, [messages, activeConversation]);


  useImperativeHandle(ref, () => ({
    scrollDown() {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }), [])


  //get previous 50 messages when scroll reaches the top.
  const onScroll = async e => {
    if (e.target.scrollTop == 0 && messages.length > 0 && hasMore) {
      setEnableScroll(false);
      try {
        const response = await chatService.getConversationMessage(
          activeConversation._id,
          page + 1
        );

        if (response.data.length > 0) {
          dispatch(updateMessages([...response.data, ...messages]));
          setPage(page + 1);
        }
        else {
          setHasMore(false);
        }
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight / 3;
        setEnableScroll(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const memberOfCompany = currentContact?.filter(x => x.companyId != user.company.companyId)[0];

  return (
    <div onScroll={onScroll} ref={scrollRef} style={{ height: 400, overflowY: enableScroll ? "scroll" : "hidden" }}>
      <div className={clsx(classes.root, props.className)}>
        {!hasMore &&
          <div
            className={classes.center}
            style={{ textAlign: 'center' }}
          >
            <div className={classes.avatar} >
              <Avatar alt={memberOfCompany?.companyName} src={uploadUrl.getCompanyLogo(`logo_${memberOfCompany?.companyId}.png`)} />
            </div>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 3 }}>
              {memberOfCompany?.companyName}
            </Typography>


            {t("There are no additional messages")}
          </div>}
        {pathname != '/app/chat/new' &&
          messages?.map((message, index) => (
            <MessageItem
              key={index}
              message={message}
              currentContact={currentContact}
            />
          ))
        }
      </div>
    </div>
  );
}

export default forwardRef(MessageList);
