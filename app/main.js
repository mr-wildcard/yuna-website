var nodeList2Array = require('./NodeList2Array');

let backgroundContainerElement = document.querySelector('#backgrounds-container')
let backgroundHolderElements = backgroundContainerElement.querySelectorAll('.background-holder')

let backgroundImage1 = new Image()
backgroundImage1.onload = () => {

    backgroundHolderElements[0].classList.add('background-holder-1')
    backgroundHolderElements[1].classList.add('background-holder-2')
    backgroundContainerElement.classList.add('loaded')
    startApp()
}

backgroundImage1.src = '/images/yuna1.jpg'


var startApp = () => {

    let introTitleElement = document.querySelector('#intro-title')
    let titleLettersElements = nodeList2Array( introTitleElement.querySelectorAll('span.delayed-show') )
    let totalDelayLetters = 0, maxDelay = 0

    while (titleLettersElements.length) {
        let letterElementIndex = Math.floor( Math.random() * titleLettersElements.length )
        let letterElement = titleLettersElements[ letterElementIndex ]
        totalDelayLetters = Math.round( 200 + Math.random() * 500 )
        maxDelay = Math.max( totalDelayLetters, maxDelay )

        letterElement.style.webkitTransitionDelay = totalDelayLetters + 'ms'
        titleLettersElements.splice(letterElementIndex, 1)
    }

    introTitleElement.classList.add('show')

    let mainTitle = document.querySelector('#main-title')

    setTimeout(() => {
        introTitleElement.parentNode.removeChild(introTitleElement)
        mainTitle.classList.add('show')
    }, 2000 + maxDelay)

}
