import qwest from 'qwest'

var colors = [ "#D9D9D9", "#E6E6E6", "#CCCCCC"];

var mainContentElm = document.querySelector('#main-content');
var contentBorder = document.querySelector('#content-border');

var originalTweets = [],
    tweetText = "",
    allLinks,
    allTweets = [];

window.onload = () => {

    qwest.get('/tweets.php')
        .then((xhr, data) => originalTweets = data)
        .then(startApp);
};

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
    allLinks = mainContentElm.querySelectorAll('span a');

    if ("matchMedia" in window) {
        if (window.matchMedia("(max-width: 35.5em)").matches) {
            Array.prototype.forEach.call(allLinks, link => {
                link.onclick = (e) => e.preventDefault();
            });
        } else {
            Array.prototype.forEach.call(allLinks, link => {
                link.onclick = null;
            });
        }
    }

    setTimeout(() => {
        document.querySelector("#hello").style.opacity = 0;
        mainContentElm.style.opacity = 1;
    }, 2000);
}
