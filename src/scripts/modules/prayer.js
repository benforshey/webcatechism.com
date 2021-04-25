import state from './state'
import { showCorrectVersion } from '../helper'

const versions = [...document.querySelectorAll('.prayer__container')]

function init () {
  showCorrectVersion({
    list: versions,
    prefix: 'prayer__container--',
    correct: state.audienceMode
  })
}

export default init
