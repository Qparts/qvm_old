import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
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


function OfferContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { specialOffers = [], companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);

    return (
        <>
            {specialOffers.map((specialOffer, index) => {
                return (
                    <Box
                        key={index}
                        sx={{ marginTop: '10px', cursor: 'pointer' }}
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
                            timeLeft='70%'
                            width='70%'
                            parts={PARTS} />
                    </Box>
                )
            })
            }
        </>
    );
}

export default OfferContainer;
