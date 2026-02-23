let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh, az MTK (b) és Yg, a Ferencváros játékosa a labdarúgó Fizz Liga 23. fordulójában játszott MTK Budapest - Ferencvárosi TC mérkőzésen az Új Hidegkuti Nándor Stadionban 2026. február 23-án.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
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
        21: "Átrok István",
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
    },
    guest: {
        1: "Varga Ádám",
        3: "Stefan Gartenmann",
        4: "Mariano Gómez",
        5: "Naby Keita",
        7: "Elton Acolatse",
        8: "Aleksandar Pesic",
        10: "Jonathan Levi",
        11: "Bamidele Yusuf",
        14: "Osváth Attila",
        15: "Mohammed Abu Fani",
        16: "Kristoffer Zachariassen",
        17: "Corbu Máriusz",
        19: "Franko Kovacevic",
        20: "Cadu",
        21: "Botka Endre",
        22: "Szalai Gábor",
        23: "Ötvös Bence",
        25: "Cebrail Makreckis",
        27: "Ibrahim Cissé",
        28: "Toon Raemaekers",
        29: "Szécsi Gergő",
        30: "Gruber Zsombor",
        36: "Gavriel Kanikovszki",
        47: "Callum O'Dowda",
        62: "Gólik Benjámin",
        63: "Radnóti Dániel",
        66: "Júlio Romao",
        71: "Lakatos Csongor",
        72: "Madarász Ádám",
        75: "Lenny Joseph",
        76: "Lisztes Krisztián",
        77: "Nagy Barnabás",
        80: "Habib Maiga",
        88: "Philippe Rommens",
        90: "Dibusz Dénes",
        99: "Gróf Dávid"
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

