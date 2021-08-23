import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import roundSend from '@iconify-icons/ic/round-send';
import EmojiPicker from 'src/components/EmojiPicker';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Input, Divider, IconButton, InputAdornment } from '@material-ui/core';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  input: { height: '100%' },
  sendIcon: {
    transform: theme.direction === 'rtl' ? 'rotate(180deg) !important' : 'rotate(0deg)'
  }
}));

// ----------------------------------------------------------------------

MessageInput.propTypes = {
  disabled: PropTypes.bool,
  conversationId: PropTypes.string,
  onSend: PropTypes.func,
  className: PropTypes.string
};

function MessageInput({
  disabled,
  conversationId,
  onSend,
  className,
  ...other
}) {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.authJwt);
  const { t } = useTranslation();

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend) {
      onSend({
        conversationId: conversationId,
        text: message,
        contentType: 'text',
        sender: user.subscriber.id,
        companyId: user.company.companyId
      });
    }
    setMessage('');
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder={t("Type a message")}
        className={classes.input}
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
            />
          </InputAdornment>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Icon icon={roundSend} width={24} height={24} className={classes.sendIcon} />
      </IconButton>
    </div>
  );
}

export default MessageInput;
