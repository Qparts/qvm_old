import http from "./httpService";
import links from "../constants/links";

const customerUrl = links.customer;

function getAllCustomers() {
  return http.get(customerUrl.getCustomers);
}

function getAllSuppliers() {
  return http.get(customerUrl.getSuppliers);
}

function searchCustomers(query) {
  return http.post(customerUrl.postSearchCustomer, { query });
}
function createCustomer(customer) {
  return http.post(customerUrl.postCustomer, customer);
}
function searchSupplier(query) {
  return http.post(customerUrl.postSearchSupplier, { query });
}
function createSupplier(supplier) {
  return http.post(customerUrl.postSupplier, supplier);
}

export default {
  searchCustomers,
  createCustomer,
  searchSupplier,
  createSupplier,
  getAllSuppliers,
  getAllCustomers,
};
