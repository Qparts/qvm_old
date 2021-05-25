import http from "./httpService";
import links from "../constants/links";

const productUrl = links.product;
const subURL = links.subscriber;



const productSearch = ({ query, offset, max, filter , locationFilters }) => {
    return http.post(productUrl.productSearch, { query, offset, max, filter , locationFilters });
};

const productInfoSearch = ({ query, filter }) => {
    return http.post(productUrl.productInfoSearch, { query, filter });
};

const getCompanies = ({ companyId }) => {
    return http.get(subURL.getCompanies + companyId);
};


export default {
    productSearch,
    productInfoSearch,
    getCompanies
};
