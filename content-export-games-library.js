// =============================================================================
// RUNNER FUNCTION
// =============================================================================
function runExportGamesLibrary() {
    // perform action of exporting games if necessary
    chrome.storage.local.get(["exportGamesLibrary"], function (result) {
        // check if should export
        let shouldExportGamesLibrary = result.exportGamesLibrary == true;
        if (shouldExportGamesLibrary) {
            chrome.storage.local.set({ exportGamesLibrary: false });
            exportGamesLibrary([]);
        } else {
            return;
        }
    });
}

// =============================================================================
// TASK FUNCTIONS
// =============================================================================
function exportGamesLibrary(games) {
    // get games from current page
    jQuery(".download-list-item").each(function (index, element) {
        try {
            game = {};

            // basic info
            game.id = jQuery(element).find("a").attr("href").split("/")[3];
            game.name = jQuery(element).find(".download-list-item__title").text().trim();
            game.image = jQuery(element).find(".product-image__img--main img").attr("src");

            // platform
            game.platform = jQuery(element).find(".download-list-item__playable-on-info").text();
            if (game.platform) {
                game.platform = /(PS3|PS4|PS Vita)/.exec(game.platform)[0];
            }

            // metadata
            game.metadata = jQuery(element).find(".download-list-item__metadata").text().trim();
            game.type = game.metadata.split("|")[0].trim();
            game.size = game.metadata.split("|")[1].trim();
            game.buy = game.metadata.split("|")[2].trim();

            // size
            game.sizeInMB = game.size;
            game.sizeInMB = game.sizeInMB.replace("KB", " / 1024");
            game.sizeInMB = game.sizeInMB.replace("MB", " * 1");
            game.sizeInMB = game.sizeInMB.replace("GB", " * 1024");
            try {
                game.sizeInMB = eval(game.sizeInMB);
            } catch (e) {
                game.sizeInMB = 0;
            }

            games.push(game);
        } catch (error) {
            console.error(error);
        }
    });

    // check if reached last page
    var lastPage = jQuery(".paginator-control__end.paginator-control__arrow-navigation.paginator-control__arrow-navigation--disabled").length;
    if (lastPage) {
        // if last page, save collected games
        writeGamesLibraryToCsv(games);
    } else {
        // if not last page, go to next page and collect more games
        jQuery(".paginator-control__next")[0].click();
        setTimeout(function () { exportGamesLibrary(games) }, 200);
    }
}

function writeGamesLibraryToCsv(games) {
    csv = '"ID";"Name";"Size";"SizeInMB";"Type";"BuyDate";"Platform";"Image"<br>';
    for (var gameIndex = 0; gameIndex < games.length; gameIndex++) {
        var game = games[gameIndex];
        csv +=
            '"' + game.id + '"'
            + ";"
            + '"' + game.name + '"'
            + ";"
            + '"' + game.size + '"'
            + ";"
            + game.sizeInMB
            + ";"
            + '"' + game.type + '"'
            + ";"
            + '"' + game.buy + '"'
            + ";"
            + '"' + game.platform + '"'
            + ";"
            + '"' + game.image + '"'
            + "<br>";
    }
    document.write(csv);
}

// =============================================================================
// EXECUTION
// =============================================================================
setInterval(runExportGamesLibrary, 500);
