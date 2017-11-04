import state from './state'
import { convertToNumber, leftPadString } from '../helper'

const action = document.querySelector('.resume__action')
const resume = document.querySelector('.site__lesson-resume')
const introduction = document.querySelector('.site__welcome')
const feature = document.querySelector('.CTA__feature-detect')
const currentLesson = convertToNumber(state.currentLesson)
const paddedNumeral = leftPadString(currentLesson)

const welcome = {
  updateState () {
    if (currentLesson > 0) {
      action.href = `/lesson/${paddedNumeral}/`
      action.textContent = `Resume Lesson ${paddedNumeral}`

      resume.classList.remove('is-hidden')
      resume.hidden = false
    }

    if (state.welcomeMessage === 'hide') {
      introduction.classList.add('is-hidden')
      introduction.hidden = true
    } else {
      introduction.classList.remove('is-hidden')
      introduction.hidden = false
    }
  },
  once () {
    // The serviceWorker is supported, so notify the user of offline support.
    if ('serviceWorker' in navigator) {
      feature.classList.remove('is-hidden')
    }
  }
}

export default welcome
