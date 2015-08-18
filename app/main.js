import qwest from 'qwest'

//var colors = [ "#343434", "#272727", "#595959", "#6D6D6D", "#626262" ]
var colors = [ "#EFEFEF", "#F5F5F5" ]

var mainContentElm = document.querySelector('#main-content');
var contentBorder = document.querySelector('#content-border');

var originalTweets = [],
    allTweets = "";

qwest.get('/tweets.json')
    .then((xhr, data) => originalTweets = data)
    .then(startApp);


function startApp() {

    originalTweets.forEach(tweet => {
        allTweets += `<span style='color: ${colors[Math.floor(Math.random() * colors.length)]};'>${tweet.text}&nbsp;</span>`;
    });

    contentBorder.insertAdjacentHTML('beforebegin', allTweets);
}

