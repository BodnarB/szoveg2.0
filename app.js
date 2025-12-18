let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')

inputText.addEventListener('input', () => {
    console.log(inputText.value)
    finalText.value=inputText.value
})




let csapatok = {
    home: {
        2: "Csollák Márkó Ámor",
        6: "Molnár Bálint",
        8: "Szabó Bence",
        12: "Stipsicz Bence",
        13: "Nagy Krisztián",
        16: "Hári János",
        17: "Kiss Roland",
        18: "Ravasz Csanád",
        23: "Hadobás Zétény Tibor",
        26: "Galajda Zsombor",
        28: "Bartalis István",
        33: "Horváth Milán",
        34: "Terbócs István",
        36: "Erdély Csanád",
        41: "Dobos Mihály Bendegúz",
        52: "Szabó Rácz Maxim ",
        55: "Ortenszky Tamás",
        61: "Vincze Péter",
        67: "Horváth Donát Dominik",
        68: "Farkas László",
        71: "Mattyasovszky Gergely"
    },
    guest: {
        4: "Mateusz Zielinski",
        6: "Bartosz Florczak",
        9: "Olaf Bizacki",
        11: "Jakub Slusarczyk",
        12: "Karol Bilas",
        14: "Dominik Pas",
        15: "Damian Tyczynski",
        17: "Kamil Gorny",
        20: "Szymon Kielbicki",
        21: "Dominik Jarosz",
        24: "Oskar Jaskiewicz",
        26: "Jakub Lewandowski",
        28: "Mateusz Michalski",
        51: "Jakub Wanacki",
        59: "Michal Naróg",
        71: "Sebastian Brynkus",
        86: "Lukasz Krzemien",
        88: "Alan Lyszczarczyk",
        95: "Patryk Wronka",
        98: "Patryk Krezolek"
    }
}