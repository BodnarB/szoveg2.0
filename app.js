let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és a spanyol Xg a belgrádi férfi vízilabda Európa-bajnokság középdöntőjének E csoportjában játszott Spanyolország - Magyarország mérkőzésén a Belgrade Arenában 2026. január 20-án.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Csoma Kristóf",
        2: "Angyal Dániel",
        3: "Manhercz Krisztián",
        4: "Nagy Ákos",
        5: "Vigvári Vince",
        6: "Nagy Ádám",
        7: "Fekete Gergő",
        8: "Tátrai Dávid",
        9: "Kovács Péter",
        10: "Vigvári Vendel",
        11: "Jansik Szilárd",
        12: "Batizi Benedek",
        13: "Vogel Soma",
        14: "Vismeg Zsombor",
        15: "Varga Vince"
    },
    guest: {
        1: "Unai Aguirre",
        2: "Alberto Munarriz",
        3: "Alvaro Granados",
        4: "Bernat Sanahuja",
        5: "Miguel de Toro",
        6: "Marc Larumbe",
        7: "Pol Daura Gomez",
        8: "Sergi Cabanas",
        9: "Roger Tahull",
        10: "Francisco Valera",
        11: "Unai Biel Lara",
        12: "Alejandro Bustos",
        13: "Eduardo Lorrio",
        14: "Oscar Asensio",
        15: "Biel Gomila"
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

