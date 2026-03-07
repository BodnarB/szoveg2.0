let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b), az Újpest és Yg, a Paks játékosa a labdarúgó Fizz Liga 25. fordulójában játszott Újpest FC - Paksi FC mérkőzésen a Szusza Ferenc Stadionban 2026. március 7-én. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Riccardo Piscitelli",
        2: "Bodnár Gergő",
        5: "Daviti Kobouri",
        7: "Giorgi Beridze",
        8: "Arijan Ademi",
        9: "Fran Brodic",
        10: "Arne Maier",
        11: "Horváth Krisztofer",
        15: "Mucsányi Miron",
        17: "Aljosa Matko",
        18: "Tom Lacoux",
        19: "Nejc Gradisar",
        23: "Banai Dávid",
        25: "Katona Benedek",
        27: "Krajcsovics Ábel",
        30: "Joao Nunes",
        31: "Dombó Dávid",
        33: "Bese Barnabás",
        34: "Milan Tucic",
        38: "Sarkadi Kristóf",
        39: "Gleofilo Vlijter",
        44: "Gergényi Bence",
        45: "Iuri Medeiros",
        55: "Fiola Attila",
        74: "Kaczvinszki Dominik",
        77: "Fenyő Noah",
        85: "Szentmihályi Ádám",
        88: "Matija Ljujic",
        94: "Patrizio Stronati"
    },
    guest: {
        1: "Kovácsik Ádám",
        2: "Kinyik Ákos",
        3: "Alaxai Áron",
        4: "Májik Gergő",
        5: "Vécsei Bálint",
        7: "Ádám Martin",
        8: "Balogh Balázs",
        9: "Hahn János Csaba",
        11: "Bévárdi Zsombor",
        12: "Vas Gábor",
        13: "Böde Dániel",
        14: "Silye Erik",
        15: "Szendrei Ákos",
        16: "Pesti Zoltán",
        17: "Hinora Kristóf",
        18: "Gyurkits Gergő",
        19: "Horváth Kevin",
        20: "Zeke Márió",
        21: "Papp Kristóf",
        22: "Windecker József",
        23: "Máté Csaba",
        24: "Lenzsér Bence",
        25: "Simon Barnabás",
        26: "Szekszárdi Milán",
        27: "Galambos János",
        28: "Gyetván Márk",
        29: "Tóth Barna",
        30: "Szabó János"
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

