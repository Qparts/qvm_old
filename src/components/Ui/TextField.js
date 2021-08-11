import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    inputStyl: {
        background: '#F6F8FC',
        color: theme.palette.secondary.darker + '!important',
        border: '1px solid #EEF1F5',
        borderRadius: '10px',
        padding: '13px',
        fontSize: theme.typography.body3.fontSize,
        textAlign: 'left',
        '&:focus': {
            background: '#F6F8FC',
            borderRadius: '10px',
        }
    },
    inputCont: {
        width: '100%',
        '& > label': {
            fontSize: theme.typography.body3.fontSize,
        },
        '& > div': {
            borderRadius: '10px',
            '& > fieldset': {
                borderWidth: 0,
            },
        },
        '& > div:before, & > div:hover:not($disabled):before, & > div:after': {
            border: '0 !important',
        },
    },
    selectBg: {
        background: theme.palette.grey[0],
        '&:focus': {
            background: theme.palette.grey[0],
        }
    },
    dateFilter: {
        position: 'absolute',
        right: '0',
        top: '-47px',
        zIndex: '10',
    },
    datePadding: {
        padding: '5px 10px'
    },
    spaceToTop: {
        marginTop: '15px'
    },
    dateFilterWidth: {
        width: 'auto'
    },
    dateCont: {
        marginTop: '15px',
        '& label': {
            fontSize: theme.typography.body3.fontSize
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root, & .rtl-9qm03c-MuiInputBase-root-MuiOutlinedInput-root': {
            background: '#F6F8FC',
        },
        '& input': {
            padding: '13px 14px'
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, & .rtl-9qm03c-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#EEF1F5',
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, & .rtl-9qm03c-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px'
        },
        '& fieldset': {
            borderRadius: '10px'
        }
    },
    inputTopBarSearch: {
        borderRadius: '20px 0px 0px 20px',
        '&:focus': {
            borderRadius: '20px 0px 0px 20px',
        }
    },
    inputContTopBarSearch: {
        '& > div': {
            borderRadius: '20px 0px 0px 20px',
        },
    },
}));

// ----------------------------------------------------------------------

export default function CustomTextField(props) {
    const classes = useStyles();

    let textFieldType;

    if (props.type === 'select') {
        textFieldType = (
            <TextField
                select
                fullWidth
                label={props.label}
                id={props.id}
                className={clsx(classes.inputCont, classes[props.dateFilter], classes[props.spaceToTop], classes[props.dateFilterWidth])}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                variant="outlined"
                {...props.getField}
                error={Boolean(props.touched && props.errors)}
                helperText={props.touched && props.errors}
                inputProps={{
                    className: clsx(classes.inputStyl, classes[props.selectBg], classes[props.datePadding]),
                    onChange: props.onChange,
                    name: props.name
                }}
            >
                {props.children}
            </TextField>
        )
    } else if (props.type === 'input') {
        textFieldType = (
            <TextField
                className={clsx(classes.inputCont, classes[props.spaceToTop], classes[props.inputContTopBarSearch])}
                value={props.value}
                type={props.inputType}
                label={props.label}
                id={props.id}
                variant="outlined"
                {...props.getField}
                error={Boolean(props.touched && props.errors)}
                helperText={props.touched && props.errors}
                inputProps={{
                    className: clsx(classes.inputStyl, classes[props.selectBg], classes[props.inputTopBarSearch]),
                    onChange: props.onChange,
                    name: props.name,
                }} />
        )
    } else if (props.type === 'date') {
        textFieldType = (
            <DatePicker
                mask='__/__/____'
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                renderInput={(params) =>
                    <TextField {...params}
                        required
                        id={props.id}
                        fullWidth
                        className={classes.dateCont}
                        name={props.name}
                        error={Boolean(props.touched && props.errors)}
                        helperText={props.touched && props.errors}
                    />
                }
            />
        )
    } else if (props.type === 'inputMap') {
        textFieldType = (
            <TextField
                value={props.value}
                label={props.label}
                variant="outlined"
                {...props.getInputProps({
                    className: clsx(classes.inputCont, classes[props.spaceToTop])
                })}
                inputProps={{
                    className: classes.inputStyl,
                }} />
        )
    } else {
        textFieldType = (
            <TextField
                className={clsx(classes.inputCont, classes[props.spaceToTop], classes[props.inputContTopBarSearch])}
                value={props.value}
                placeholder={props.placeholder}
                id={props.id}
                {...props.getField}
                error={Boolean(props.touched && props.errors)}
                helperText={props.touched && props.errors}
                inputProps={{
                    className: clsx(classes.inputStyl, classes[props.selectBg], classes[props.inputTopBarSearch]),
                    onChange: props.onChange,
                    name: props.name
                }} />
        )
    }

    return textFieldType;
}