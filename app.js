let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és a cseh Yg a női kézilabda Eurokupa hatodik, utolsó fordulójában játszott Magyarország - Csehország mérkőzésen az Érd Arénában 2026. április 11-én. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        4: "Tóvizi Petra",
        5: "Csíkos Luca",
        7: "Kukely Anna",
        8: "Juhász Kata",
        10: "Faragó Lea",
        17: "Falusi-Udvardi Laura",
        19: "Márton Gréta",
        20: "Szmolek Apollónia",
        28: "Papp Nikoletta",
        31: "Szemerey Zsófi",
        38: "Vámos Petra",
        42: "Klujber Katrin",
        59: "Kuczora Csenge",
        61: "Janurik Kinga",
        71: "Petrus Mirtill",
        74: "Bukovszky Anna",
        77: "Simon Petra",
        88: "Grosch Vivien"
    },
    guest: {
        4: "Kristyna Königová",
        8: "Simona Schreibmeierová",
        17: "Karolína Pejsová",
        21: "Denisa Holenáková",
        22: "Markéta Sustácková",
        23: "Marie Poláková",
        24: "Eliska Desortová",
        27: "Patricie Wizurová",
        32: "Natálie Kuxová",
        34: "Julie Franková",
        35: "Valerie Smetková",
        37: "Michaela Malá",
        38: "Anna Franková",
        43: "Veronika Holecková",
        44: "Dominika Zachová",
        48: "Sára Kovárová",
        67: "Veronika Kafka Malá",
        68: "Anna Kubálková",
        88: "Klára Kubálková"
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

