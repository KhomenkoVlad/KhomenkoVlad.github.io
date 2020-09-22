const buttonPlay = document.getElementById('button-play');
const buttonStop = document.getElementById('button-stop');
const select = document.getElementById('file-music');
const currentTimeLabel = document.getElementById('current-time');
const scaleContainer = document.getElementById('scale-container');
const scalePercent = document.getElementById('scale-percent');

const audio = new Audio();

function play() {
    if (buttonPlay.classList.contains('pause')) {
        audio.pause();
        buttonPlay.classList.remove('pause');
    } else {
        audio.play();
        buttonPlay.classList.add('pause');
    }
}

function loadMusic() {
    let reader = new FileReader();
    reader.onload = function (e) {
        audio.src = this.result;
    };
    reader.readAsDataURL(select.files[0]);
    buttonPlay.classList.remove('pause');

    initProgressBar();
}

function calculatePercentPlayed() {
    let percentage = (audio.currentTime / audio.duration).toFixed(2) * 100;
    if(Number.isNaN(percentage)){
        percentage = 0;
    }
    scalePercent.style.width = `${percentage}%`;
}

function calculateCurrentValue(currentTime) {
    const currentMinute = parseInt(currentTime / 60) % 60;
    const currentSecondsLong = currentTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
        }`;

    return currentTimeFormatted;
}

function initProgressBar() {
    const currentTime = calculateCurrentValue(audio.currentTime);
    currentTimeLabel.innerHTML = currentTime;
    scaleContainer.addEventListener('click', seek);
    function seek(e) {
        const percentage = e.offsetX / this.offsetWidth;
        audio.currentTime = percentage * audio.duration;
    }

    calculatePercentPlayed();
}

select.addEventListener('change', () => {
    loadMusic();
});

buttonPlay.addEventListener('click', () => {
    play();
});

buttonStop.addEventListener('click', () => {
    loadMusic();
});

audio.addEventListener('timeupdate', initProgressBar);