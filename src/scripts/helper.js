// Will convert input to Number (or NaN), with polyfill.
// input: a string (other inputs will return NaN)
// radix: defaults to 10, but can be changed
export function convertToNumber (input, radix = 10) {
  // A quick polyfill for non-ECMAScript 2015 broswers.
  if (typeof Number.parseInt !== 'function') {
    Number.parseInt = parseInt
  }
  // Return Number or NaN
  return Number.parseInt(input, radix)
}

// React approved method to create innerHTML.
export function createMarkup (markup) {
  return {
    __html: markup
  }
}

// Basic function (straing from MDN) to get integer within range. Inclusive of min, exclusive of max.
export function getRandomInt (min = 0, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

// Create a DOM element, insert innerHTML (from JSON) and pull out innerText.
export function parseInnerText (html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.firstChild.innerText
}

// What: Function to show the correct version of content out of multiple versions of content.
// How: Take in an options object containing an array of elements, a class prefix, and the correct target class suffix. Set hidden (and class for IE9) on non-matching elements; remove on matching elements.
// Why: Where there are options for the content (a child version, an adult version, or a combined version), adult and child versions are hidden by default. State should be used to target the correct version (options.correct), which will reveal the desired version of content.
export function showCorrectVersion (options) {
  return options.list.map((item) => {
    if (item.classList.contains(`${options.prefix}${options.correct}`)) {
      item.hidden = false
      return item.classList.remove('is-hidden')
    } else {
      item.hidden = true
      return item.classList.add('is-hidden')
    }
  })
}

// What: Ensure DOM is ready for manipulation. >=IE9
// How: Document is ready now or will be ready once DOMContentLoaded event fires.
// Why: Prevent errors in calling JS before DOM is fully parsed.
export function ready (callback) {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

// Very specific leftpad.
export function leftPadString (num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}
