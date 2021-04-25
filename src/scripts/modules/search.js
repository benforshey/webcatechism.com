import state from './state'
import Fuse from 'fuse.js'
import searchData from '../../data/search-data.json'
import debounce from 'lodash.debounce'

const form = document.querySelector('.site__search')
const input = document.querySelector('.search__input')
const searchContainer = document.querySelector('.search__container')
const resultsContainer = document.querySelector('.search__results')
const ariaResults = document.querySelector('.search__aria-results')
// Favor Fuse over Lunr because of a large number of stop words in the catechism content. Also, smaller & faster on the surface.
const fuse = new Fuse(searchData, {
  caseSensitive: false,
  shouldSort: true,
  tokenize: true,
  maxPatternLength: 32,  // For efficiency. See docs. maxlength also set on input.
  keys: [
    { name: 'lesson', weight: 1 },
    { name: 'question', weight: 0.7 },
    { name: 'answer', weight: 0.5 }
  ]
})

// What: Render the results to the page.
// How: Using document fragments for efficiency, render each result into an article. Append the article to the document fragment. Clear our the old results (non-obtrusively through innerHTML) and append the entire results fragment to the DOM.
// Why: See results from search.
function renderResults (results, container) {
  const fragment = document.createDocumentFragment()
  // Subset of all 52 possible results. slice's end argument will go to array.length -1 if results are shorter than end argument.
  const resultsSlice = results.slice(0, 10)

  function determinePart (lesson) {
    if (lesson < 21) {
      return 1
    } else if (lesson < 36) {
      return 2
    } else {
      return 3
    }
  }

  resultsSlice.map((result, index) => {
    const article = document.createElement('article')
    article.className = 'results__search-result'
    article.setAttribute('role', 'option')
    article.setAttribute('tabindex', '-1')
    article.setAttribute('aria-selected', 'false')
    article.id = `result-${index}`
    article.dataset.lesson = result.lesson
    article.dataset.part = determinePart(result.lesson)
    article.innerHTML += (
      `<dl>
          <dt><h3 class="search-result__title">Lesson ${result.lesson}</h3></dt>
          <dd>
            <p class="search-result__question">${result.question}</p>
            <p class="search-result__answer">${result.answer}</p>
          </dd>
        </dl>`
    )
    // Directly append this result to the fragment.
    return fragment.appendChild(article)
  })
  // Clear out old results.
  container.innerHTML = ''
  // Add context to visually-hidden container. First container in ariaResults holds general instructions. With aria-atomic='true' and arai-relevant='text', the goal is to assert only the results each time, while asserting the instructions on focus.
  ariaResults.innerHTML = `<p>${resultsSlice.length} search results found.</p>`
  // There are results to be rendered.
  state.searchResults = true

  return container.appendChild(fragment)
}

// What: Handle the input of the search bar and associated components.
// Why: Enable search functionality.
function handleSearchInput (e) {
  const results = fuse.search(e.target.value.trim())

  if (e.target.value.trim() === '') {
    resultsContainer.setAttribute('aria-hidden', 'true')
    resultsContainer.removeAttribute('role')
    resultsContainer.classList.add('is-hidden')
    input.setAttribute('aria-expanded', 'false')
    return clearSearch()
  } else {
    resultsContainer.setAttribute('aria-hidden', 'false')
    resultsContainer.classList.remove('is-hidden')
    input.setAttribute('aria-expanded', 'true')
    return renderResults(results, resultsContainer)
  }
}

function clearSearch () {
  // Clear the search input (WebKit does this by default),...
  input.value = ''
  // ...remove the content,...
  resultsContainer.innerHTML = ''
  // ...remove the aria context,...
  ariaResults.innerHTML = ''
  input.removeAttribute('aria-activedescendant')
  // ...tag with an aria role,...
  resultsContainer.setAttribute('aria-hidden', 'true')
  // ...and hide the results div.
  resultsContainer.classList.add('is-hidden')
}

function handleKeyboardInput (e) {
  // Shim "escape/tab to clear search input" to all browsers and funcitonality to navigate search results.
  // If esacpe or tab is pressed as input into the search input...
  if (e.keyCode === 27 || e.keyCode === 9) {
    clearSearch()
  }

  // Down arrow key.
  if (e.keyCode === 40 && state.searchResults) {
    e.preventDefault()
    e.stopPropagation()

    // Reduces conditional repetition below.
    let current

    // Focused on search input and there's a first result.
    if (document.activeElement === input && resultsContainer.firstElementChild) {
      current = resultsContainer.firstElementChild
    // Not focused on search input and there's a next result.
    } else if (document.activeElement.nextElementSibling) {
      current = document.activeElement.nextElementSibling
    // Not focused on search input and there's not a next result.
    } else {
      current = resultsContainer.firstElementChild
    }

    // Reduces conditional repetition above.
    // note: Should futher reduce by refactoring into functions and command object.
    Array.from(resultsContainer.querySelectorAll('.results__search-result')).map(result => result.setAttribute('aria-selected', 'false'))
    current.setAttribute('aria-selected', 'true')
    current.focus()

    input.setAttribute('aria-activedescendant', `${current.id}`)
  }

  // Up arrow key.
  if (e.keyCode === 38 && state.searchResults) {
    e.preventDefault()
    e.stopPropagation()

    // Reduces conditional repetition below.
    let current

    // Focused on search input and there's a last result.
    if (document.activeElement === input && resultsContainer.lastElementChild) {
      current = resultsContainer.lastElementChild
    // Not focused on search input and there's a next result.
    } else if (document.activeElement.previousElementSibling) {
      current = document.activeElement.previousElementSibling
    // Not focused on search input and there's not a next result.
    } else {
      current = resultsContainer.lastElementChild
    }

    // Reduces conditional repetition above.
    // note: Should futher reduce by refactoring into functions and command object.
    Array.from(resultsContainer.querySelectorAll('.results__search-result')).map(result => result.setAttribute('aria-selected', 'false'))
    current.setAttribute('aria-selected', 'true')
    current.focus()
    input.setAttribute('aria-activedescendant', `${current.id}`)
  }

  // Enter / Return
  if (e.keyCode === 13 && state.searchResults) {
  // The activeElement is one of the results (an article).
    if (document.activeElement.nodeName === 'ARTICLE') {
      // Go to the lesson that was actioned upon.
      window.location.href = `/lesson/${document.activeElement.dataset.lesson}/`
    }
  }
}

function easyClose (e) {
  const withinInput = searchContainer.contains(e.target)
  const withinResults = resultsContainer.contains(e.target)

  // Don't close the form if clicking on the results container.
  if (withinResults) {
    return
  }

  // Clicking outside of the input, if there are results, clear them.
  if (!withinInput && state.searchResults === true) {
    return clearSearch()
  }
}

const search = {
  updateState () {

  },
  once () {
    // Debounce the search to prevent too much strain on devices with less processing power.
    input.addEventListener('input', debounce(handleSearchInput, 250))

    window.addEventListener('keydown', handleKeyboardInput)

    resultsContainer.addEventListener('click', function () {
      if (document.activeElement.nodeName === 'ARTICLE') {
        // Go to the lesson that was actioned upon.
        window.location.href = `/lesson/${document.activeElement.dataset.lesson}/`
      }
    })

    document.addEventListener('click', easyClose)

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }
}

export default search
