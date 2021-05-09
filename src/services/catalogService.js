import http from "./httpService";
import links from "../constants/links";

const cataloghUrl = links.catalog;



function getCatalogs() {
    return http.get(cataloghUrl.getCatalogs);
}

function getModels(catalogid) {
    return http.get(cataloghUrl.getModels(catalogid));
}

function getCars(catalogid, modelid, params) {
    return http.get(cataloghUrl.getCars(catalogid, modelid, params));
}

function getCarbyVin(vin) {
    return http.get(cataloghUrl.getCarByVIN(vin));
}

function getFilters(catalogid, modelid, params) {
    return http.get(cataloghUrl.getFilters(catalogid, modelid, params));
}

function getGroups(catalogId, carId, groupId, criterias) {
    return http.get(cataloghUrl.getGroups(catalogId, carId, groupId, criterias));
}

function getPart(catalogId, carId, groupId, criterias) {
    return http.get(cataloghUrl.getPart(catalogId, carId, groupId, criterias));
}

export default {
    getCatalogs,
    getModels,
    getCars,
    getCarbyVin,
    getFilters,
    getGroups,
    getPart
};
