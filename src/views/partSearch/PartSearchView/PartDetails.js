import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import helper from 'src/utils/helper';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function PartDetails() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { selectedPart, companies } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);

    const { countries } = useSelector(
        (state) => state.authJwt
    );
    const [openItemID, setOpenItemID] = useState(0);


    const handleClick = (itemID) => {
        if (openItemID != itemID)
            setOpenItemID(itemID);
        else
            setOpenItemID(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {selectedPart != null &&
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="availability-details-subheader"
                >


                    {
                        selectedPart.stock.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ListItem button onClick={() => {
                                        handleClick(item.id)
                                    }} >
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={`${themeDirection == 'ltr' ? helper.getLocation(countries, null, item.countryId, item.regionId, item.cityId).city.name
                                            : helper.getLocation(countries, null, item.countryId, item.regionId, item.cityId).city.nameAr} 
                                        / ${themeDirection == 'ltr' ? helper.getBranch(item.branchId, companies.get(selectedPart.companyId).branches).name : helper.getBranch(item.branchId, companies.get(selectedPart.companyId).branches).nameAr}`} />
                                        {openItemID === item.id ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>

                                    <Collapse in={openItemID === item.id} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem sx={{ pl: 4 }} button>
                                                {
                                                    helper.getBranch(item.branchId, companies.get(selectedPart.companyId).branches).
                                                        contacts.length > 0 ?
                                                        helper.getBranch(item.branchId, companies.get(selectedPart.companyId).branches).
                                                            contacts.map((contact, index) => {
                                                                return (
                                                                    <ListItemText primary={`${contact.name}  / ${contact.email} / ${contact.phone} `} key={index} />
                                                                )
                                                            })
                                                        :
                                                        <ListItemText primary={t("no contacts found")} />
                                                }

                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </div>
                            )
                        })
                    }
                </List>
            }
        </Box >
    );
}

export default PartDetails;
