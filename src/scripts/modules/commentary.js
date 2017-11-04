import state from './state'

const commentary = document.querySelector('.site__commentary')

function init () {
  if (state.audienceMode === 'child') {
    commentary.hidden = true
    return commentary.classList.add('is-hidden')
  }
}

export default init
