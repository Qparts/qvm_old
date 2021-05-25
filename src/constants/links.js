const BASE_URL = process.env.REACT_APP_BASE_URL; //test serveer
const SUBSCRIBER_SERVICE = `${BASE_URL}/subscriber`;
const CUSTOMER_SERVICE = `${BASE_URL}/customer`;
const STOCK_SERVICE = `${BASE_URL}/stock`;
const LOCATION_SERVICE = `${BASE_URL}/location`;

const UPLOAD_SERVICE = `${BASE_URL}/upload`;
const CATALOG_SERVICE = `${BASE_URL}/catalog`;
const PRODUCT_SERVICE = `${BASE_URL}/product`;

const subscriber = {
  postLogin: `${SUBSCRIBER_SERVICE}/login`,
  postTokenRefresh: `${SUBSCRIBER_SERVICE}/refresh-token`,
  signup: `${SUBSCRIBER_SERVICE}/signup`,
  signupVerify: `${SUBSCRIBER_SERVICE}/signup-verify`,
  addBranch: `${SUBSCRIBER_SERVICE}/branch`,
  putDefaultPolicy: `${SUBSCRIBER_SERVICE}/default-policy`,
  putDefaultCustomer: `${SUBSCRIBER_SERVICE}/default-customer`,
  putDefaultBranch: `${SUBSCRIBER_SERVICE}/default-branch`,
  putSettingVariables: `${SUBSCRIBER_SERVICE}/setting-variables`,
  postResetPassword: `${SUBSCRIBER_SERVICE}/reset-password`,
  putResetPassword: `${SUBSCRIBER_SERVICE}/reset-password`,
  getResetPassword: (token) => `${SUBSCRIBER_SERVICE}/reset-password/${token}`,
  putInvoiceTemplate: `${SUBSCRIBER_SERVICE}/invoice-template`,
  getCompanies: `${SUBSCRIBER_SERVICE}/companies/`,
};

const upload = {
  postCompanyLogo: `${UPLOAD_SERVICE}/logo`,
  getCompanyLogo: (fileName) => `${UPLOAD_SERVICE}/logo/${fileName}`
}

const setting = {
  addBranch: `${SUBSCRIBER_SERVICE}/branch`,
  addUser: `${SUBSCRIBER_SERVICE}/user`,
  verifyUser: `${SUBSCRIBER_SERVICE}/verify-user`,
  getUsers: `${SUBSCRIBER_SERVICE}/users`,
  putDefaultPolicy: `${SUBSCRIBER_SERVICE}/default-policy`,
  putDefaultCustomer: `${SUBSCRIBER_SERVICE}/default-customer`,
  putDefaultBranch: `${SUBSCRIBER_SERVICE}/default-branch`,
  putSettingVariables: `${SUBSCRIBER_SERVICE}/setting-variables`,
};

const customer = {
  postSearchCustomer: `${CUSTOMER_SERVICE}/search-customer`,
  postSearchSupplier: `${CUSTOMER_SERVICE}/search-supplier`,
  postCustomer: `${CUSTOMER_SERVICE}/customer`,
  postSupplier: `${CUSTOMER_SERVICE}/supplier`,
  getCustomers: `${CUSTOMER_SERVICE}/customers`,
  getSuppliers: `${CUSTOMER_SERVICE}/suppliers`,
};

const location = {
  getCountries: `${LOCATION_SERVICE}/countries`,
  postSearchLocation : `${LOCATION_SERVICE}/search-locations`
};

const stock = {
  getBrands: `${STOCK_SERVICE}/brands`,
  getBrandClasses: `${STOCK_SERVICE}/brand-classes`,
  postBrand: `${STOCK_SERVICE}/brand`,
  postPolicy: `${STOCK_SERVICE}/price-policy`,
  getPolicies: `${STOCK_SERVICE}/price-policies`,
  postProduct: `${STOCK_SERVICE}/product`,
  postSearchBrand: `${STOCK_SERVICE}/search-brand`,
  postSearchProduct: `${STOCK_SERVICE}/search-product`,
  postFindProduct: `${STOCK_SERVICE}/find-product`,
  postPurchase: `${STOCK_SERVICE}/purchase`,
  postPurchaseReturn: `${STOCK_SERVICE}/purchase-return`,
  postSearchPurchase: `${STOCK_SERVICE}/search-purchase`,
  postSales: `${STOCK_SERVICE}/sales`,
  postSalesReturn: `${STOCK_SERVICE}/sales-return`,
  postSearchSales: `${STOCK_SERVICE}/search-sales`,
  postQuotation: `${STOCK_SERVICE}/quotation`,
  postSearchQuotation: `${STOCK_SERVICE}/search-quotation`,
  getSales: (id) => `${STOCK_SERVICE}/sales/${id}`,
  getQuotation: (id) => `${STOCK_SERVICE}/quotation/${id}`,
  getSalesReturn: (id) => `${STOCK_SERVICE}/sales-return/${id}`,
  getPurchase: (id) => `${STOCK_SERVICE}/purchase/${id}`,
  getPurchaseReturn: (id) => `${STOCK_SERVICE}/purchase-return/${id}`,
  getDailySales: (from, to) =>
    `${STOCK_SERVICE}/daily-sales/from/${from}/to/${to}`,
  getMonthlySales: (y, m, l) =>
    `${STOCK_SERVICE}/monthly-sales/year/${y}/month/${m}/length/${l}`,
  getStockValue: `${STOCK_SERVICE}/stock-value`,
  getBranchesSales: (d) => `${STOCK_SERVICE}/branches-sales/${d}`,
  getBranchesSalesSummary: `${STOCK_SERVICE}/branches-sales-summary`,
  getMtdSales: `${STOCK_SERVICE}/sales-summary/mtd`,
  getYtdSales: `${STOCK_SERVICE}/sales-summary/ytd`,
  getSalesReport: (y, m) => `${STOCK_SERVICE}/sales-report/${y}/${m}`,
  getPurchaseReport: (y, m) => `${STOCK_SERVICE}/purchase-report/${y}/${m}`,
  getPurchaseCreditBalance: `${STOCK_SERVICE}/purchase-credit-balance`,
  getSalesCreditBalance: `${STOCK_SERVICE}/sales-credit-balance`,
  postCreditPayment: (type) => `${STOCK_SERVICE}/credit-payment/${type}`,
  getPendingItems: `${STOCK_SERVICE}/pending-items`,
  putPendingItems: `${STOCK_SERVICE}/pending-item`,
};

const catalog = {
  getCatalogs: `${CATALOG_SERVICE}/catalogs`,
  getModels: (catalogid) => `${CATALOG_SERVICE}/models?catalogid=${catalogid}`,
  getCars: (catalogId, modelId, params) => `${CATALOG_SERVICE}/cars?catalogid=${catalogId}&modelid=${modelId}&${params != null ? 'params=' + params : ''} `,
  getCarByVIN: (vin) => `${CATALOG_SERVICE}/cars/vin?query=${vin}`,
  getFilters: (catalogId, modelId, params) => `${CATALOG_SERVICE}/model-filters?catalogid=${catalogId}&modelid=${modelId}&${params != null ? 'params=' + params : ''} `,
  getGroups: (catalogId, carId, groupId, criterias) => `${CATALOG_SERVICE}/groups?catalogid=${catalogId}&carid=${carId}&${groupId ? 'groupid=' + groupId : ''}&${criterias != null ? 'criterias=' + criterias : ''} `,
  getPart: (catalogId, carId, groupId, criterias) => `${CATALOG_SERVICE}/parts?catalogid=${catalogId}&carid=${carId}&${groupId ? 'groupid=' + groupId : ''}&${criterias != null ? 'criterias=' + criterias : ''} `,
};

const product = {
  productSearch: `${PRODUCT_SERVICE}/search-company-product`,
  productInfoSearch: `${PRODUCT_SERVICE}/search-product`,
}


export default {
  subscriber,
  customer,
  location,
  stock,
  setting,
  upload,
  catalog,
  product
};
