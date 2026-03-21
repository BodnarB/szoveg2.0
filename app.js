let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és az olasz Yg a Magyarország - Olaszország férfi kézilabda felkészülési mérkőzésen a Tatabányai Multifunkcionális Sportcsarnokban 2026. március 21-én. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        2: "Sipos Adrián",
        7: "Bóka Bendegúz",
        9: "Pergel Andrej",
        11: "Ligetvári Patrik",
        18: "Krakovszki Bence",
        21: "Nagy Benedek",
        23: "Máthé Dominik",
        24: "Fazekas Gergő",
        26: "Rodríguez Pedro",
        31: "Szűcs Bence",
        32: "Palasics Kristóf",
        39: "Bodó Richárd",
        43: "Ilic Zoran",
        45: "Rosta Miklós",
        49: "Sztraka Dániel",
        61: "Bartucz László",
        71: "Ónodi-Jánoskúti Máté",
        72: "Lukács Péter",
        77: "Hanusz Egon",
        90: "Tóth Levente",
        91: "Imre Bence"
    },
    guest: {
        2: "Leo Prantner",
        3: "Nicola Fadanelli",
        5: "Gianluca Dapiran",
        6: "Davide Bulzamini",
        7: "Filippom Angiolini",
        8: "Giacomo Savini",
        10: "Marco Mengon",
        11: "Nicolo D Antino",
        15: "Simone Mengon",
        18: "Valentino Dello Vicario",
        20: "Davide Pugliese",
        27: "Gabriele Somma",
        30: "Tommaso Romei",
        32: "Andrea Parisini",
        40: "Simon Sirot",
        51: "Pau Panitti",
        62: "Alex Belardinelli",
        90: "Salah Riahi"
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

