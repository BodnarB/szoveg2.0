let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és a dán Yg a női kézilabda Eurokupa B csoportjának 3. fordulójában játszott Magyarország - Dánia mérkőzésen a Tatabányai Multifunkcionális Sportcsarnokban 2026. március 5-én.`

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        4: "Tóvizi Petra",
        5: "Csíkos Luca",
        9: "Hársfalvi Júlia",
        10: "Faragó Lea",
        11: "Albek Anna",
        17: "Falusi-Udvardi Laura",
        18: "Kovács Anett",
        20: "Szmolek Apollónia",
        28: "Papp Nikoletta",
        31: "Szemerey Zsófi",
        38: "Vámos Petra",
        42: "Klujber Katrin",
        58: "Bordás Réka",
        59: "Kuczora Csenge",
        61: "Janurik Kinga",
        74: "Bukovszky Anna",
        77: "Simon Petra"
    },
    guest: {
        2: "Stine Nörklit Lonborg",
        7: "Ida-Marie Moesgaard Dahl",
        8: "Anne Mette Hansen",
        11: "Line Haugsted",
        12: "Anna Opstrup Kristensen",
        15: "Sofie Bardrum-Larsen",
        18: "Mette Tranborg",
        23: "Kristina Jørgensen",
        25: "Trine Ostergaard Jensen",
        28: "Laura Maria Borg Thestrup",
        29: "Clara Ronde Haugaard Bang",
        32: "Mie Enggrob Hojlund",
        33: "Emma Cecilie Uhrskov Friis",
        35: "Nanna Hinnerfeldt Andersen",
        37: "Sarah Dalsgaard Paulsen",
        40: "Amalie Milling",
        41: "Elma Halilcevic",
        44: "Cecilie Hojgaard Brandt",
        45: "Julie Mathiesen Scaglione",
        50: "Anne Christine Bossen"
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

