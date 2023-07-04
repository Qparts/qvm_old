import http from "./httpService";
import links from "../constants/links";

const productUrl = links.product;

const getSpecialOffersLive = (params = {}) => {
    return http.get(productUrl.getSpecialOffersLive, {params: params});
};

const getSpecialOfferDetails = ({ specialOfferId, offset, max, filter }) => {
    return http.post(productUrl.specialOfferDetails, { specialOfferId, offset, max, filter });
}


export default {
    getSpecialOffersLive,
    getSpecialOfferDetails
};
