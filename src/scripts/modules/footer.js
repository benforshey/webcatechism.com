import { showCorrectVersion } from '../helper'
import state from './state'

const versions = [...document.querySelectorAll('.copyright__container')]

const footer = {
  updateState () {
    showCorrectVersion({
      list: versions,
      prefix: 'copyright__container--',
      correct: state.scriptureMode
    })
  },
  once () {

  }
}

export default footer
