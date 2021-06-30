import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Box,
    MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { getSpecialOffersLive } from 'src/redux/slices/specialOffer';
import helper from 'src/utils/helper';
import Offer from "./../../../components/Ui/Offer";
import Advertisement from "./../../../components/Ui/Advertise";
import SecContainerOffer from '../../../components/Ui/SecContainerOffer';
import Slider from '../../../components/Ui/Slider';
import Select from '../../../components/Ui/Select';
import Label from '../../../components/Ui/Label';

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


function SpecialOfferItemsSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { specialOffers = [], companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        if (specialOffers.length == 0) {
            dispatch(getSpecialOffersLive());
        }
    }, []);

    const toggleFilter = () => {
        setFilter(!filter);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={10} >
                <SecContainerOffer
                    header={t('Special Offers')}
                    filter={toggleFilter}>
                    {filter ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Select
                                    label={t("sort by")}
                                    id="sort"
                                    name="sort"
                                    value='branch1'
                                    selectBg='selectBg'
                                    spaceToTop="spaceToTop"
                                >
                                    <MenuItem key="branch1" value="branch1">
                                        branch1
                                    </MenuItem>
                                    <MenuItem key="branch2" value="branch2">
                                        branch2
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Select
                                    label={t("location")}
                                    id="location"
                                    name="location"
                                    value="Cairo"
                                    selectBg='selectBg'
                                    spaceToTop="spaceToTop"
                                >
                                    <MenuItem key="Cairo" value="Cairo">
                                        Cairo
                                    </MenuItem>
                                    <MenuItem key="Alex" value="Alex">
                                        Alex
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Select
                                    label={t("category")}
                                    id="category"
                                    name="category"
                                    value="Nissan"
                                    selectBg='selectBg'
                                    spaceToTop="spaceToTop"
                                >
                                    <MenuItem key="Nissan" value="Nissan">
                                        Nissan
                                    </MenuItem>
                                    <MenuItem key="KIA" value="KIA">
                                        KIA
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Label name={t("discount value")} />
                                <Slider />
                            </Grid>
                        </Grid>
                        : null}
                    <Grid container spacing={2}>
                        {specialOffers.map((specialOffer, index) => {
                            return (
                                <Grid item xs={12} md={3} key={index}>
                                    <Box sx={{ marginTop: '10px' }}>

                                        <Offer
                                            company={themeDirection == 'rtl' ? companies.get(specialOffer.companyId).nameAr : companies.get(specialOffer.companyId).name}
                                            offer={themeDirection == 'rtl' ? specialOffer.offerNameAr : specialOffer.offerName}
                                            date={helper.toDate(specialOffer.endDate)}
                                            partsNum={specialOffer.numberOfItems}
                                            discount='50%'
                                            timeLeft='70%'
                                            width='70%'
                                            parts={PARTS}
                                            specialOffer={specialOffer} />
                                    </Box>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </SecContainerOffer>
            </Grid>
            <Grid item xs >
                <Advertisement
                    url='/static/images/banner120.png'
                    width='120px'
                    height='600px' />
            </Grid>
        </Grid>
    );
}

export default SpecialOfferItemsSection;
