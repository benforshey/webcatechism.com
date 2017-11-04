// What: Factory (returns object) to hold state. Use closure (expression defined inside function, exposed by returning or passing) to give privileged access to state variable.
// Why: Simple implementation of global state.
function factory () {
  // Read persistent defaults from last session, if any. Set with good defaults on first load.
  const state = {
    answerLevel: 0,
    audienceMode: window.localStorage.getItem('audienceMode') || 'combined',
    currentLesson: window.localStorage.getItem('currentLesson') || 0,
    keyboardNav: window.localStorage.getItem('keyboardNav') || 'on',
    loopSong: false,
    menuIsOpen: false,
    searchResults: false,
    scriptureMode: window.localStorage.getItem('scriptureMode') || 'ESV',
    welcomeMessage: window.localStorage.getItem('welcomeMessage') || 'show'
  }

  return {
    get () {
      return state
    }
  }
}

const singleton = factory()

export default singleton.get()
