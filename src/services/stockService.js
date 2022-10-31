import http from "./httpService";
import links from "../constants/links";

const stockUrl = links.stock;

function getBrands() {
  return http.get(stockUrl.getBrands);
}

function getBrandClasses() {
  return http.get(stockUrl.getBrandClasses);
}

function searchBrand(query) {
  return http.post(stockUrl.postSearchBrand, { query });
}

function searchProduct(query) {
  return http.post(stockUrl.postSearchProduct, { query });
}

function findExistProduct(productQuery) {
  return http.post(stockUrl.postFindProduct, productQuery);
}

function findProduct(brandAndNumber) {
  return http.post(stockUrl.findProduct, brandAndNumber);
}

function searchQuotation(query) {
  return http.post(stockUrl.postSearchQuotation, { query });
}

function searchSales(query) {
  return http.post(stockUrl.postSearchSales, { query });
}

function searchPurchase(query) {
  return http.post(stockUrl.postSearchPurchase, { query });
}

function createBrand(brand) {
  return http.post(stockUrl.postBrand, brand);
}

function createPolicy(policy) {
  return http.post(stockUrl.postPolicy, policy);
}

function getPolicies() {
  return http.get(stockUrl.getPolicies);
}

function postCreditPayment(type, payment) {
  return http.post(stockUrl.postCreditPayment(type), payment);
}

function createProduct(product) {
  return http.post(stockUrl.postProduct, product);
}

function createPurchase(purchase) {
  return http.post(stockUrl.postPurchase, purchase);
}

function createSales(sales) {
  return http.post(stockUrl.postSales, sales);
}

function createSalesReturn(salesReturn) {
  return http.post(stockUrl.postSalesReturn, salesReturn);
}

function createPurchaseReturn(purchaseReturn) {
  return http.post(stockUrl.postPurchaseReturn, purchaseReturn);
}

function createQuotation(quotation) {
  return http.post(stockUrl.postQuotation, quotation);
}

function getSales(id) {
  return http.get(stockUrl.getSales(id));
}

function getQuotation(id) {
  return http.get(stockUrl.getQuotation(id));
}

function getSalesReturn(id) {
  return http.get(stockUrl.getSalesReturn(id));
}

function getPurchase(id) {
  return http.get(stockUrl.getPurchase(id));
}

function getDailySales(from, to) {
  return http.get(stockUrl.getDailySales(from, to));
}

function getMonthlySales(year, month, length) {
  return http.get(stockUrl.getMonthlySales(year, month, length));
}

function getStockValue() {
  return http.get(stockUrl.getStockValue);
}

function getBranchesSales(day) {
  return http.get(stockUrl.getBranchesSales(day));
}

function getBranchesSalesSummarySales() {
  return http.get(stockUrl.getBranchesSalesSummary);
}

function getSalesReport(year, month) {
  return http.get(stockUrl.getSalesReport(year, month));
}

function getPurchaseReport(year, month) {
  return http.get(stockUrl.getPurchaseReport(year, month));
}

function getMtdSales() {
  return http.get(stockUrl.getMtdSales);
}

function getYtdSales() {
  return http.get(stockUrl.getYtdSales);
}

function getSalesCreditBalance() {
  return http.get(stockUrl.getSalesCreditBalance);
}

function getPurchaseCreditBalance() {
  return http.get(stockUrl.getPurchaseCreditBalance);
}

function getPendingItems() {
  return http.get(stockUrl.getPendingItems);
}

function updatePendingItems(data) {
  return http.put(stockUrl.putPendingItems, data);
}

function getStockFile() {
  return http.get(stockUrl.getStockFile);
}

export default {
  getBrands,
  getBrandClasses,
  createBrand,
  createPolicy,
  getPolicies,
  searchBrand,
  createProduct,
  searchProduct,
  findProduct,
  findExistProduct,
  createPurchase,
  createSales,
  createSalesReturn,
  createPurchaseReturn,
  createQuotation,
  searchQuotation,
  searchSales,
  searchPurchase,
  getSales,
  getPurchase,
  getQuotation,
  getSalesReturn,
  getDailySales,
  getMonthlySales,
  getStockValue,
  getBranchesSales,
  getSalesReport,
  getPurchaseReport,
  getMtdSales,
  getYtdSales,
  getBranchesSalesSummarySales,
  getSalesCreditBalance,
  getPurchaseCreditBalance,
  postCreditPayment,
  getPendingItems,
  updatePendingItems,
  getStockFile
};
