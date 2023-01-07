// content.js

// Extract the item ID from the webpage
const itemId = document.querySelector('#itemId').value;

// Retrieve the data from the background script
chrome.runtime.sendMessage({ type: 'getData', itemId }, response => {
  const { price, watchCount, msrp } = response;
  // Insert the data into the webpage
  const container = document.querySelector('.item-info');
  const priceSpan = document.createElement('span');
  priceSpan.innerText = `Price: $${price}`;
  container.appendChild(priceSpan);
  const watchCountSpan = document.createElement('span');
  watchCountSpan.innerText = `Watch count: ${watchCount}`;
  container.appendChild(watchCountSpan);
  const msrpSpan = document.createElement('span');
  msrpSpan.innerText = `MSRP: $${msrp}`;
  container.appendChild(msrpSpan);
});
