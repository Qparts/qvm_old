import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from 'src/components/Ui/Button';
import { Edit } from 'src/icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    marketActionsCont: {
        paddingTop: '20px',
        marginTop: '10px',
        textAlign: 'center',
        borderTop: '1px solid #ECF1F5'
    },
}));

// ----------------------------------------------------------------------

export default function MarketActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        props.activeStep ?
            <Box className={classes.marketActionsCont}>
                <Button onClick={props.clickContinueSh}>{t("Continue Shopping")}</Button>
            </Box>
            :
            <Box className={classes.marketActionsCont}>
                <Button
                    btnBg="btnBg"
                    btnWidth="btnWidth"
                    onClick={props.clickAction}
                >
                    {props.edit ?
                        <>
                            <Edit width='16' height='16' fill={theme.palette.primary.main} style={{ marginLeft: '5px' }} />
                            {t("Edit")}
                        </>
                        :
                        props.title
                    }

                </Button>
                <Button
                    type='submit'
                    btnWidth="btnWidth"
                    onClick={props.clickCompletePur}
                >
                    {t("Complete the purchase")}
                </Button>
            </Box>
    );
}