var filme = [];

var suchfeld = document.getElementById("suchfeld");
var suchenButton = document.getElementById("suchenButton");
var beispieleButton = document.getElementById("beispieleButton");
var loeschenButton = document.getElementById("loeschenButton");
var filmListe = document.getElementById("filmListe");
var meldung = document.getElementById("meldung");

suchenButton.addEventListener("click", sucheFilm);
beispieleButton.addEventListener("click", ladeBeispiele);
loeschenButton.addEventListener("click", loescheFilme);

function sucheFilm() {
    var suchtext = suchfeld.value;

    if (suchtext == "") {
        zeigeMeldung("Bitte gib einen Titel ein.");
    } else {
        zeigeMeldung("Daten werden geladen...");

        fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(suchtext))
            .then(function(antwort) {
                return antwort.json();
            })
            .then(function(daten) {
                filme = daten;
                zeigeFilme();
            })
            .catch(function() {
                zeigeMeldung("Die API konnte nicht geladen werden.");
            });
    }
}

function ladeBeispiele() {
    zeigeMeldung("Beispiele werden geladen...");

    fetch("https://api.tvmaze.com/search/shows?q=batman")
        .then(function(antwort) {
            return antwort.json();
        })
        .then(function(daten) {
            filme = daten;
            zeigeFilme();
        })
        .catch(function() {
            zeigeMeldung("Die Beispiele konnten nicht geladen werden.");
        });
}

function zeigeFilme() {
    leereListe();

    if (filme.length == 0) {
        zeigeMeldung("Keine Ergebnisse gefunden.");
    } else {
        for (var i = 0; i < filme.length; i++) {
            var eintrag = filme[i];
            var show = eintrag.show;
            var karte = document.createElement("article");
            var bild = document.createElement("img");
            var titel = document.createElement("h3");
            var sprache = document.createElement("p");
            var genre = document.createElement("p");
            var bewertung = document.createElement("p");

            karte.className = "movie-card";

            if (show.image) {
                bild.src = show.image.medium;
            } else {
                bild.src = "https://via.placeholder.com/210x295?text=Kein+Bild";
            }

            bild.alt = "Bild von " + show.name;
            titel.textContent = show.name;
            sprache.textContent = "Sprache: " + show.language;

            if (show.genres.length > 0) {
                genre.textContent = "Genre: " + show.genres[0];
            } else {
                genre.textContent = "Genre: Keine Angabe";
            }

            if (show.rating.average) {
                bewertung.textContent = "Bewertung: " + show.rating.average;
            } else {
                bewertung.textContent = "Bewertung: Keine Angabe";
            }

            karte.appendChild(bild);
            karte.appendChild(titel);
            karte.appendChild(sprache);
            karte.appendChild(genre);
            karte.appendChild(bewertung);
            filmListe.appendChild(karte);
        }

        zeigeMeldung(filme.length + " Ergebnis(se) gefunden.");
    }
}

function leereListe() {
    while (filmListe.firstChild) {
        filmListe.removeChild(filmListe.firstChild);
    }
}

function loescheFilme() {
    filme = [];
    leereListe();
    zeigeMeldung("Alle Ergebnisse wurden geloescht.");
}

function zeigeMeldung(text) {
    meldung.textContent = text;
}
