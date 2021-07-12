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
import Advertisement from "./../../../components/Ui/Advertise";
import SecContainerOffer from '../../../components/Ui/SecContainerOffer';
import Slider from '../../../components/Ui/Slider';
import TextField from '../../../components/Ui/TextField';
import Label from '../../../components/Ui/Label';
import OfferContainer from '../../../components/Ui/OfferContainer';

// ----------------------------------------------------------------------

function SpecialOfferItemsSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { specialOffers = [] } = useSelector((state) => state.specialOffer);
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
        <Box display="flex">
            <Box flexGrow={1} >
                <SecContainerOffer
                    header={t('Special Offers')}
                    filter={toggleFilter}>
                    {filter ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    type='select'
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
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    type='select'
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
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    type='select'
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
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Label name={t("discount value")} />
                                <Slider />
                            </Grid>
                        </Grid>
                        : null}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <OfferContainer />
                        </Grid>
                    </Grid>
                </SecContainerOffer>
            </Box>
            <Box sx={{ paddingLeft: 2 }} >
                <Advertisement
                    url='/static/images/banner120.png'
                    width='120px'
                    height='600px' />
            </Box>
        </Box>
    );
}

export default SpecialOfferItemsSection;
