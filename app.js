let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh, a Ferencváros (b) és Yg, a Borussia Dortmund játékosa a női kézilabda Bajnokok Ligája negyeddöntőbe jutásért játszott FTC-Rail Cargo Hungaria - Borussia Dortmund visszavágó mérkőzésen az Érd Arénában 2026. március 28-án. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Laura Glauser",
        11: "Daria Dmitrieva",
        15: "Hársfalvi Júlia",
        16: "Böde-Bíró Blanka",
        18: "Mette Tranborg",
        21: "Márton Gréta",
        26: "Antje Angela Malestein",
        38: "Simon Petra Anna",
        41: "Balázs Bítia",
        42: "Klujber Katrin Gitta",
        49: "Szeibert Anna Rebeka",
        51: "Vilde Mortensen Ingstad",
        58: "Bordás Réka",
        72: "Dragana Cvijic"
    },
    guest: {
        1: "Teodora Roncevic",
        4: "Alina Grijseels",
        7: "Szikora Melinda",
        8: "Maraike Kusian",
        9: "Lisa Antl",
        17: "Alicia Langer",
        21: "Kaja Kamp Nielsen",
        22: "Déborah Lassource",
        24: "Guro Berland Husebo",
        29: "Emma Olsson",
        31: "Kelly Vollebregt",
        33: "Guro Nestaker",
        44: "Lara Egeling",
        66: "Dana Bleckmann"
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

