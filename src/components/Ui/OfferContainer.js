import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import helper from 'src/utils/helper';
import Offer from "./Offer";
import { setSelectedOffer } from 'src/redux/slices/specialOffer';

// ----------------------------------------------------------------------

const PARTS = [
    {
        shortcut: '/static/icons/ic_chrome.svg'
    },
    {
        shortcut: '/static/icons/ic_drive.svg'
    },
    {
        shortcut: '/static/icons/ic_dropbox.svg'
    },
];

// ----------------------------------------------------------------------


function OfferContainer(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);

    return (
        <Grid container spacing={2}>
            {props.offers.map((specialOffer, index) => {
                return (
                    <Grid item xs={12} sm={6} md={props.md} key={index}>
                        <Box
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                history.push(`/app/special-offer/${specialOffer.id}`);
                                dispatch(setSelectedOffer({ selectedOffer: specialOffer }));
                            }}>
                            <Offer
                                company={themeDirection == 'rtl' ? companies.get(specialOffer.companyId).nameAr : companies.get(specialOffer.companyId).name}
                                offer={themeDirection == 'rtl' ? specialOffer.offerNameAr : specialOffer.offerName}
                                date={helper.toDate(specialOffer.endDate)}
                                partsNum={specialOffer.numberOfItems}
                                discount='50%'
                                timeLeft={helper.calculateTimeLeft(specialOffer.startDate, specialOffer.endDate) + '%'}
                                parts={PARTS} />
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default OfferContainer;
