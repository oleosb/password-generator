let clipboardBtn = document.querySelector('.password-container > div')
let lenghtEl = document.querySelector('.lenghtInpt')
let upperEl = document.querySelector('.upperInpt')
let lowerEl = document.querySelector('.lowerInpt')
let numberEl = document.querySelector('.numberInpt')
let symbolEl = document.querySelector('.symbolsInpt')
let generator = document.querySelector('.generator-btn')
let passwordEl = document.querySelector('.password')


function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 48)
}

function getRandomSymbol() {
        let symbols = '!@#$%^&*(){}[]=<>/,.'
        return symbols[Math.floor(Math.random() * symbols.length)]
}

let random = {
        upper: getRandomUpper,
        lower: getRandomLower,
        number: getRandomNumber,
        symbol: getRandomSymbol
}

generator.addEventListener('click', () => {
        let length = +lenghtEl.value
        let upper = upperEl.checked
        let lower = lowerEl.checked
        let number = numberEl.checked
        let symbol = symbolEl.checked

        passwordEl.innerText = generatePassword(length, upper, lower, number, symbol)
})

function generatePassword(length, upper, lower, number, symbol) {
        let password = ''
        let includesCount = upper + lower + number + symbol
        let includesArray = [{ upper }, { lower }, { number }, { symbol }].filter(includes => Object.values(includes)[0])
        
        if (includesCount === 0) {
                return ''
        }

        for (let i = 0; i < length; i += includesCount){
                includesArray.forEach(includes => {
                        let names = Object.keys(includes)[0]
                        password += random[names]()
                })
        }

        finalPassword = password.slice(0, length)
        return finalPassword
}

clipboardBtn.addEventListener('click', () => {
        let password = passwordEl.innerText

        if (password) {
                let textarea = document.createElement('textarea')
                textarea.value = password
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                textarea.remove()

                clipboardBtn.classList.add('show')
                setTimeout(() => clipboardBtn.classList.remove('show'), 800)
        }
})