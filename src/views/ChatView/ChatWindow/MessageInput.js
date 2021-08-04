import clsx from 'clsx';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import roundSend from '@iconify-icons/ic/round-send';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Input,
  Divider,
  IconButton,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  input: { height: '100%' }
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
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

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
        messageId: faker.random.uuid(),
        message: message,
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: '8864c717-587d-472a-929a-8e5f298024da-0'
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
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>
    </div>
  );
}

export default MessageInput;
