import state from './state'
import {
  showCorrectVersion,
  getRandomInt } from '../helper'

const reset = document.querySelector('.answer__control--reset')
const harder = document.querySelector('.answer__control--harder')
const liveNodes = Array.from(document.querySelectorAll('.answer__container'))

// What: Responsible for manipulating the DOM.
// Why: Writes the modified text for the answer level.
function writeVersionToDOM (nodeArray, liveNodes) {
  return nodeArray.map((version, index) => {
    const section = version.map((content) => {
      return content.join(' ')
    })
    const currentLive = Array.from(liveNodes[index].firstElementChild.childNodes)

    return section.map((text, index) => {
      currentLive[index].textContent = text
      return currentLive[index]
    })
  })
}

// What: Takes array of innerHTML (with Node representations intact) and forms into array of DOM Nodes
// Why: Combined mode text contains spans of text that need to be "rehydrated" into their DOM form.
function textToNodes (textArray, liveNodes) {
  const nodes = textArray.map((version, index) => {
    const div = liveNodes[index].cloneNode(false)
    div.innerHTML = version
    return div
  })
  return nodes
}

// What: Takes DOM node and breaks into array of nodes.
// Why: In order to manipulate the text, each word should be broken down into an index in an array, with each level representing the DOM structure.
function nodesToArray (nodes) {
  const array = nodes
  .map(node => node.firstElementChild)
  .map(child => {
    return Array.from(child.childNodes).map(childNodes => childNodes.textContent.split(' '))
  })
  return array
}

// What: Call the correct functions to modify the text for increased / decreased difficulty in the answer.
// Why: suppport learning the answer.
function manageTextContent () {
  const structured = textToNodes(state.answers, liveNodes)
  const nodeArray = nodesToArray(structured)

  // Return the original text when the level is 0.
  if (state.answerLevel === 0) {
    return writeVersionToDOM(nodeArray, liveNodes)
  }

  // What: Map through all versions, modifying each.
  // Why: If the audience mode is switched while the text is modified, I want the new text to be modified as well.
  const modifiedContent = nodeArray.map(answer => replaceRandomWords(state.answerLevel, answer))

  // What: Finds unmodified content. Call with limits, as its possible to recursively exceed call stack.
  // Why: There's no point in modifying text that's already modified.
  function findUnmodified (content) {
    const index = getRandomInt(0, content.length)
    const word = content[index]

    if (word.includes('_')) {
      return findUnmodified(content)
    }

    return {
      word,
      index
    }
  }

  // What: Replace (semi)random words in an array of words.
  function replaceRandomWords (count, answer) {
    const modifiedContent = answer.map((content) => {
      const allModified = content.every(word => word.includes('–'))

      if (allModified) {
        return content
      } else {
        const unmodified = findUnmodified(content)

        content.splice(unmodified.index, 1, unmodified.word.replace(/./g, '–'))

        return content
      }
    })

    // Recursively call according to the count, or...
    if (count >= 1) {
      return replaceRandomWords(count - 1, answer)
      // ...just return the content.
    } else {
      return modifiedContent
    }
  }
  // Write the modified content to the DOM.
  return writeVersionToDOM(modifiedContent, liveNodes)
}

// What: Change the answer level, with boundaries to prevent calling the modification too many times.
// Why: Possible to overflow call stack with too many calls, and some logic is neede to scale the difficulty level.
function changeAnswerLevel (e) {
  const harder = this.matches('.answer__control--harder')
  let level = state.answerLevel

  if (harder) {
    level = level < 2 ? level += 1 : level
    level *= 2
  } else {
    level = 0
  }

  // Prevent stack overflow on needless button presses.
  if (level >= 128) {
    level = 128
  }

  state.answerLevel = level
  return manageTextContent()
}

// What: Set appropriate aria roles on elements for answer difficulty.
// Why: Support accessibility.
function setAriaActive () {
  liveNodes.map((version) => {
    if (version.matches('.answer__container:not(.is-hidden)')) {
      version.setAttribute('aria-live', 'assertive')
      version.setAttribute('aria-relevant', 'all')
    } else {
      version.removeAttribute('aria-live')
      version.removeAttribute('aria-relevant')
    }
  })
}

const answer = {
  updateState () {
    showCorrectVersion({
      list: liveNodes,
      prefix: 'answer__container--',
      correct: state.audienceMode
    })
    setAriaActive()
  },
  once () {
    reset.addEventListener('click', changeAnswerLevel)
    harder.addEventListener('click', changeAnswerLevel)

    // Set unmodified text into state. The text will always be unmodified on initial load.
    state.answers = liveNodes.map(node => node.innerHTML)
  }
}

export default answer
