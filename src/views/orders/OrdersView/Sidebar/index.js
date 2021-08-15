import clsx from 'clsx';
import Search from './Search';
import Account from './Account';
import { Icon } from '@iconify/react';
import SearchResults from './SearchResults';
import { useHistory } from 'react-router-dom';
import ConversationList from './ConversationList';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import editFill from '@iconify-icons/eva/edit-fill';
import useBreakpoints from 'src/hooks/useBreakpoints';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import {
  onOpenSidebarConversation,
  onCloseSidebarConversation,
  getContacts,
  setActiveConversation,
  getCompanyUsers,
  getSelectedConversation
} from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import chatService from 'src/services/chatService';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: 320,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('width'),
    borderRight: `1px solid ${theme.palette.divider}`
  },
  collapse: { width: 96 },
  hide: { display: 'none' }
}));

// ----------------------------------------------------------------------

function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const isMoblie = useBreakpoints('down', 'md');
  const displayResults = searchQuery && isSearchFocused;

  const {
    conversations,
    isOpenSidebarConversation,
    activeConversationId,
    userConversations,
    onlineUsers
  } = useSelector((state) => state.chat);

  const { user, currentSocket } = useSelector((state) => state.authJwt);

  useEffect(() => {
    if (isMoblie) {
      return dispatch(onCloseSidebarConversation());
    }
    return dispatch(onOpenSidebarConversation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoblie]);

  useEffect(() => {
    if (!isOpenSidebarConversation) {
      return setSearchFocused(false);
    }
  }, [isOpenSidebarConversation]);

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  //search for companies by name to create new conversation.
  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await chatService.chatSearch(value);
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  //navigate to conversation chat window.
  const handleSearchSelect = (result) => {
    setSearchFocused(false);
    setSearchQuery('');
    history.push(`/app/chat/${result._id}`);
  };



  const handleSelectContact = async (result) => {
    if (result.id == user.subscriber.companyId)
      return;

    //get conversation from currant conversations
    let selectedConversation = getSelectedConversation(userConversations, result.id);

    //if selected company not exist in the current conversation create new conversation 
    //with the members of the selected company.
    if (selectedConversation == null) {

      let users = await getCompanyUsers(result.id, user);

      const response = await chatService.createUserConversation({
        members: users
      })

      selectedConversation = response.data;

      //update conversation list in the online members of the selected company.
      selectedConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
        let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
        if (onlineUserIndex != -1) {
          currentSocket.current.emit("updateContacts", member.id);
        }
      })

      //update login user conversation list.
      dispatch(getContacts(user.subscriber.id));
    }

    dispatch(setActiveConversation(selectedConversation));

    //navigate to selected conversation's chat window.
    if (handleSearchSelect) {
      handleSearchSelect(selectedConversation);
    }

  };


  const handleToggleConversation = () => {
    if (isOpenSidebarConversation) {
      return dispatch(onCloseSidebarConversation());
    }
    return dispatch(onOpenSidebarConversation());
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.collapse]: !isOpenSidebarConversation
      })}
    >
      <Box sx={{ py: 2, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isOpenSidebarConversation && (
            <>
              <Account />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <MIconButton onClick={handleToggleConversation}>
            <Icon
              width={20}
              height={20}
              icon={
                isOpenSidebarConversation
                  ? arrowIosBackFill
                  : arrowIosForwardFill
              }
            />
          </MIconButton>

          {isOpenSidebarConversation && (
            <MIconButton to="/app/chat/new" component={RouterLink}>
              <Icon icon={editFill} width={20} height={20} />
            </MIconButton>
          )}
        </Box>

        {isOpenSidebarConversation && (
          <Search
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbars>
        {!displayResults ? (
          <ConversationList
            userConversations={userConversations}
            conversations={conversations}
            isOpenSidebarConversation={isOpenSidebarConversation}
            activeConversationId={activeConversationId}
            className={clsx({
              [classes.hide]: isSearchFocused
            })}
          />
        ) : (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbars>
    </div>
  );
}

export default Sidebar;
