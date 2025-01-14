import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';
import clsx from 'clsx';
import { Upload } from '../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    uploadStockBox: {
        position: 'relative',
        textAlign: 'center',
        margin: '15px 0 0 0'
    },
    uploadbtn: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        top: '-4px',
        left: '0'
    },
    uploadStockFile: {
        width: '98%',
        margin: 'auto'
    },
    input: {
        padding: '2.5px 14px',
        width: '100%',
    },
    uploadStockMainBtn: {
        color: theme.palette.primary.main,
        fontSize: theme.typography.body3.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow: 'none',
        background: '#FFEDED',
        display: 'flex',
        marginBottom: '20px',
        '& $svg': {
            marginLeft: '5px'
        },
        '&:hover': {
            color: theme.palette.primary.main,
            background: '#FFEDED',
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
    xsFontEdit: {
        '@media (max-width: 353px) and (min-width: 300px)': {
            fontSize: theme.direction === 'ltr' ? '0.77rem' : '0.9375rem'
        },
    }
}));

// ----------------------------------------------------------------------

export default function CustomInput(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box className={classes.uploadStockBox}>
            <TextField
                className={classes.uploadStockFile}
                type="file"
                id={props.file}
                onChange={props.onChange}
                inputProps={{
                    className: classes.input,
                }}
                error={Boolean(props.touched && props.errors) || props.fileError}
                helperText={(props.touched && props.errors) || (props.fileError)}
            />
            <label htmlFor={props.file}>
                <Button
                    variant="contained"
                    color="primary"
                    round
                    component="span"
                    className={clsx(classes.uploadbtn, classes.uploadStockMainBtn, props.responsive && classes.xsFontEdit)}
                >
                    {props.value ? props.value.name : props.title}
                    {props.upload ? <Upload width='20' height='20' fill={theme.palette.primary.main} /> : null}
                </Button>
            </label>
        </Box>
    );
}