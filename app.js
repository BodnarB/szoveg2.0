let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és az észak-macedón Yg a női labdarúgó világbajnoki selejtező C divízió 3. csoport 4. fordulójában játszott Magyarország - Észak-Macedónia mérkőzésen a felcsúti Pancho Arénában 2026. április 18-án. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Lauren Brzykcy",
        2: "Zágonyi Barbara",
        3: "Palakovics Laura",
        4: "Pusztai Sára",
        5: "Pápai Emőke",
        6: "Fenyvesi Evelin",
        7: "Csiszár Henrietta",
        8: "Nagy Vanessza",
        9: "Savanya Csilla",
        10: "Csiki Anna",
        11: "Nagy Virág",
        12: "Erős Evelin",
        13: "Nagy Viktória",
        14: "Pataki Georgina",
        15: "Kaján Zsanett",
        16: "Csányi Diána",
        17: "Mayer Zsófia",
        18: "Kovács Laura",
        19: "Nagy Lili",
        20: "Süle Dora",
        21: "Nagy Fanni",
        22: "Terestyényi Anna",
        23: "Németh Hanna"
    },
    guest: {
        1: "Viktorija Panchurova",
        2: "Iva Jovanoska",
        3: "Ane Bošeska",
        4: "Katerina Petkova",
        5: "Pavlinka Nikolovska",
        6: "Mila Paneva",
        7: "Melanija Grozdanova",
        8: "Aleksandra Markovska",
        9: "Ulza Maksuti",
        10: "Teona Galabovska",
        11: "Hava Mustafa",
        12: "Berna Kabakchi",
        13: "Jovana Pavlovska",
        14: "Eva Velichkova",
        15: "Elena Paneska",
        16: "Slagjana Gjorgjieva",
        17: "Lora Sulejmani",
        18: "Biljana Paneska",
        19: "Shkjipe Saliji",
        20: "Rabija Dervishi",
        21: "Bojana Petkova",
        22: "Evgenija Veljanovska",
        23: "Melani Cvetkovik"
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

