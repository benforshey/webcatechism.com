/* global ga */
'use strict'

import './modules/style'
import { ready, convertToNumber } from './helper'
import state from './modules/state'
import search from './modules/search'
import settings from './modules/settings'
import answer from './modules/answer'
import song from './modules/song'
import welcome from './modules/welcome'
import questionList from './modules/question-list.js'
import initScripture from './modules/scripture'
import initCommentary from './modules/commentary'
import video from './modules/video'
import initPrayer from './modules/prayer'
import footer from './modules/footer'

// Google Analytics Snippet.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

function init () {
  // What follows is the call stack that is relevant to state change from the settings menu. Custom event is defined in settings. More complex components have two methods: one to be called only once (event listeners that would compound) and one to be called to update the state.
  function statefulUpdate () {
    // Stateful Lessons Page
    if (/^\/lesson\/[0-9]{2}\/$/.test(window.location.pathname)) {
      answer.updateState()
      initScripture()
      initCommentary()
      song.updateState()
      video.updateState()
      initPrayer()
    }

    // Stateful Home Page
    if (/^\/$/.test(window.location.pathname)) {
      welcome.updateState()
    }

    // If the documentation has been visited and no lessons have been visited, recommend the first lesson.
    if (/^\/documentation\//.test(window.location.pathname)) {
      if (convertToNumber(state.currentLesson) === 0) {
        state.currentLesson = 1
        return window.localStorage.setItem('currentLesson', state.currentLesson)
      }
    }

    // Stateful Global.
    settings.updateState()
    search.updateState()
    footer.updateState()
  }

  // Once Global. Event listeners would compound if called multiple times on state change.
  settings.once()
  search.once()

  // Once Lessons Page
  if (/^\/lesson\/[0-9]{2}\/$/.test(window.location.pathname)) {
    answer.once()
    song.once()
  }

  // Once Home Page
  if (/^\/$/.test(window.location.pathname)) {
    welcome.once()
    questionList.once()
  }

  // Most of the stateful settings need to be updated initially (here) and...
  statefulUpdate()
  // ...when the custom event fires (here).
  document.body.addEventListener('stateChange', statefulUpdate, true)

  // Register the ServiceWorker.
  if ('serviceWorker' in navigator) {
    // The service worker cannot access parent directories (apart from explicity setting scope), so keep it in the root directory.
    navigator.serviceWorker.register('/serviceWorker.js').then(function (registration) {
      console.info(`ServiceWorker registration successful with scope: ${registration.scope}`)
    }).catch(function (e) {
      console.error(`ServiceWorker registration failed: ${e}`)
    })
  }

  // Call Google Analytics.
  ga('create', 'UA-85805713-2', 'auto')
  ga('send', 'pageview')

  console.log(state)
}

ready(init)
