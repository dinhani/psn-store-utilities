// =============================================================================
// FUNCTIONS
// =============================================================================
function toggleGames() {
    chrome.storage.local.get(["hideGames"], function (result) {
        // read if should hide or not
        let hideGames = result.hideGames == true;

        document
            .querySelectorAll(".grid-cell--game .grid-cell__ineligible-reason")
            .forEach(element => {
                // original element is game div
                if (isGameDiv(element)) {
                    toggleGameDiv(element, hideGames)
                    return;
                }

                // needs to find parent game div
                element = element.parentElement;
                while (element != null) {
                    if (isGameDiv(element)) {
                        toggleGameDiv(element, hideGames);
                        break;
                    } else {
                        element = element.parentElement;
                    }
                }
            });
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
setInterval(toggleGames, 1000);
