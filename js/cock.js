/* clock.js */

$(document).ready(function() {
    getTheMusic();
    runTheParty();

    $("#music").fadeTo(5000, 0);

    $("#music").hover(function() {
        $(this).stop().fadeTo(1000, 1);
    }, function() {
        $(this).fadeTo(5000, 0);
    });

    $("#music").bind("ended", function() {
        getTheMusic();
        this.play();
    });
});

function getTheMusic(i) {
    var musicSrc = ["http://upload.wikimedia.org/wikipedia/commons/9/90/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg", // Satie - Gymnopedies
                    "http://upload.wikimedia.org/wikipedia/commons/c/c8/Gnossienne_2_%28Satie%29.ogg",
                    "http://upload.wikimedia.org/wikipedia/commons/1/10/Gnossienne_3_%28Satie%29.ogg",
                    "http://upload.wikimedia.org/wikipedia/commons/7/7e/An_der_sch%C3%B6nen_blauen_Donau.ogg", // Strauss - Blue Danube
                    "http://upload.wikimedia.org/wikipedia/commons/e/eb/Prelude_1%2C_Equal_temperament.ogg", // Bach - Prelude No. 1 (Well-Tempered Clavier)
                    "http://upload.wikimedia.org/wikipedia/commons/c/ce/Robert_Schumann_-_scenes_from_childhood%2C_op._15_-_i._of_foreign_lands_and_peoples.ogg" // Schumann - Of Foreign Lands And People
                    ];
    var i = Math.round(Math.random() * musicSrc.length);
    var player = document.getElementById('music');
    player.src = musicSrc[i];
}

function timeToHsv(date) {
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var h = (minutes / 60 * 360);
    var s = (seconds / 60 * 100) + "%";
    var v = ((100 - Math.abs(12 - (hours % 23)) / 12.0 * 70) - 20) + "%";

    return [h, s, v];
}

function runTheParty() {
    setInterval(function() {
        var date = new Date();
        theParty(date);
        setClock(date);
    }, 1000);
}

function theParty(date) {
    var hsv = timeToHsv(date);
    $("body").css("background-color", "hsl(" + hsv[0] + "," + hsv[1] + "," + hsv[2] + ")");
}

function setClock(date) {
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    $("#hours").text(pad(hours, 2));
    $("#minutes").text(pad(minutes, 2));
    // $("#seconds").text(pad(seconds));
}

function pad(number, length) {
    if ((number+"").length >= length)
        return number;
    else
        return pad("0" + number, length);
}