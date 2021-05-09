import { useEffect, useRef } from "react";

function toDate(mil) {
  const d = new Date(mil);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  // const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
}

function toDayAndMonth(mil) {
  const d = new Date(mil);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}`;
}

function toTime(mil) {
  const d = new Date(mil);
  const h = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(d);
  const m = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(d);
  return `${h}:${m}`;
}

function getAveragedCost(item) {
  try {
    return item.liveStock[0].averageCost;
  } catch (ex) {
    return 0;
  }
}

function totalSalesInvoice(invoice) {
  const subtotal = calculateSalesSubtotal(invoice.items);
  const tax = subtotal * invoice.taxRate;
  return subtotal + tax;
}

function calculateSalesSubtotal(items) {
  let total = 0.0;
  items.map((x) => (total += x.unitPrice * x.quantity));
  return total;
}

function ccyFormat(num) {
  const value = parseFloat(num).toFixed(2);
  return value;
}

function currencyRoundedFormat(num) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  let str = formatter.format(num);
  try {
    str = str.replace(/[a-z]{3}/i, "").trim();
  } catch (ex) {}
  return str;
}

function getBranch(id, branches) {
  return branches.find((x) => x.id === id);
}

function taxFormat(taxRate) {
  return `${(taxRate * 100).toFixed(0)} %`;
}

function getPaymentMethod(method) {
  switch (method) {
    case "C":
      return "Cash";
    case "S":
      return "Span";
    case "Q":
      return "Cheque";
    case "T":
      return "Bank Transfer";
    case "O":
      return "Online";
    default:
      return "-";
  }
}

function getPaymentMethodAr(method) {
  switch (method) {
    case "C":
      return "عملات نقدية";
    case "S":
      return "دفع بالبطاقة";
    case "Q":
      return "شيك بنكي";
    case "T":
      return "تحويل بنكي";
    case "O":
      return "Online";
    default:
      return "-";
  }
}

function getTransactionType(trans) {
  return trans === "T" ? "Credit" : "Cash";
}

function getTransactionTypeAr(trans) {
  return trans === "T" ? "دفع آجل" : "دفع نقدي";
}

function drillDownCity(countries, branch) {
  try {
    const country = countries.find((e) => e.id === branch.countryId);
    const region = country.regions.find((e) => e.id === branch.regionId);
    const city = region.cities.find((e) => e.id === branch.cityId);
    return city;
  } catch (er) {
    return branch.cityId;
  }
}

function getLocation(
  countries,
  branch = null,
  countryId = 0,
  regionId = 0,
  cityId = 0
) {
  try {
    if (branch == null && countryId != 0 && regionId != 0 && cityId != 0) {
      const country = countries.find((e) => e.id === countryId);
      const region = country.regions.find((e) => e.id === regionId);
      const city = region.cities.find((e) => e.id === cityId);
      return { country: country, region: region, city: city };
    } else {
      const country = countries.find((e) => e.id === branch.countryId);
      const region = country.regions.find((e) => e.id === branch.regionId);
      const city = region.cities.find((e) => e.id === branch.cityId);
      return { country: country, region: region, city: city };
    }
  } catch (er) {
    return null;
  }
}

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}

function reconstructPhone(countryId, phone, countries) {
  const countryCode = countries.find((x) => x.id === countryId).countryCode;
  let modifiedPhone =
    "" + parseInt(phone.replace("/D/g", "").replace(" ", ""), 10);
  console.log("modifiedPhone : " + modifiedPhone);
  return modifiedPhone.substring(0, countryCode.length) === countryCode
    ? modifiedPhone
    : countryCode + modifiedPhone;
}

export default {
  toDate,
  toDayAndMonth,
  toTime,
  totalSalesInvoice,
  ccyFormat,
  currencyRoundedFormat,
  getBranch,
  getPaymentMethod,
  getPaymentMethodAr,
  getTransactionType,
  getTransactionTypeAr,
  taxFormat,
  getAveragedCost,
  drillDownCity,
  useIsMounted,
  getLocation,
  reconstructPhone,
};
