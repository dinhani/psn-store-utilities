// =============================================================================
// INSTALLATION
// =============================================================================
chrome.runtime.onInstalled.addListener(function (details) {
    // =========================================================================
    // RULES FOR WHEN THE UI POPUP WILL BE DISPLAYED
    // =========================================================================
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostContains: 'store.playstation.com' }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
