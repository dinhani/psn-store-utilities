// =============================================================================
// INIT PAGE
// =============================================================================
chrome.storage.local.get(["hideOwnedGames"], function (result) {
    if (result.hideOwnedGames !== undefined) {
        hideOwnedGames.checked = result.hideOwnedGames;
    }
});

// =============================================================================
// BUTTONS EVENTS
// =============================================================================
exportGamesPrices.onclick = function (event) {
    chrome.storage.local.set({ exportGamesPrices: true });
}

// =============================================================================
// CHECKBOX EVENTS
// =============================================================================
hideOwnedGames.onclick = function (event) {
    // save option
    let hideOwnedGamesChecked = event.target.checked;
    chrome.storage.local.set({ hideOwnedGames: hideOwnedGamesChecked });
}
