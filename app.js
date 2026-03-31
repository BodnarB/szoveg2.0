let teamH = document.querySelector('#team-home')
let teamG = document.querySelector('#team-guest')
let inputText = document.querySelector('#input-text')
let finalText = document.querySelector('#final-text')
let copyBtn = document.querySelector('.copy-btn')
let resetBtn = document.querySelector('.reset-btn')

let defaultText = `Xh (b) és az ukrán Yg a labdarúgó U21-es Európa-bajnokság selejtezőjének H csoportjában játszott Magyarország - Ukrajna mérkőzésen az Új Hidegkuti Nándor Stadionban 2026. március 31-én. `

inputText.value = defaultText

resetBtn.addEventListener('click', () => {
    inputText.value = defaultText
    inputText.dispatchEvent(new Event('input'))
})

let csapatok = {
    home: {
        1: "Pécsi Ármin",
        2: "Yaakobishvili Antal",
        3: "Markgráf Ákos",
        4: "Fenyő Noah",
        5: "Dragóner Áron",
        6: "Tóth Rajmund",
        7: "Vajda Botond",
        8: "Horváth Kevin",
        9: "Klausz Milán",
        10: "Vancsa Zalán",
        11: "Molnár Ádin",
        12: "Erdélyi Benedek",
        13: "Kovács Patrik",
        14: "Bodnár János",
        15: "Bíró Barnabás",
        16: "Lakatos Csongor",
        17: "Dénes Csanád Vilmos",
        18: "Krajcsovics Ábel György",
        19: "Gruber Zsombor",
        20: "Tuboly Máté",
        21: "Átrok István",
        22: "Lehoczki Bendegúz",
        23: "Bánáti Kevin"
    },
    guest: {
        1: "Vladiszlav Krapivcov",
        2: "Illja Krupszkij",
        3: "Bohdan Redusko",
        4: "Vladiszlav Kiszil",
        5: "Olekszij Guszijev",
        6: "Ivan Varfolomiejev",
        7: "Danilo Krevszun",
        8: "Makszim Melnicsenko",
        9: "Artem Sztepanov",
        10: "Hennagyij Szincsuk",
        11: "Timur Tutjerov",
        12: "Ivan Paholijuk",
        13: "Vladiszlav Zaharcsenko",
        14: "Volodimir Vilivald",
        15: "Danijil Vascsenko",
        16: "Jevhenij Pasztuh",
        17: "Oleh Fedor",
        18: "Anton Hluscsenko",
        19: "Olekszandr Piscsur",
        20: "Anton Carenko",
        21: "Artem Huszol",
        22: "Szerhij Kornijcsuk",
        23: "Illja Popovics"
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

