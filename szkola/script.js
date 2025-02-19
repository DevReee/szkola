function updateStatus() {
    const statusElement = document.getElementById('status');
    const timeRemainingElement = document.getElementById('time-remaining');
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const schedule = [
        { start: 8 * 60, end: 8 * 60 + 45 },   // 1 lekcja
        { start: 8 * 60 + 50, end: 9 * 60 + 35 }, // 2 lekcja
        { start: 9 * 60 + 40, end: 10 * 60 + 25 }, // 3 lekcja
        { start: 10 * 60 + 30, end: 11 * 60 + 15 }, // 4 lekcja
        { start: 11 * 60 + 20, end: 12 * 60 + 5 }, // 5 lekcja
        { start: 12 * 60 + 10, end: 12 * 60 + 55 }, // 6 lekcja
        { start: 13 * 60 + 10, end: 13 * 60 + 55 }, // 7 lekcja
        { start: 14 * 60, end: 14 * 60 + 45 }, // 8 lekcja
        { start: 14 * 60 + 50, end: 15 * 60 + 35 }, // 9 lekcja
        { start: 15 * 60 + 40, end: 16 * 60 + 25 } // 10 lekcja
    ];

    const currentTime = currentHour * 60 + currentMinute;
    let status = 'Poza godzinami lekcyjnymi';
    let timeRemaining = 0;

    for (let i = 0; i < schedule.length; i++) {
        if (currentTime >= schedule[i].start && currentTime < schedule[i].end) {
            status = `Lekcja ${i + 1}`;
            timeRemaining = schedule[i].end - currentTime;
            break;
        } else if (i < schedule.length - 1 && currentTime >= schedule[i].end && currentTime < schedule[i + 1].start) {
            status = 'Przerwa';
            timeRemaining = schedule[i + 1].start - currentTime;
            break;
        }
    }

    statusElement.textContent = `Status: ${status}`;
    timeRemainingElement.textContent = `Pozostały czas: ${timeRemaining} minut`;
}

setInterval(updateStatus, 1000);
updateStatus();

async function fetchNews() {
    var url = 'https://newsapi.org/v2/everything?' +
              'q=wojsko&' +
              'sortBy=popularity&' +
              'apiKey=b748f81beb20427a84332fc7eee6b220';
    var req = new Request(url);
    const response = await fetch(req);
    const data = await response.json();
    const newsContent = document.getElementById('news-content');
    newsContent.innerHTML = data.articles.map(article => `<span>${article.title}</span><span class="news-separator"> • </span>`).join('') + data.articles.map(article => `<span>${article.title}</span><span class="news-separator"> • </span>`).join('');
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchNews();
    setInterval(fetchNews, 60000); // Update news every 60 seconds
    displayLuckyNumber();
    setTimeout(startVideo, 3000); // Start video 3 seconds after page load
});

function displayLuckyNumber() {
    const luckyNumberElement = document.getElementById('lucky-number');
    const today = new Date().toISOString().slice(0, 10);
    let luckyNumber = localStorage.getItem('luckyNumber');
    let luckyNumberDate = localStorage.getItem('luckyNumberDate');

    if (luckyNumberDate !== today) {
        luckyNumber = Math.floor(Math.random() * 35) + 1;
        localStorage.setItem('luckyNumber', luckyNumber);
        localStorage.setItem('luckyNumberDate', today);
    }

    luckyNumberElement.textContent = luckyNumber;
}

function startVideo() {
    const iframe = document.getElementById('video-iframe');
    const player = new YT.Player(iframe, {
        events: {
            'onReady': function(event) {
                event.target.playVideo();
            }
        }
    });
}

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
