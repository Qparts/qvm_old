import http from "./httpService";
import links from "../constants/links";

const productUrl = links.product;

const getSpecialOffersLive = () => {
    return http.get(productUrl.getSpecialOffersLive);
};

const getLatestSpecialOffersLive = () => {
    return http.get(productUrl.getLatestSpecialOffersLive);
};

const getSpecialOfferDetails = ({ specialOfferId, offset, max, filter }) => {
    return http.post(productUrl.specialOfferDetails, { specialOfferId, offset, max, filter });
}


export default {
    getSpecialOffersLive,
    getLatestSpecialOffersLive,
    getSpecialOfferDetails
};
