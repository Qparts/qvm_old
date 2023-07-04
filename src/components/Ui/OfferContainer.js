import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import helper from 'src/utils/helper';
import Offer from "./Offer";
import { setSelectedOffer } from 'src/redux/slices/specialOffer';

// ----------------------------------------------------------------------


function OfferContainer(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { filteredSpecialOffers = [], companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);

    return (
        <Grid container spacing={2}>
            {filteredSpecialOffers.map((specialOffer, index) => {
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
                                timeLeft={helper.calculateTimeLeft(specialOffer.startDate, specialOffer.endDate) + '%'}
                                tags={specialOffer.tag} />
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default OfferContainer;
