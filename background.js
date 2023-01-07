// background.js

// Replace YOUR_APP_ID with your eBay API App ID
const EBAY_APP_ID = 'YOUR_APP_ID';

// Send a request to the eBay Finding API to search for sold listings
async function searchSoldListings(keywords) {
  const params = new URLSearchParams();
  params.set('OPERATION-NAME', 'findCompletedItems');
  params.set('SERVICE-VERSION', '1.13.0');
  params.set('SECURITY-APPNAME', EBAY_APP_ID);
  params.set('RESPONSE-DATA-FORMAT', 'JSON');
  params.set('keywords', keywords);
  params.set('sortOrder', 'PricePlusShippingLowest');
  params.set('itemFilter(0).name', 'SoldItemsOnly');
  params.set('itemFilter(0).value', 'true');

  const response = await fetch(`https://svcs.ebay.com/services/search/FindingService/v1?${params}`);
  const data = await response.json();
  return data;
}

// Send a request to the eBay Trading API to get the watch count for an item
async function getWatchCount(itemId) {
  const params = new URLSearchParams();
  params.set('callname', 'GetItem');
  params.set('responseencoding', 'JSON');
  params.set('appid', EBAY_APP_ID);
  params.set('siteid', '0');
  params.set('version', '967');
  params.set('ItemID', itemId);
  params.set('IncludeWatchCount', 'true');

  const response = await fetch(`https://api.ebay.com/ws/api.dll?${params}`);
  const data = await response.text();
  const xml = new DOMParser().parseFromString(data, 'text/xml');
  const watchCount = xml.querySelector('WatchCount').textContent;
  return watchCount;
}

// Scrape the MSRP value from a website
async function scrapeMSRP(url) {
  const response = await fetch(url);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // Extract the MSRP value from the webpage using a CSS selector
  const msrp = doc.querySelector('.msrp').textContent;
  return msrp;
}
