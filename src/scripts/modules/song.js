import state from './state'

// const input = document.querySelector('.controls__loop-input')
const loop = document.querySelector('.controls__button--loop')
const button = document.querySelector('.controls__button--play-pause')
const progressContainer = document.querySelector('.controls__progress')
const progressBar = document.querySelector('.progress__indicator')
const songSection = document.querySelector('.site__song')
const audio = document.querySelector('.song__audio')
const list = document.querySelector('.playlist__list')

// What: Set the active song & associated aria properties in the playlist and related elements.
// Why: Visual / semantic styling on the active class, build accessibly.
function setActiveSong (audioElement) {
  const source = audioElement.src
  const listLinks = Array.from(list.querySelectorAll('.playlist__link'))

  listLinks.map(link => {
    if (link.href === source) {
      link.id = 'active-song'
      loop.setAttribute('aria-describedby', 'active-song')
      return link.classList.add('playlist__link--active')
    } else {
      link.removeAttribute('id')
      return link.classList.remove('playlist__link--active')
    }
  })
}

function handleLoop () {
  state.loopSong = !state.loopSong

  if (state.loopSong) {
    audio.loop = true
    loop.setAttribute('aria-pressed', 'true')
    button.setAttribute('aria-label', 'Play this song repeatedly.')
    button.setAttribute('aria-describedby', 'active-song')
    return loop.classList.add('loop__is-active')
  } else {
    audio.loop = false
    button.setAttribute('aria-label', 'Play all songs once.')
    button.setAttribute('aria-describedby', 'playlist')
    loop.setAttribute('aria-pressed', 'false')
    return loop.classList.remove('loop__is-active')
  }
}

function handleSongEnd (e) {
  const listLinks = Array.from(list.querySelectorAll('.playlist__link'))
  const audio = e.target
  const sourceList = listLinks.map(link => link.href)
  const length = sourceList.length
  const current = sourceList.indexOf(audio.src)

  // If there's a next song in the listLinks...
  if (length && (current + 1) < length) {
    // ...set the source to the next in the listLinks and play the song, or...
    audio.src = sourceList[current + 1]
    audio.play()
  } else {
    // ...set the source to the first song, without playing.
    audio.src = sourceList[0]
  }
  // Finally, set the active song again.
  return setActiveSong(audio)
}

function handleClick () {
  const method = audio.paused ? 'play' : 'pause'
  return audio[method]()
}

function updateButton () {
  const playImage = button.querySelector('.button-svg__play')
  const pauseImage = button.querySelector('.button-svg__pause')
  const pressed = audio.paused ? 'false' : 'true'

  if (audio.paused) {
    pauseImage.classList.add('is-hidden')
    playImage.classList.remove('is-hidden')
  } else {
    playImage.classList.add('is-hidden')
    pauseImage.classList.remove('is-hidden')
  }

  return button.setAttribute('aria-pressed', pressed)
}

function handleProgress () {
  // audio.duration is NaN when song has not yet started, so default to 0% when song has not yet started playing.
  const percent = ((audio.currentTime / audio.duration) * 100) || 0
  progressBar.style.flexBasis = `${percent}%`
}

function handlePlaylistChange (e) {
  e.preventDefault()
  e.stopPropagation()

  if (e.target.nodeName === 'A') {
    audio.src = e.target.href
    audio.play()
    return setActiveSong(audio)
  }
}

function scrub (e) {
  if (!state.isMouseDown && e.type === 'mousemove') {
    return
  }
  const scrubTime = (e.offsetX / progressContainer.offsetWidth) * audio.duration
  audio.currentTime = scrubTime
}

const song = {
  updateState () {
    if (state.audienceMode === 'adult') {
      songSection.hidden = true
      return songSection.classList.add('is-hidden')
    }
    songSection.hidden = false
    songSection.classList.remove('is-hidden')
    return setActiveSong(audio)
  },
  once () {
    audio.addEventListener('ended', handleSongEnd)
    audio.addEventListener('play', updateButton)
    audio.addEventListener('pause', updateButton)
    audio.addEventListener('timeupdate', handleProgress)

    list.addEventListener('click', handlePlaylistChange)

    button.addEventListener('click', handleClick)

    progressContainer.addEventListener('click', scrub)
    progressContainer.addEventListener('mousemove', scrub)

    loop.addEventListener('click', handleLoop)

    document.addEventListener('mousedown', () => {
      state.isMouseDown = true
    })

    document.addEventListener('mouseup', () => {
      state.isMouseDown = false
    })
  }
}

export default song
