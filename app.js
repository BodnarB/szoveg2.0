let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `XY (b) és a máltai XY a belgrádi férfi vízilabda Európa-bajnokság A csoportjának harmadik fordulójában játszott Málta - Magyarország mérkőzésen a Belgrade Arenában 2026. január 14-én.`

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
        1: "Jake Tanti",
        2: "Ivan Sergeevich Nagaev",
        3: "Liam Galea",
        4: "Ben Plumpton",
        5: "Benjamin Cachia",
        6: "Matthew Zammit",
        7: "Steven Camilleri",
        8: "Jayden Cutajar",
        10: "Nikolai Zammit",
        11: "Darren Zammit",
        12: "Alec Fenech",
        13: "Nicholas Kane Grixti",
        14: "Elijah Schembri",
        15: "Jake Bonavia"
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

