import state from './state'

const settingsContainer = document.querySelector('.site__settings')
const form = document.querySelector('.settings__form')
const audienceMode = document.querySelector('.form__audience-mode')
const scriptureMode = document.querySelector('.form__scripture-mode')
const keyboardNav = document.querySelector('.form__keyboard')
const welcomeMessage = document.querySelector('.form__welcome')
const lessonNumberElement = document.querySelector('[data-lesson]')
const button = document.querySelector('.settings__button')
const stateChange = new window.CustomEvent('stateChange', {
  bubbles: true,
  cancelable: true
})

// What: Visually represent the state on the settings form.
// How: Use the array of settings to map a value on the form. Check that input. Note that the value is the unique identifier, so this isn't very extensible (two settings could easily have "on" as values).
// Why: The settings for should reflect the state.
function setInitialSettings (array, scope) {
  return array.map(setting => {
    const target = scope.querySelector(`[value=${setting}]`)
    target.checked = true
    return target
  })
}

// What: Save the settings into state & localStorage.
// Why: Settings should be immediately available (state) and persist (localStorage).
function saveSettings (name, setting) {
  state[name] = setting
  return window.localStorage.setItem(name, setting)
}

// What: Save the lessonNumber into localStorage.
// How: Should be called conditionally, because settings exist outside of Lessons, but lessonNumber only exists inside of Lessons.
// Why: Lesson number is used to resume lesson on CTA component.
function saveLessonNumber (lesson) {
  return window.localStorage.setItem('currentLesson', lesson)
}

function handleMenu (isOpen) {
  if (isOpen) {
    // button.setAttribute('aria-label', 'Close Settings Menu')
    button.setAttribute('aria-expanded', 'true')
    form.setAttribute('aria-hidden', 'false')
    form.classList.remove('settings__form--is-closed')
    form.classList.add('settings__form--is-open')
    // enable when expanded (correct tab-order for visible elements)
    audienceMode.disabled = false
    scriptureMode.disabled = false
    keyboardNav.disabled = false
    welcomeMessage.disabled = false
  } else {
    // button.setAttribute('aria-label', 'Settings Menu')
    button.setAttribute('aria-expanded', 'false')
    form.setAttribute('aria-hidden', 'true')
    form.classList.remove('settings__form--is-open')
    form.classList.add('settings__form--is-closed')
    // disable when collapsed (no tabbing invisible elements)
    audienceMode.disabled = true
    scriptureMode.disabled = true
    keyboardNav.disabled = true
    welcomeMessage.disabled = true
  }
}

// Contextually set the endpoints for keyboard navigation.
function setNavigationEndpoints () {
  const previous = document.querySelector('.navbar__link--previous')
  const next = document.querySelector('.navbar__link--next')
  const resume = document.querySelector('.resume__action')
  const go = {}

  if (next !== null) {
    go.next = next.href
  } else if (resume && resume.href) {
    go.next = resume.href
  } else {
    go.next = '/introduction/'
  }

  if (previous !== null) {
    go.previous = previous.href
  } else if (resume && resume.href) {
    go.previous = resume.href
  } else {
    go.previous = '/introduction/'
  }

  go.home = () => {
    window.location.href = '/'
  }
  go.search = () => document.querySelector('.search__input').focus()

  return go
}

function handleKeyboardInput (e) {
  const go = setNavigationEndpoints()
  // Set booleans for use in conditionals below.
  const navOn = state.keyboardNav === 'on'

  // Close the menu if the search input is the active element.
  if (document.activeElement === document.querySelector('.search__input')) {
    state.menuIsOpen = false
    return document.body.dispatchEvent(stateChange)
  }

  // If the menu is open and the site settings container doesn't contain the active element (tabbed away from, for instance).
  if (state.menuIsOpen && !settingsContainer.contains(document.activeElement)) {
    state.menuIsOpen = false
    return document.body.dispatchEvent(stateChange)
  }

  // Close the menu with "escape" if it's open.
  if (e.keyCode === 27 && state.menuIsOpen) {
    state.menuIsOpen = false
  // Toggle the menu with "m" if the menu is closed.
  } else if (e.keyCode === 77) {
    state.menuIsOpen = !state.menuIsOpen
    // If the menu is open, set the button to be the focused element (not inherently done since this was opened with the keyboard nav).
    if (state.menuIsOpen) {
      button.focus()
    }
  }

  // Keyboard navigation.
  // "p"
  if (e.keyCode === 80 && navOn) {
    document.location.href = go.previous
  // "n"
  } else if (e.keyCode === 78 && navOn) {
    document.location.href = go.next
  // "h"
  } else if (e.keyCode === 72 && navOn) {
    go.home()
  // "s"
  } else if (e.keyCode === 83 && navOn) {
    go.search()
  }

  // Dispached the changed state (if the action taken doesn't preclude this step, such as window.location.href change).
  return document.body.dispatchEvent(stateChange)
}

function handleClickOffElement (e) {
  const withinForm = form.contains(e.target)
  const matchedButton = button.contains(e.target)

  // Don't close the form if clicking on the settings button.
  if (matchedButton) {
    return
  }

  // Close the form if clicking outside the form and the form is open.
  if (!withinForm && state.menuIsOpen === true) {
    state.menuIsOpen = false

    return document.body.dispatchEvent(stateChange)
  }
}

const settings = {
  updateState () {
    if (lessonNumberElement) {
      saveLessonNumber(lessonNumberElement.dataset.lesson)
    }

    setInitialSettings([
      state.audienceMode,
      state.scriptureMode,
      state.keyboardNav,
      state.welcomeMessage
    ], form)

    handleMenu(state.menuIsOpen)
  },
  once () {
    // Both saves the setting and triggers pub/sub for cusom event.
    form.addEventListener('change', function (e) {
      if (e.target.nodeName === 'INPUT') {
        saveSettings(e.target.name, e.target.value)
      }

      return document.body.dispatchEvent(stateChange)
    })

    window.addEventListener('keyup', handleKeyboardInput)

    button.addEventListener('click', function () {
      state.menuIsOpen = !state.menuIsOpen
      return handleMenu(state.menuIsOpen)
    })

    // What: Close the form by methods other than clicking on the settings button.
    document.addEventListener('click', handleClickOffElement)
  }
}

export default settings
