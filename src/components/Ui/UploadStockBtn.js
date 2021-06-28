import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    Typography,
    useMediaQuery,
    Button,
    Box,
    Divider,
    FormControl,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Upload, Download } from '../../icons/icons';
import CustomInput from './Input';
import Select from './Select';
import CustomButton from './Button';
import Label from './Label';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    uploadStockBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    headCol: {
        color: theme.palette.secondary.main,
        borderBottom: '1px solid #EEF1F5',
        padding: theme.spacing(2)
    },
    downlaodInfo: {
        fontSize: '0.875rem',
        color: '#7E8D99',
        marginBottom: '8px',
        display: 'block'
    },
    uploadStockMainBtn: {
        color: theme.palette.primary.main,
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
    uploadbtn: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        top: '-4px',
        left: '0'
    },
}));

// ----------------------------------------------------------------------

const UploadStockBtn = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} className={classes.uploadStockBtn} style={{ background: props.bg, color: props.color }}>
                <Upload width='21px' height='21px' fill={props.color} />
                <Typography variant="body3" sx={{ marginLeft: '5px' }}>{t("upload stock")}</Typography>
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className={classes.headCol}>
                    {t("add stock")}
                    {handleClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ margin: 0 }}>
                        <Typography variant="body3" className={classes.downlaodInfo}>
                            {t("Download the excel file and use the format as it is, then upload the file")}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            round
                            component="span"
                            className={classes.uploadStockMainBtn}
                        >
                            {t("download stock file")}
                            <Download width='20' height='20' fill={theme.palette.primary.main} />
                        </Button>
                        <Divider />
                        <Select
                            label={t("branch")}
                            id="branch"
                            name="branch"
                            value='branch1'
                            spaceToTop='spaceToTop'
                        >
                            <MenuItem key="branch1" value="branch1">
                                branch1
                            </MenuItem>
                            <MenuItem key="branch2" value="branch2">
                                branch2
                            </MenuItem>
                        </Select>
                        <Label name={t("choose stock file")} />
                        <Box ml={2} sx={{ position: 'relative', textAlign: 'center', marginLeft: 0 }}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    round
                                    component="span"
                                    className={clsx(classes.uploadbtn, classes.uploadStockMainBtn)}
                                >
                                    {t("upload stock file")}
                                    <Upload width='20' height='20' fill={theme.palette.primary.main} />
                                </Button>
                            </label>
                        </Box>
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={handleChange} />}
                            label={t("special offer")}
                            style={{ marginTop: '15px', }}
                        />
                        {checked ?
                            <>
                                <Divider />
                                <CustomInput
                                    value=""
                                    name='offerName'
                                    type='text'
                                    label={t('add offer name')}
                                    spaceToTop='spaceToTop' />
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6}>
                                        <Label name={t("start in")} />
                                        <CustomInput value="" name='startIn' type='date' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Label name={t("ends in")} />
                                        <CustomInput value="" name='endsIn' type='date' />
                                    </Grid>
                                </Grid>
                                <CustomInput
                                    value=""
                                    name='discount'
                                    type='text'
                                    label={t('put discount value')}
                                    spaceToTop='spaceToTop' />
                            </> : ""}
                        <Box sx={{ marginTop: '20px' }}>
                            <CustomButton>{t("upload stock")}</CustomButton>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UploadStockBtn