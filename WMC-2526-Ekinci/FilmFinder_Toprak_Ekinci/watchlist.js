var watchlist = ["Dark", "Friends", "Batman"];

var titelInput = document.getElementById("titelInput");
var hinzufuegenButton = document.getElementById("hinzufuegenButton");
var ersetzenButton = document.getElementById("ersetzenButton");
var alleLoeschenButton = document.getElementById("alleLoeschenButton");
var watchlistElement = document.getElementById("watchlist");
var watchlistMeldung = document.getElementById("watchlistMeldung");

hinzufuegenButton.addEventListener("click", fuegeTitelHinzu);
ersetzenButton.addEventListener("click", ersetzeErstenTitel);
alleLoeschenButton.addEventListener("click", loescheAlleTitel);

zeigeWatchlist();

function zeigeWatchlist() {
    while (watchlistElement.firstChild) {
        watchlistElement.removeChild(watchlistElement.firstChild);
    }

    for (var i = 0; i < watchlist.length; i++) {
        var eintrag = document.createElement("li");
        var text = document.createElement("span");
        var button = document.createElement("button");

        text.textContent = watchlist[i];
        button.textContent = "Loeschen";
        button.className = "small-button";
        button.setAttribute("data-index", i);
        button.addEventListener("click", loescheEinTitel);

        eintrag.appendChild(text);
        eintrag.appendChild(button);
        watchlistElement.appendChild(eintrag);
    }

    watchlistMeldung.textContent = "Anzahl Titel: " + watchlist.length;
}

function fuegeTitelHinzu() {
    var neuerTitel = titelInput.value;

    if (neuerTitel == "") {
        watchlistMeldung.textContent = "Bitte einen Titel eintragen.";
    } else {
        watchlist.push(neuerTitel);
        titelInput.value = "";
        zeigeWatchlist();
    }
}

function loescheEinTitel() {
    var index = this.getAttribute("data-index");
    watchlist.splice(index, 1);
    zeigeWatchlist();
}

function loescheAlleTitel() {
    watchlist = [];
    zeigeWatchlist();
}

function ersetzeErstenTitel() {
    var neuerTitel = titelInput.value;

    if (watchlist.length == 0) {
        watchlistMeldung.textContent = "Es gibt keinen Titel zum Ersetzen.";
    } else if (neuerTitel == "") {
        watchlistMeldung.textContent = "Bitte zuerst einen neuen Titel eintragen.";
    } else {
        watchlist[0] = neuerTitel;

        var alterEintrag = watchlistElement.firstChild;
        var neuerEintrag = document.createElement("li");
        var text = document.createElement("span");
        var button = document.createElement("button");

        text.textContent = neuerTitel;
        button.textContent = "Loeschen";
        button.className = "small-button";
        button.setAttribute("data-index", 0);
        button.addEventListener("click", loescheEinTitel);

        neuerEintrag.appendChild(text);
        neuerEintrag.appendChild(button);
        watchlistElement.replaceChild(neuerEintrag, alterEintrag);

        titelInput.value = "";
        watchlistMeldung.textContent = "Der erste Titel wurde ersetzt.";
    }
}
