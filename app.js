let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `X, az FTC-Telekom (b) és Y, a Hydro Fehérvár AV19 játékosa a férfi jégkorong osztrák liga FTC-Telekom - Hydro Fehérvár AV19 mérkőzésén a budapesti Tüskecsarnokban 2026. január 3-án.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Bálizs Bence",
        5: "Farkas Boldizsár",
        7: "Jesper Lindgren",
        11: "Topi Rönni",
        12: "Brady Shaw",
        13: "Nagy Krisztián",
        14: "Molnár Dávid",
        17: "Mihalik András",
        18: "Mattyasovszky Gergely",
        19: "Alexander Ytterell",
        20: "Sofron István",
        21: "Tyler Coulter",
        22: "Horváth Milán",
        23: "Hadobás Zétény",
        25: "Aku Kestila",
        27: "Seregély Máté",
        30: "Nagy Kristóf",
        44: "Paavo Tyni",
        52: "Rasmus Bengtsson",
        59: "Arany Gergely",
        61: "Tóth Richárd",
        77: "Tóth Gergely",
        92: "Jussi Tammela",
        93: "Laskawy Ferenc",
        94: "Galajda Zsombor"
    },
    guest: {
        3: "Varga Balázs",
        5: "Stipsicz Bence",
        7: "Martin Stajnoch",
        10: "Bartalis István",
        13: "Németh Kristóf",
        16: "Hári János",
        17: "Kiss Roland",
        18: "Justin Richards",
        21: "Falus ÁdÁm",
        26: "Rasmus Kulmala",
        34: "Terbócs István",
        35: "Horváth Dominik",
        36: "Erdély Csanád",
        39: "Trevor Cheek",
        45: "Rasmus Reijola",
        47: "Ambrus Csongor",
        51: "Tim Campbell",
        59: "Joel Messner",
        67: "Horváth Donát",
        79: "Ole Einar Andersen",
        82: "Magosi Bálint",
        86: "Drake Rymsha",
        90: "Darren Archibald",
        92: "Anze Kuralt",
        93: "Mihály Ákos"
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

