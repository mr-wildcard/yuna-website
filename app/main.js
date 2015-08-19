import qwest from 'qwest'

//var colors = [ "#343434", "#272727", "#595959", "#6D6D6D", "#626262" ]
var colors = [ "#EFEFEF", "#F5F5F5" ]

var mainContentElm = document.querySelector('#main-content');
var contentBorder = document.querySelector('#content-border');

var originalTweets = [],
    tweetText = "",
    allTweets = [];

qwest.get('/tweets.json')
    .then((xhr, data) => originalTweets = data)
    .then(startApp);


function startApp() {

    originalTweets.forEach(tweet => {

        tweetText = tweet.text;
        if (tweet.entities.hashtags.length) {
            tweet.entities.hashtags.forEach(hashtag => {
                tweetText = tweetText.replace(`#${hashtag.text}`, `<span class='hashtag'>#${hashtag.text}</span>`)
            });
        }

        if (tweet.entities.urls.length) {
            tweet.entities.urls.forEach(url => {
                tweetText = tweetText.replace(`${url.url}`, `<a href='${url.expanded_url}' target='_blank' class='link'>${url.display_url}</a>`)
            });
        }

        allTweets.push(`<span style='color: ${colors[Math.floor(Math.random() * colors.length)]};'>${tweetText}&nbsp;</span>`);
    });

    contentBorder.insertAdjacentHTML('beforebegin', allTweets.join(' '));
}

window.onload = () => {

    setTimeout(() => {
        document.querySelector("#hello").style.opacity = 0;
        mainContentElm.style.opacity = 1;
    }, 2000);
};

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};