import Scrollbars from 'src/components/Scrollbars';
import ConversationItem from 'src/views/orders/OrdersView/Sidebar/ConversationItem';
import PopoverMenu from 'src/components/PopoverMenu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { userConversations, isOpenSidebarConversation } = useSelector((state) => state.chat);
  const totalUnRead = 5;
  // const totalUnRead = conversations.allIds.filter((item) => conversations.byId[item].unreadCount > 0).length

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
              {userConversations.map((item) => (
                <ConversationItem
                  key={item._id}
                  isOpenSidebarConversation={isOpenSidebarConversation}
                  conversation={item}
                  isSelected={false}
                  onSelectConversation={() => helper.handleSelectConversation(item, dispatch, history, `/app/chat/${item._id}`,  setOpen(false))}
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
