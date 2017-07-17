// Get the elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let leftClicking = false;



// Build the functions

function togglePlay() {
  // video.paused ? video.play() : video.pause();
  video[video.paused ? 'play' : 'pause']();
}

// Pause/play with space bar even if video is not in focus
function spacebarToggle(e) {
  // console.log(e);
  if (e.code === 'Space') {
    togglePlay();
    console.log("I'm running");
  }
}

function updateButton() {
  console.log('I was toggled!');
  toggle.textContent = this.paused ? '▶️' : '❚ ❚';
}

function skip() {
  console.log(this.dataset);
  video.currentTime += +this.dataset.skip;
}

function isClicking(e) {
  leftClicking = e.type = 'mousedown' ? true : false;
}

function handleRangeUpdate(e) {
  // Run on mousemove only if user is left-clicking:
  if (e.type === 'change' || e.type === 'mousemove' && leftClicking) {
    console.log(e.type);
    // const newSetting = this.value;
    // video[this.name === 'volume' ? 'volume' : 'playbackRate'] = newSetting;
    video[this.name] = this.value;
  }
}

function handleProgress() {
  const percent = video.currentTime / +video.duration * 100;
  progressBar.style.flexBasis = `${ percent }%`;
}

function scrub(e) {
  // Add support for click & drag:
  if (e.type === 'click' || e.type === 'mousemove' && leftClicking) {
    console.log(e);
    console.log(leftClicking);
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  }
}



// Hook up Event Listeners

video.addEventListener('click', togglePlay);
window.addEventListener('keydown', spacebarToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', isClicking);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', isClicking));