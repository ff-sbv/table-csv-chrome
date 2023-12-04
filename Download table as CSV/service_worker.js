async function getTabId() {
	let queryOptions = { active: true, currentWindow: true };
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs[0].id;
}

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({ id: "DLCSV", title: "Download table as CSV", type: "normal", contexts: ["page"]});
});
chrome.contextMenus.onClicked.addListener(async (item, tab) => {
		"use strict";
		if(item.menuItemId == "DLCSV"){
			chrome.scripting.executeScript({
				target: { tabId: (await getTabId()) },
				files : [ "downloadcsv.js" ],
			})
		}
});
