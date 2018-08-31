// =============================================================================
// RUNNER FUNCTION
// =============================================================================
function runExportGamesPrices() {
    // perform action of exporting games if necessary
    chrome.storage.local.get(["exportGamesPrices"], function (result) {
        // check if should export
        let shouldExportGamesPrices = result.exportGamesPrices == true;
        if (shouldExportGamesPrices) {
            chrome.storage.local.set({ exportGamesPrices: false });
            exportGamesPrices([]);
        } else {
            return;
        }
    });
}

// =============================================================================
// TASK FUNCTIONS
// =============================================================================
function exportGamesPrices(games) {
    // get prices from current page
    jQuery(".grid-cell--game").each(function (index, element) {
        game = {};

        game.name = jQuery(element).find(".grid-cell__title").text().trim();
        game.image = jQuery(element).find(".product-image__img--main img").attr("src");
        game.price = jQuery(element).find("h3").text().trim();
        game.platform = jQuery(element).find(".grid-cell__left-detail--detail-1").text().trim();
        game.type = jQuery(element).find(".grid-cell__left-detail--detail-2").text().trim();

        // only add game if has a price
        // if does not have a price, it is a game that I already own
        if (game.price === "Gratuito") {
            gamePrice = "0";
        }
        if (game.price) {
            games.push(game);
        }
    })

    // check if reached last page
    var lastPage = jQuery(".paginator-control__end.paginator-control__arrow-navigation.paginator-control__arrow-navigation--disabled").length;
    if (lastPage) {
        // if last page, save collected games
        writeGamesPricesToCsv(games);
    } else {
        // if not last page, go to next page and collect more games
        jQuery(".paginator-control__next")[0].click();
        setTimeout(function () { exportGamesPrices(games) }, 1000);
    }
}

function writeGamesPricesToCsv(games) {
    csv = '"Name";"Price";"Platform";"Type";"Image"<br>';
    for (var gameIndex = 0; gameIndex < games.length; gameIndex++) {
        var game = games[gameIndex];
        csv += '"' + game.name + '"'
            + ";"
            + game.price.replace("R$", "").replace(",", ".")
            + ";"
            + '"' + game.platform + '"'
            + ";"
            + '"' + game.type + '"'
            + ";"
            + '"' + game.image + '"'
            + "<br>";
    }
    document.write(csv);
}

// =============================================================================
// EXECUTION
// =============================================================================
setInterval(runExportGamesPrices, 500);
