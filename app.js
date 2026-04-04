let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh, az Újpest (j) és Yg, az MTK játékosa a labdarúgó Fizz Liga 28. fordulójában játszott Újpest FC - MTK Budapest mérkőzésen a Szusza Ferenc Stadionban 2026. április 4-én. `

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
        2: "Varju Benedek",
        3: "Szépe János",
        4: "Ilia Beriashvili",
        6: "Kata Mihály",
        7: "Molnár Ádin",
        8: "Németh Hunor",
        10: "Bognár István",
        11: "Marin Jurina",
        12: "Bene Domonkos",
        14: "Horváth Artúr",
        15: "Széles Imre",
        17: "Róbert Polievka",
        18: "Németh Krisztián",
        20: "Kerezsi Zalán",
        21: "Átrok István Zalán",
        23: "Jakub Plsek",
        24: "Fadgyas Tamás",
        25: "Kádár Tamás",
        26: "Vilius Armalas",
        27: "Kovács Patrik",
        29: "Balázs József",
        30: "Vitályos Viktor",
        39: "Jurek Gábor",
        47: "Hegyi Krisztián",
        80: "Adrian Zeljkovic"
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

