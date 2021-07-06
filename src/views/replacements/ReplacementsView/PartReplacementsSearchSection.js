import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import SearchBox from '../../../components/SearchBox';
import { getPartReplacements } from 'src/redux/slices/replacements';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function PartReplacementsSearchSection() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleReplacementsPartSearch = (search) => {
        dispatch(getPartReplacements(search));

    }


    return (
        <Box sx={{ width: '100%' }}>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <SearchBox
                        handleSubmit={handleReplacementsPartSearch} title='search' type='general' />
                </div>
            </div>

        </Box>
    );
}

export default PartReplacementsSearchSection;
