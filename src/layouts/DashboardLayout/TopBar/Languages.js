import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useEffect } from 'react';
import PopoverMenu from 'src/components/PopoverMenu';
import { makeStyles } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import useSettings from './../../../hooks/useSettings';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 'ar',
    label: 'Arabic',
    icon: '/static/icons/ic_flag_ar.svg'
  }
];

const useStyles = makeStyles((theme) => ({
  btnLang: {
    padding: 0,
    width: 44,
    height: 44
  },
  isSelected: {
    backgroundColor: theme.palette.background.selected
  }
}));

// ----------------------------------------------------------------------

function Languages() {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { themeDirection, selectDirection } = useSettings();

  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage);

  useEffect(()=>{
    handleChatPosition(langStorage)
  },[])

  const handleChatPosition = (lang) => {
    const element = document.querySelector('#tidio-chat-iframe')

    if (element){
      const iframe = document.querySelectorAll('#tidio-chat-iframe')
      if (iframe) {
        iframe.forEach( item =>{

          const open = item.contentWindow.document.body.querySelector('.button-body');
          if (open) {
            const close = item.contentWindow.document.body.querySelector('.exit-chat');
            console.log('close',close);
            if (close) {
              close.addEventListener('click', function(event) {
                event.preventDefault();
                alert('7aamooo')
              });
            }
          }





          const widgetPosition = item.contentWindow.document.body.querySelector('.sidebar-position-right')
          if (widgetPosition) {
            lang == 'en' ?
            widgetPosition.className = 'widget-position-right sidebar-position-right bubbleWithLabel' :
            widgetPosition.className = 'widget-position-left sidebar-position-right bubbleWithLabel'
          }else{
            // setTimeout(()=>handleChatPosition(lang),4000)
          }
        })
      }else {
        setTimeout(()=>handleChatPosition(lang),2000)
      }

      if (lang == 'en') {
        element.style.marginLeft = 'auto'
        element.style.inset = "auto 9px 35px auto"
      }else {
        element.style.inset = "auto auto 35px 9px"
      }
    }
    else setTimeout(()=>handleChatPosition(lang),1000)
  }

  const handleChangeLanguage = (lng) => {
    if (lng == 'ar') {

      selectDirection('rtl');
      handleChatPosition('ar')
    }else {

      selectDirection('ltr');
        handleChatPosition('en')
    }
    i18n.changeLanguage(lng);
    setOpen(false);
  };



  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        className={clsx(classes.btnLang, { [classes.isSelected]: isOpen })}
      >
        <img
          src={(langStorage === 'en-US' || currentLang === undefined) ? LANGS[0].icon : currentLang.icon }
          alt={(langStorage === 'en-US' || currentLang === undefined) ? LANGS[0].label : currentLang.label }
        />
      </MIconButton>

      <PopoverMenu
        width={200}
        open={isOpen}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === langStorage}
              onClick={() => handleChangeLanguage(option.value)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </PopoverMenu>
    </>
  );
}

export default Languages;
