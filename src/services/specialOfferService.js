import http from "./httpService";
import links from "../constants/links";

const productUrl = links.product;
const subURL = links.subscriber;





const getSpecialOffersLive = () => {
    return http.get(productUrl.getSpecialOffersLive);
};


const getSpecialOfferDetails = ({ specialOfferId, offset, max, filter }) => {
    return http.post(productUrl.specialOfferDetails, { specialOfferId, offset, max, filter });
}





export default {
    getSpecialOffersLive,
    getSpecialOfferDetails
};
