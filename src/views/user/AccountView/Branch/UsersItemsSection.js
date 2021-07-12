import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import { loadBranches } from 'src/redux/slices/branches';
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

    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='setting'
                title={t("Edit")}
                titleDel={t("Delete")}
                textIcon={<Edit width='14' height='14' fill='#CCD3D7' />}
                textIconDel={<Delete width='13' height='16' fill='#CCD3D7' />}
            />
        )
    }

    return (
        <Box sx={{ padding: '10px 15px 0' }}>
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
                actions={[{ element: showDetailsElement }]}
                datatable={users}
                page={page}
                isLazy={false}
            />
        </Box>
    );
}

export default UsersItemsSection;
