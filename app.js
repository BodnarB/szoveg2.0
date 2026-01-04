let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `X, a Ferencváros (b) és Y, a Dunaújváros játékosa a női kézilabda NB I-ben játszott FTC-Rail Cargo Hungaria - Dunaújvárosi Kohász KA mérkőzésen a fővárosi Elek Gyula Arénában 2026. január 4-én.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Laura Glauser",
        11: "Darja Dmitrijeva",
        13: "Janurik Kinga",
        15: "Hársfalvi Júlia",
        16: "Böde-Bíró Blanka",
        18: "Mette Tranborg",
        20: "Emily Vogel",
        21: "Márton Gréta",
        22: "Orlane Kanor",
        26: "Angela Malestein",
        38: "Simon Petra",
        41: "Balázs Bítia",
        42: "Klujber Katrin",
        51: "Vilde Mortensen Ingstad",
        58: "Bordás Réka",
        72: "Dragana Cvijic"
    },
    guest: {
        1: "Krasznai Júlia",
        5: "Szalai Petra",
        15: "Török Fanni",
        19: "Győri Alexa",
        21: "Horváth Anna",
        26: "Dobos Hanna",
        44: "Kerekes Laura",
        67: "Sztanó Kincső",
        89: "Fehér Luca",
        91: "Gajdos Petra"
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

