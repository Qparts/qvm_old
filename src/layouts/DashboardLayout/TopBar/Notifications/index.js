import Scrollbars from 'src/components/Scrollbars';
import ConversationItem from 'src/views/ChatView/Sidebar/ConversationItem';
import PopoverMenu from 'src/components/PopoverMenu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import {
  Box,
  List,
  Badge,
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import { Note } from '../../../../icons/icons';

// ----------------------------------------------------------------------

function Notifications() {

  const { t } = useTranslation();
  const history = useHistory();
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { conversations, isOpenSidebarConversation } = useSelector((state) => state.chat);
  const totalUnRead = conversations.allIds.filter((item) => conversations.byId[item].unreadCount > 0).length;

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color={isOpen ? 'primary' : 'default'}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Note width='24' height='24' fill='#7E8D99' />
        </Badge>
      </MIconButton>

      <PopoverMenu
        width={360}
        open={isOpen}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1"> {t("messages")} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('messages unread', { unReadNum: totalUnRead })}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ height: { xs: 340, sm: 'auto' } }}>
          <Scrollbars>
            <List disablePadding>
              {conversations.allIds.slice(0, 5).map((conversationId) => (
                <ConversationItem
                  key={conversationId}
                  isOpenSidebarConversation={isOpenSidebarConversation}
                  conversation={conversations.byId[conversationId]}
                  isSelected={false}
                  onSelectConversation={() => helper.handleSelectConversation(conversationId, conversations, history, setOpen(false))}
                />
              ))}
            </List>
          </Scrollbars>
        </Box>

        <Box sx={{ p: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            fullWidth
            disableRipple
            component={RouterLink}
            to={PATH_APP.general.chat.root}> {t("View All")} </Button>
        </Box>
      </PopoverMenu>
    </>
  );
}

export default Notifications;
