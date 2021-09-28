import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import { loadBranches } from 'src/redux/slices/branches';
import constants from 'src/utils/constants';
import BrancheActionsSection from './BrancheActionsSection';
import TableAction from '../../../../components/Ui/TableAction';
import { Delete, Edit } from "../../../../icons/icons";

// ----------------------------------------------------------------------

function UsersItemsSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { countries, loginObject } = useSelector((state) => state.authJwt);
    const users = loginObject.company.subscribers;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);

    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    // const showDetailsElement = (item) => {
    //     return (
    //         <TableAction
    //             type='setting'
    //             title={t("Edit")}
    //             titleDel={t("Delete")}
    //             textIcon={<Edit width='14' height='14' fill='#CCD3D7' />}
    //             textIconDel={<Delete width='13' height='16' fill='#CCD3D7' />}
    //         />
    //     )
    // }

    return (
        <Box sx={{ padding: users.length > constants.MAX ? '10px 15px' : '10px 15px 0' }}>
            <BrancheActionsSection />
            <Datatable
                header={[
                    {
                        name: t("Name"),
                        attr: 'name',
                    },
                    {
                        name: t("Phone"),
                        attr: 'mobile',
                    },
                    {
                        name: t("Email"),
                        attr: 'email',

                    },
                ]}
                // actions={[{ element: showDetailsElement }]}
                datatable={users}
                page={page}
                isLazy={false}
                rowsPerPage={rowsPerPage}
                hasPagination={users.length > constants.MAX ? true : false}
                dataTableSetting='dataTableSetting'
            />
        </Box>
    );
}

export default UsersItemsSection;
