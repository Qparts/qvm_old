import http from "./httpService";
import links from "../constants/links";
import axios from "axios";

const uploadUrl = links.upload;


function updateCompanyLogo(data) {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return http.post(uploadUrl.postCompanyLogo, data, config);
}


function uploadBanckReceipt(data) {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return http.post(uploadUrl.postBankReceipt, data, config);
}


export default {
    updateCompanyLogo,
    uploadBanckReceipt
};