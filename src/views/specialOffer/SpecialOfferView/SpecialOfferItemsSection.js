import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { getSpecialOffersLive, setSelectedOffer } from 'src/redux/slices/specialOffer';
import { useSelector } from 'react-redux';
import helper from 'src/utils/helper';
import Button from "./../../../components/button/CustomButton";
import { useHistory } from "react-router";


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------


function SpecialOfferItemsSection(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();

    const { specialOffers = [], companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);




    useEffect(() => {
        if (specialOffers.length == 0) {
            dispatch(getSpecialOffersLive());
        }
    }, [])




    return (

        <Box sx={{ width: '100%' }}>
            <div className="row">
                {specialOffers.length > 0 &&

                    specialOffers.map((specialOffer, index) => {
                        return (
                            <div className="col-md-4" key={index}>
                                <Card  >
                                    <CardHeader title={themeDirection == 'rtl' ? companies.get(specialOffer.companyId).nameAr :
                                        companies.get(specialOffer.companyId).name} />


                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h4">{themeDirection == 'rtl' ? specialOffer.offerNameAr :
                                            specialOffer.offerName}</Typography>
                                        <div className="row">

                                            <div className="col-md-6" >
                                                {t("specialOfferTab.offerDueDate")}
                                            </div>
                                            <div className="col-md-6" >
                                                {helper.toDate(specialOffer.endDate)}
                                            </div>

                                            <div className="col-md-6" >
                                                {t("specialOfferTab.partsNo")}
                                            </div>
                                            <div className="col-md-6" >
                                                {specialOffer.numberOfItems}
                                            </div>
                                        </div>
                                        <Box sx={{ mb: 3 }} />

                                        <div className="row d-flex justify-content-center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                round
                                                onClick={() => {
                                                    history.push(`/app/special-offer/${specialOffer.id}`);
                                                    dispatch(setSelectedOffer({ selectedOffer: specialOffer }));
                                                }}
                                            >
                                                Details
                                        </Button>
                                        </div>

                                    </CardContent >
                                </Card>
                            </div>
                        )
                    })
                }
            </div >

        </Box >

    );
}

export default SpecialOfferItemsSection;
