import { showCorrectVersion } from '../helper'
import state from './state'

const versions = [...document.querySelectorAll('.scripture__container')]

function init () {
  return showCorrectVersion({
    list: versions,
    prefix: 'scripture__container--',
    correct: state.scriptureMode
  })
}

export default init
