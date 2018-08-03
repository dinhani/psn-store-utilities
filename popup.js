// =============================================================================
// INIT PAGE
// =============================================================================
chrome.storage.local.get(["hideGames"], function (result) {
    if (result.hideGames !== undefined) {
        hideGames.checked = result.hideGames;
    }
});

// =============================================================================
// CHECKBOX EVENTS
// =============================================================================
hideGames.onclick = function (event) {
    // save option
    let hideGamesChecked = event.target.checked;
    chrome.storage.local.set({ hideGames: hideGamesChecked }, function () {
        chrome.runtime.sendMessage("toggleGames");
    });
}
