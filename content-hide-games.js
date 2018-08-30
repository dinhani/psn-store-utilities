// =============================================================================
// RUNNER FUNCTION
// =============================================================================
function runToggleGames() {
    // perform action of hiding or showing owned games
    chrome.storage.local.get(["hideOwnedGames"], function (result) {
        let shouldHideOwnedGames = result.hideOwnedGames == true;
        toggleGames(shouldHideOwnedGames);
    });
}

// =============================================================================
// TASK FUNCTIONS
// =============================================================================
function toggleGames(shouldHideOwnedGames) {
    document
        .querySelectorAll(".grid-cell--game .grid-cell__ineligible-reason")
        .forEach(element => {
            // original element is game div
            if (isGameDiv(element)) {
                toggleGameDiv(element, shouldHideOwnedGames)
                return;
            }

            // needs to find parent game div
            element = element.parentElement;
            while (element != null) {
                if (isGameDiv(element)) {
                    toggleGameDiv(element, shouldHideOwnedGames);
                    break;
                } else {
                    element = element.parentElement;
                }
            }
        });
}

function isGameDiv(element) {
    return element.className.indexOf("grid-cell--game") != -1;
}

function toggleGameDiv(element, hideGame) {
    let wrapper = element.parentElement.parentElement.parentElement;
    wrapper.style.display = hideGame ? "none" : "block";
}

// =============================================================================
// EXECUTION
// =============================================================================
setInterval(runToggleGames, 500);
