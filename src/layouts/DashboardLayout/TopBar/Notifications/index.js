import Scrollbars from 'src/components/Scrollbars';
import PopoverMenu from 'src/components/PopoverMenu';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Mail } from '../../../../icons/icons';
import UnseenMessage from './UnseenMessage';

// ----------------------------------------------------------------------

function Notifications() {
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();
  const { unseenMessages } = useSelector((state) => state.chat);
  const [companyUnseenMessages, setCompanyUnseenMessages] = useState(new Map())

  useEffect(() => {
    const map = new Map();
    for (let message of unseenMessages) {
      if (!map.has(message.companyId)) {
        map.set(message.companyId, [message]);
      } else
        map.get(message.companyId).push(message);
    }

    setCompanyUnseenMessages(map);
    // Array.from(map.values()).map(key => {
    //   console.log(key);
    // });

  }, [unseenMessages]);

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color={isOpen ? 'primary' : 'default'}
      >
        <Badge badgeContent={unseenMessages.length > 0 ? unseenMessages.length : null} color="error">
          <Mail width='24' height='24' fill='#7E8D99' />
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
            <Typography variant="subtitle1">{t("Messages")}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t("You have {{count}} unread messages",
                { count: unseenMessages.length })}
            </Typography>
          </Box>
        </Box>

        {unseenMessages.length > 0 &&
          <>
            <Divider />
            <Box sx={{ height: { xs: 340, sm: 'auto' } }}>
              <Scrollbars>
                <List disablePadding>
                  {
                    Array.from(companyUnseenMessages.values()).map((messages, index) => (
                      <UnseenMessage
                        key={index}
                        messages={messages}
                        setOpen={setOpen}
                      />
                    ))
                  }
                </List>
              </Scrollbars>
            </Box>

            <Divider />

            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                disableRipple
                component={RouterLink}
                to={PATH_APP.general.chat.root}
                onClick={() => setOpen(false)}>
                {t("View All")}
              </Button>
            </Box>
          </>}
      </PopoverMenu>
    </>
  );
}

export default Notifications;
