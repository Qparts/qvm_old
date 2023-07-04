import constants from 'src/utils/constants';
import { GetData, SaveData } from 'src/utils/LocalStorage';
import partSearchService from '../partSearchService';


export function getAvaliableCompanies(selectedCompanies) {
    return async () => {
        try {

            const recentCompanyData = await GetData(constants.COMPANYIES);
            var cachedCompanies = new Map();

            getCachedCompany(recentCompanyData, selectedCompanies, cachedCompanies);

            var tempCompanies = new Map();
            await getMissingCompaniesFromAPI(tempCompanies, selectedCompanies);

            cacheMissingCompanies(recentCompanyData, tempCompanies);

            let newCompanies = new Map([...cachedCompanies, ...tempCompanies]);

            return newCompanies;

        } catch (error) {
            console.log(error);
            return null;
        }
    };
}

export const loadMissingCompanies = async (selectedCompanies) => {
    const recentCompanyData = await GetData(constants.COMPANYIES);
    var newCachedCompanies = new Map();

    getCachedCompany(recentCompanyData, selectedCompanies, newCachedCompanies);


    //get not cached companies from backend.
    var tempCompanies = new Map();
    await getMissingCompaniesFromAPI(tempCompanies, selectedCompanies);

    //add missing companies to cache.
    cacheMissingCompanies(recentCompanyData, tempCompanies);

    let newCompanies = new Map([...newCachedCompanies, ...tempCompanies]);

    return newCompanies;
}


export const getCachedCompany = (recentCompanyData, selectedCompanies, cachedCompanies) => {
    const companyMapData = new Map(recentCompanyData);
    if (companyMapData != null && companyMapData.size) {
        for (let item of selectedCompanies) {
            if (companyMapData.has(item)) {
                cachedCompanies.set(item, companyMapData.get(item));
                selectedCompanies.delete(item);
            }
        }
    }
}


export const getMissingCompaniesFromAPI = async (tempCompanies, selectedCompanies) => {
    if (selectedCompanies.size > 0) {
        const array = [...selectedCompanies];
        const companiesIds = array.join();

        const { data: companies } = await partSearchService.getCompanies({ companyId: companiesIds });
        for (let compnay of companies) {
            tempCompanies.set(compnay.id, compnay);
        }

    }
}


export const cacheMissingCompanies = (recentCompanyData, tempCompanies) => {
    if (recentCompanyData != null && recentCompanyData.length) {
        const existComapny = recentCompanyData;
        SaveData(constants.COMPANYIES, Array.from(new Map([...existComapny, ...tempCompanies]).entries()));
    } else {
        SaveData(constants.COMPANYIES, Array.from(tempCompanies.entries()));

    }
}
