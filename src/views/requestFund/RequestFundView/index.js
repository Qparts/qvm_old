import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import Page from 'src/components/Page';
import RequestFund from './RequestFund';
import { getfundRequests } from 'src/redux/slices/requestFund';
import EmptyContent from 'src/components/Ui/EmptyContent';
import RequestFundHistory from './RequestFundHistory';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    overlayFullPage: {
        '& ._loading_overlay_overlay': { position: 'fixed', zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function RequestFundView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isLoading, pendingRequest, fundRequests } = useSelector((state) => state.requestFund);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getfundRequests());
    }, [])


    return (
        <Page
            title={t("Request Fund")}
            className={classes.root}
        >
            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                className={classes.overlayFullPage}
                spinner={
                    <LoadingScreen />
                }
            >
                {!isLoading &&
                    <>
                        {pendingRequest ?
                            <div>
                                <EmptyContent
                                    btnHome
                                    title={t("You Still Have Pending Fund Request")}
                                    description={t("This Request Is Under Review", { value: pendingRequest.id })}
                                />
                            </div>
                            :
                            <RequestFund overlay={classes.overlayFullPage} />
                        }
                        {fundRequests.length > 0 && <RequestFundHistory />}
                    </>
                }
            </LoadingOverlay>
        </Page>
    );
}

export default RequestFundView;
