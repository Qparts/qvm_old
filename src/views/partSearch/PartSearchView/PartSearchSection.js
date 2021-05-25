import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import SearchBox from '../../../components/SearchBox';
import { partSearch, getProductInfo, handleChangePage, resetLocationfilter, setFilter } from '../../../redux/slices/partSearch';
import constants from 'src/utils/constants';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function PartSearchSection() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handlePartSearch = (search) => {
        dispatch(resetLocationfilter());
        dispatch(setFilter({ filter: "" }));
        dispatch(handleChangePage({ newPage: 0 }));
        dispatch(partSearch(search, 0, constants.MAX, ""));
        getPartinfo(search);
    }

    const getPartinfo = (search) => {
        dispatch(getProductInfo(search, ""));
    }

    return (
        <Box sx={{ width: '100%' }}>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <SearchBox
                        handleSubmit={handlePartSearch} />
                </div>
            </div>

        </Box>
    );
}

export default PartSearchSection;
