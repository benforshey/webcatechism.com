import state from './state'

const player = document.querySelector('.site__video')

const video = {
  updateState () {
    if (state.audienceMode === 'child') {
      player.hidden = true
      return player.classList.add('is-hidden')
    } else {
      player.hidden = false
      return player.classList.remove('is-hidden')
    }
  },
  once () {

  }
}

export default video
