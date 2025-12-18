let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `X, az MTK (b) és Y, az Újpest játékosa a labdarúgó Fizz Liga 17. fordulójában játszott MTK Budapest - Újpest FC mérkőzésen az Új Hidegkuti Nándor Stadionban  2025. december 13-án.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
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

function formatTeamToText(teamObj) {
    return Object.entries(teamObj)
        .map(([szam, nev]) => `${szam} - ${nev}`)
        .join('\n')
}

teamH.value = formatTeamToText(csapatok.home)
teamG.value = formatTeamToText(csapatok.guest)

function getTeamFromTextarea(textarea) {
    const lines = textarea.value.split('\n')
    const teamObj = {}
    lines.forEach(line => {
        const match = line.match(/^\s*(\d+)[ \-\t\.]*(.*)/)
        if (match) {
            const number = match[1]
            const name = match[2].trim()
            if (name) teamObj[number] = name
        }
    })
    return teamObj
}

inputText.addEventListener('input', () => {
    let text = inputText.value
    const currentHome = getTeamFromTextarea(teamH)
    const currentGuest = getTeamFromTextarea(teamG)

    let newText = text.replace(/(\d{1,2})([hg])/g, (match, mezszam, csapat) => {
        const aktualisCsapat = (csapat === 'h') ? currentHome : currentGuest
        return aktualisCsapat[mezszam] || match
    })

    finalText.value = newText
})

teamH.addEventListener('input', () => inputText.dispatchEvent(new Event('input')))
teamG.addEventListener('input', () => inputText.dispatchEvent(new Event('input')))

copyBtn.addEventListener('click', () => {

    navigator.clipboard.writeText(finalText.value).then(() => {
        let originalText = copyBtn.innerText
        copyBtn.innerText = 'Másolva!'

        setTimeout(() => {
            copyBtn.innerText = originalText
        }, 1100)
    })
})

