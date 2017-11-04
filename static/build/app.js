/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// What: Factory (returns object) to hold state. Use closure (expression defined inside function, exposed by returning or passing) to give privileged access to state variable.
// Why: Simple implementation of global state.
function factory() {
  // Read persistent defaults from last session, if any. Set with good defaults on first load.
  var state = {
    answerLevel: 0,
    audienceMode: window.localStorage.getItem('audienceMode') || 'combined',
    currentLesson: window.localStorage.getItem('currentLesson') || 0,
    keyboardNav: window.localStorage.getItem('keyboardNav') || 'on',
    loopSong: false,
    menuIsOpen: false,
    searchResults: false,
    scriptureMode: window.localStorage.getItem('scriptureMode') || 'ESV',
    welcomeMessage: window.localStorage.getItem('welcomeMessage') || 'show'
  };

  return {
    get: function get() {
      return state;
    }
  };
}

var singleton = factory();

exports.default = singleton.get();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToNumber = convertToNumber;
exports.createMarkup = createMarkup;
exports.getRandomInt = getRandomInt;
exports.parseInnerText = parseInnerText;
exports.showCorrectVersion = showCorrectVersion;
exports.ready = ready;
exports.leftPadString = leftPadString;
// Will convert input to Number (or NaN), with polyfill.
// input: a string (other inputs will return NaN)
// radix: defaults to 10, but can be changed
function convertToNumber(input) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  // A quick polyfill for non-ECMAScript 2015 broswers.
  if (typeof Number.parseInt !== 'function') {
    Number.parseInt = parseInt;
  }
  // Return Number or NaN
  return Number.parseInt(input, radix);
}

// React approved method to create innerHTML.
function createMarkup(markup) {
  return {
    __html: markup
  };
}

// Basic function (straing from MDN) to get integer within range. Inclusive of min, exclusive of max.
function getRandomInt() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments[1];

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create a DOM element, insert innerHTML (from JSON) and pull out innerText.
function parseInnerText(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild.innerText;
}

// What: Function to show the correct version of content out of multiple versions of content.
// How: Take in an options object containing an array of elements, a class prefix, and the correct target class suffix. Set hidden (and class for IE9) on non-matching elements; remove on matching elements.
// Why: Where there are options for the content (a child version, an adult version, or a combined version), adult and child versions are hidden by default. State should be used to target the correct version (options.correct), which will reveal the desired version of content.
function showCorrectVersion(options) {
  return options.list.map(function (item) {
    if (item.classList.contains('' + options.prefix + options.correct)) {
      item.hidden = false;
      return item.classList.remove('is-hidden');
    } else {
      item.hidden = true;
      return item.classList.add('is-hidden');
    }
  });
}

// What: Ensure DOM is ready for manipulation. >=IE9
// How: Document is ready now or will be ready once DOMContentLoaded event fires.
// Why: Prevent errors in calling JS before DOM is fully parsed.
function ready(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

// Very specific leftpad.
function leftPadString(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return '' + num;
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global ga */


__webpack_require__(3);

var _helper = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _search = __webpack_require__(23);

var _search2 = _interopRequireDefault(_search);

var _settings = __webpack_require__(28);

var _settings2 = _interopRequireDefault(_settings);

var _answer = __webpack_require__(29);

var _answer2 = _interopRequireDefault(_answer);

var _song = __webpack_require__(30);

var _song2 = _interopRequireDefault(_song);

var _welcome = __webpack_require__(31);

var _welcome2 = _interopRequireDefault(_welcome);

var _questionList = __webpack_require__(32);

var _questionList2 = _interopRequireDefault(_questionList);

var _scripture = __webpack_require__(33);

var _scripture2 = _interopRequireDefault(_scripture);

var _commentary = __webpack_require__(34);

var _commentary2 = _interopRequireDefault(_commentary);

var _video = __webpack_require__(35);

var _video2 = _interopRequireDefault(_video);

var _prayer = __webpack_require__(36);

var _prayer2 = _interopRequireDefault(_prayer);

var _footer = __webpack_require__(37);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Google Analytics Snippet.
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

function init() {
  // What follows is the call stack that is relevant to state change from the settings menu. Custom event is defined in settings. More complex components have two methods: one to be called only once (event listeners that would compound) and one to be called to update the state.
  function statefulUpdate() {
    // Stateful Lessons Page
    if (/^\/lesson\/[0-9]{2}\/$/.test(window.location.pathname)) {
      _answer2.default.updateState();
      (0, _scripture2.default)();
      (0, _commentary2.default)();
      _song2.default.updateState();
      _video2.default.updateState();
      (0, _prayer2.default)();
    }

    // Stateful Home Page
    if (/^\/$/.test(window.location.pathname)) {
      _welcome2.default.updateState();
    }

    // If the documentation has been visited and no lessons have been visited, recommend the first lesson.
    if (/^\/documentation\//.test(window.location.pathname)) {
      if ((0, _helper.convertToNumber)(_state2.default.currentLesson) === 0) {
        _state2.default.currentLesson = 1;
        return window.localStorage.setItem('currentLesson', _state2.default.currentLesson);
      }
    }

    // Stateful Global.
    _settings2.default.updateState();
    _search2.default.updateState();
    _footer2.default.updateState();
  }

  // Once Global. Event listeners would compound if called multiple times on state change.
  _settings2.default.once();
  _search2.default.once();

  // Once Lessons Page
  if (/^\/lesson\/[0-9]{2}\/$/.test(window.location.pathname)) {
    _answer2.default.once();
    _song2.default.once();
  }

  // Once Home Page
  if (/^\/$/.test(window.location.pathname)) {
    _welcome2.default.once();
    _questionList2.default.once();
  }

  // Most of the stateful settings need to be updated initially (here) and...
  statefulUpdate();
  // ...when the custom event fires (here).
  document.body.addEventListener('stateChange', statefulUpdate, true);

  // Register the ServiceWorker.
  if ('serviceWorker' in navigator) {
    // The service worker cannot access parent directories (apart from explicity setting scope), so keep it in the root directory.
    navigator.serviceWorker.register('/serviceWorker.js').then(function (registration) {
      console.info('ServiceWorker registration successful with scope: ' + registration.scope);
    }).catch(function (e) {
      console.error('ServiceWorker registration failed: ' + e);
    });
  }

  // Call Google Analytics.
  ga('create', 'UA-85805713-2', 'auto');
  ga('send', 'pageview');

  console.log(_state2.default);
}

(0, _helper.ready)(init);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _fuse = __webpack_require__(24);

var _fuse2 = _interopRequireDefault(_fuse);

var _searchData = __webpack_require__(25);

var _searchData2 = _interopRequireDefault(_searchData);

var _lodash = __webpack_require__(26);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = document.querySelector('.site__search');
var input = document.querySelector('.search__input');
var searchContainer = document.querySelector('.search__container');
var resultsContainer = document.querySelector('.search__results');
var ariaResults = document.querySelector('.search__aria-results');
// Favor Fuse over Lunr because of a large number of stop words in the catechism content. Also, smaller & faster on the surface.
var fuse = new _fuse2.default(_searchData2.default, {
  caseSensitive: false,
  shouldSort: true,
  tokenize: true,
  maxPatternLength: 32, // For efficiency. See docs. maxlength also set on input.
  keys: [{ name: 'lesson', weight: 1 }, { name: 'question', weight: 0.7 }, { name: 'answer', weight: 0.5 }]
});

// What: Render the results to the page.
// How: Using document fragments for efficiency, render each result into an article. Append the article to the document fragment. Clear our the old results (non-obtrusively through innerHTML) and append the entire results fragment to the DOM.
// Why: See results from search.
function renderResults(results, container) {
  var fragment = document.createDocumentFragment();
  // Subset of all 52 possible results. slice's end argument will go to array.length -1 if results are shorter than end argument.
  var resultsSlice = results.slice(0, 10);

  function determinePart(lesson) {
    if (lesson < 21) {
      return 1;
    } else if (lesson < 36) {
      return 2;
    } else {
      return 3;
    }
  }

  resultsSlice.map(function (result, index) {
    var article = document.createElement('article');
    article.className = 'results__search-result';
    article.setAttribute('role', 'option');
    article.setAttribute('tabindex', '-1');
    article.setAttribute('aria-selected', 'false');
    article.id = 'result-' + index;
    article.dataset.lesson = result.lesson;
    article.dataset.part = determinePart(result.lesson);
    article.innerHTML += '<dl>\n          <dt><h3 class="search-result__title">Lesson ' + result.lesson + '</h3></dt>\n          <dd>\n            <p class="search-result__question">' + result.question + '</p>\n            <p class="search-result__answer">' + result.answer + '</p>\n          </dd>\n        </dl>';
    // Directly append this result to the fragment.
    return fragment.appendChild(article);
  });
  // Clear out old results.
  container.innerHTML = '';
  // Add context to visually-hidden container. First container in ariaResults holds general instructions. With aria-atomic='true' and arai-relevant='text', the goal is to assert only the results each time, while asserting the instructions on focus.
  ariaResults.innerHTML = '<p>' + resultsSlice.length + ' search results found.</p>';
  // There are results to be rendered.
  _state2.default.searchResults = true;

  return container.appendChild(fragment);
}

// What: Handle the input of the search bar and associated components.
// Why: Enable search functionality.
function handleSearchInput(e) {
  var results = fuse.search(e.target.value.trim());

  if (e.target.value.trim() === '') {
    resultsContainer.setAttribute('aria-hidden', 'true');
    resultsContainer.removeAttribute('role');
    resultsContainer.classList.add('is-hidden');
    input.setAttribute('aria-expanded', 'false');
    return clearSearch();
  } else {
    resultsContainer.setAttribute('aria-hidden', 'false');
    resultsContainer.classList.remove('is-hidden');
    input.setAttribute('aria-expanded', 'true');
    return renderResults(results, resultsContainer);
  }
}

function clearSearch() {
  // Clear the search input (WebKit does this by default),...
  input.value = '';
  // ...remove the content,...
  resultsContainer.innerHTML = '';
  // ...remove the aria context,...
  ariaResults.innerHTML = '';
  input.removeAttribute('aria-activedescendant');
  // ...tag with an aria role,...
  resultsContainer.setAttribute('aria-hidden', 'true');
  // ...and hide the results div.
  resultsContainer.classList.add('is-hidden');
}

function handleKeyboardInput(e) {
  // Shim "escape/tab to clear search input" to all browsers and funcitonality to navigate search results.
  // If esacpe or tab is pressed as input into the search input...
  if (e.keyCode === 27 || e.keyCode === 9) {
    clearSearch();
  }

  // Down arrow key.
  if (e.keyCode === 40 && _state2.default.searchResults) {
    e.preventDefault();
    e.stopPropagation();

    // Reduces conditional repetition below.
    var current = void 0;

    // Focused on search input and there's a first result.
    if (document.activeElement === input && resultsContainer.firstElementChild) {
      current = resultsContainer.firstElementChild;
      // Not focused on search input and there's a next result.
    } else if (document.activeElement.nextElementSibling) {
      current = document.activeElement.nextElementSibling;
      // Not focused on search input and there's not a next result.
    } else {
      current = resultsContainer.firstElementChild;
    }

    // Reduces conditional repetition above.
    // note: Should futher reduce by refactoring into functions and command object.
    Array.from(resultsContainer.querySelectorAll('.results__search-result')).map(function (result) {
      return result.setAttribute('aria-selected', 'false');
    });
    current.setAttribute('aria-selected', 'true');
    current.focus();

    input.setAttribute('aria-activedescendant', '' + current.id);
  }

  // Up arrow key.
  if (e.keyCode === 38 && _state2.default.searchResults) {
    e.preventDefault();
    e.stopPropagation();

    // Reduces conditional repetition below.
    var _current = void 0;

    // Focused on search input and there's a last result.
    if (document.activeElement === input && resultsContainer.lastElementChild) {
      _current = resultsContainer.lastElementChild;
      // Not focused on search input and there's a next result.
    } else if (document.activeElement.previousElementSibling) {
      _current = document.activeElement.previousElementSibling;
      // Not focused on search input and there's not a next result.
    } else {
      _current = resultsContainer.lastElementChild;
    }

    // Reduces conditional repetition above.
    // note: Should futher reduce by refactoring into functions and command object.
    Array.from(resultsContainer.querySelectorAll('.results__search-result')).map(function (result) {
      return result.setAttribute('aria-selected', 'false');
    });
    _current.setAttribute('aria-selected', 'true');
    _current.focus();
    input.setAttribute('aria-activedescendant', '' + _current.id);
  }

  // Enter / Return
  if (e.keyCode === 13 && _state2.default.searchResults) {
    // The activeElement is one of the results (an article).
    if (document.activeElement.nodeName === 'ARTICLE') {
      // Go to the lesson that was actioned upon.
      window.location.href = '/lesson/' + document.activeElement.dataset.lesson + '/';
    }
  }
}

function easyClose(e) {
  var withinInput = searchContainer.contains(e.target);
  var withinResults = resultsContainer.contains(e.target);

  // Don't close the form if clicking on the results container.
  if (withinResults) {
    return;
  }

  // Clicking outside of the input, if there are results, clear them.
  if (!withinInput && _state2.default.searchResults === true) {
    return clearSearch();
  }
}

var search = {
  updateState: function updateState() {},
  once: function once() {
    // Debounce the search to prevent too much strain on devices with less processing power.
    input.addEventListener('input', (0, _lodash2.default)(handleSearchInput, 250));

    window.addEventListener('keydown', handleKeyboardInput);

    resultsContainer.addEventListener('click', function () {
      if (document.activeElement.nodeName === 'ARTICLE') {
        // Go to the lesson that was actioned upon.
        window.location.href = '/lesson/' + document.activeElement.dataset.lesson + '/';
      }
    });

    document.addEventListener('click', easyClose);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

exports.default = search;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.2.0 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fuse", [], factory);
	else if(typeof exports === 'object')
		exports["Fuse"] = factory();
	else
		root["Fuse"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitapRegexSearch = __webpack_require__(5);
var bitapSearch = __webpack_require__(7);
var patternAlphabet = __webpack_require__(4);

var Bitap = function () {
  function Bitap(pattern, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$isCaseSensitive = _ref.isCaseSensitive,
        isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

    _classCallCheck(this, Bitap);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: isCaseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength
    };

    this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern);
    }
  }

  _createClass(Bitap, [{
    key: 'search',
    value: function search(text) {
      if (!this.options.isCaseSensitive) {
        text = text.toLowerCase();
      }

      // Exact match
      if (this.pattern === text) {
        return {
          isMatch: true,
          score: 0,
          matchedIndices: [[0, text.length - 1]]
        };
      }

      // When pattern length is greater than the machine word length, just do a a regex comparison
      var _options = this.options,
          maxPatternLength = _options.maxPatternLength,
          tokenSeparator = _options.tokenSeparator;

      if (this.pattern.length > maxPatternLength) {
        return bitapRegexSearch(text, this.pattern, tokenSeparator);
      }

      // Otherwise, use Bitap algorithm
      var _options2 = this.options,
          location = _options2.location,
          distance = _options2.distance,
          threshold = _options2.threshold,
          findAllMatches = _options2.findAllMatches,
          minMatchCharLength = _options2.minMatchCharLength;

      return bitapSearch(text, this.pattern, this.patternAlphabet, {
        location: location,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength
      });
    }
  }]);

  return Bitap;
}();

// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)

module.exports = Bitap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

var deepValue = function deepValue(obj, path, list) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    var dotIndex = path.indexOf('.');
    var firstSegment = path;
    var remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    var value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value.toString());
      } else if (isArray(value)) {
        // Search each item in the array.
        for (var i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
};

module.exports = function (obj, path) {
  return deepValue(obj, path, []);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var matchedIndices = [];
  var start = -1;
  var end = -1;
  var i = 0;

  for (var len = matchmask.length; i < len; i += 1) {
    var match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    matchedIndices.push([start, i - 1]);
  }

  return matchedIndices;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern) {
  var mask = {};
  var len = pattern.length;

  for (var i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0;
  }

  for (var _i = 0; _i < len; _i += 1) {
    mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
  }

  return mask;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

module.exports = function (text, pattern) {
  var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

  var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
  var matches = text.match(regex);
  var isMatch = !!matches;
  var matchedIndices = [];

  if (isMatch) {
    for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
      var match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length - 1]);
    }
  }

  return {
    // TODO: revisit this score
    score: isMatch ? 0.5 : 1,
    isMatch: isMatch,
    matchedIndices: matchedIndices
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern, _ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === undefined ? 0 : _ref$errors,
      _ref$currentLocation = _ref.currentLocation,
      currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
      _ref$expectedLocation = _ref.expectedLocation,
      expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance;

  var accuracy = errors / pattern.length;
  var proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / distance;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bitapScore = __webpack_require__(6);
var matchedIndices = __webpack_require__(3);

module.exports = function (text, pattern, patternAlphabet, _ref) {
  var _ref$location = _ref.location,
      location = _ref$location === undefined ? 0 : _ref$location,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
      _ref$findAllMatches = _ref.findAllMatches,
      findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
      _ref$minMatchCharLeng = _ref.minMatchCharLength,
      minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

  var expectedLocation = location;
  // Set starting location at beginning text and initialize the alphabet.
  var textLen = text.length;
  // Highest score beyond which we give up.
  var currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  var bestLocation = text.indexOf(pattern, expectedLocation);

  var patternLen = pattern.length;

  // a mask of the matches
  var matchMask = [];
  for (var i = 0; i < textLen; i += 1) {
    matchMask[i] = 0;
  }

  if (bestLocation !== -1) {
    var score = bitapScore(pattern, {
      errors: 0,
      currentLocation: bestLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });
    currentThreshold = Math.min(score, currentThreshold);

    // What about in the other direction? (speed up)
    bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

    if (bestLocation !== -1) {
      var _score = bitapScore(pattern, {
        errors: 0,
        currentLocation: bestLocation,
        expectedLocation: expectedLocation,
        distance: distance
      });
      currentThreshold = Math.min(_score, currentThreshold);
    }
  }

  // Reset the best location
  bestLocation = -1;

  var lastBitArr = [];
  var finalScore = 1;
  var binMax = patternLen + textLen;

  var mask = 1 << patternLen - 1;

  for (var _i = 0; _i < patternLen; _i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    var binMin = 0;
    var binMid = binMax;

    while (binMin < binMid) {
      var _score3 = bitapScore(pattern, {
        errors: _i,
        currentLocation: expectedLocation + binMid,
        expectedLocation: expectedLocation,
        distance: distance
      });

      if (_score3 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    var start = Math.max(1, expectedLocation - binMid + 1);
    var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    var bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << _i) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var currentLocation = j - 1;
      var charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (charMatch) {
        matchMask[currentLocation] = 1;
      }

      // First pass: exact match
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (_i !== 0) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = bitapScore(pattern, {
          errors: _i,
          currentLocation: currentLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break;
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    var _score2 = bitapScore(pattern, {
      errors: _i + 1,
      currentLocation: expectedLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });

    if (_score2 > currentThreshold) {
      break;
    }

    lastBitArr = bitArr;
  }

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitap = __webpack_require__(1);
var deepValue = __webpack_require__(2);
var isArray = __webpack_require__(0);

var Fuse = function () {
  function Fuse(list, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$caseSensitive = _ref.caseSensitive,
        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? null : _ref$id,
        _ref$keys = _ref.keys,
        keys = _ref$keys === undefined ? [] : _ref$keys,
        _ref$shouldSort = _ref.shouldSort,
        shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
        _ref$getFn = _ref.getFn,
        getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
        _ref$sortFn = _ref.sortFn,
        sortFn = _ref$sortFn === undefined ? function (a, b) {
      return a.score - b.score;
    } : _ref$sortFn,
        _ref$tokenize = _ref.tokenize,
        tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
        _ref$matchAllTokens = _ref.matchAllTokens,
        matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    _classCallCheck(this, Fuse);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: caseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      id: id,
      keys: keys,
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      getFn: getFn,
      sortFn: sortFn,
      verbose: verbose,
      tokenize: tokenize,
      matchAllTokens: matchAllTokens
    };

    this.setCollection(list);
  }

  _createClass(Fuse, [{
    key: 'setCollection',
    value: function setCollection(list) {
      this.list = list;
      return list;
    }
  }, {
    key: 'search',
    value: function search(pattern) {
      this._log('---------\nSearch pattern: "' + pattern + '"');

      var _prepareSearchers2 = this._prepareSearchers(pattern),
          tokenSearchers = _prepareSearchers2.tokenSearchers,
          fullSearcher = _prepareSearchers2.fullSearcher;

      var _search2 = this._search(tokenSearchers, fullSearcher),
          weights = _search2.weights,
          results = _search2.results;

      this._computeScore(weights, results);

      if (this.options.shouldSort) {
        this._sort(results);
      }

      return this._format(results);
    }
  }, {
    key: '_prepareSearchers',
    value: function _prepareSearchers() {
      var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var tokenSearchers = [];

      if (this.options.tokenize) {
        // Tokenize on the separator
        var tokens = pattern.split(this.options.tokenSeparator);
        for (var i = 0, len = tokens.length; i < len; i += 1) {
          tokenSearchers.push(new Bitap(tokens[i], this.options));
        }
      }

      var fullSearcher = new Bitap(pattern, this.options);

      return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
    }
  }, {
    key: '_search',
    value: function _search() {
      var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fullSearcher = arguments[1];

      var list = this.list;
      var resultMap = {};
      var results = [];

      // Check the first item in the list, if it's a string, then we assume
      // that every item in the list is also a string, and thus it's a flattened array.
      if (typeof list[0] === 'string') {
        // Iterate over every item
        for (var i = 0, len = list.length; i < len; i += 1) {
          this._analyze({
            key: '',
            value: list[i],
            record: i,
            index: i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }

        return { weights: null, results: results };
      }

      // Otherwise, the first item is an Object (hopefully), and thus the searching
      // is done on the values of the keys of each item.
      var weights = {};
      for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
        var item = list[_i];
        // Iterate over every key
        for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
          var key = this.options.keys[j];
          if (typeof key !== 'string') {
            weights[key.name] = {
              weight: 1 - key.weight || 1
            };
            if (key.weight <= 0 || key.weight > 1) {
              throw new Error('Key weight has to be > 0 and <= 1');
            }
            key = key.name;
          } else {
            weights[key] = {
              weight: 1
            };
          }

          this._analyze({
            key: key,
            value: this.options.getFn(item, key),
            record: item,
            index: _i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }

      return { weights: weights, results: results };
    }
  }, {
    key: '_analyze',
    value: function _analyze(_ref2, _ref3) {
      var key = _ref2.key,
          _ref2$arrayIndex = _ref2.arrayIndex,
          arrayIndex = _ref2$arrayIndex === undefined ? -1 : _ref2$arrayIndex,
          value = _ref2.value,
          record = _ref2.record,
          index = _ref2.index;
      var _ref3$tokenSearchers = _ref3.tokenSearchers,
          tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
          _ref3$fullSearcher = _ref3.fullSearcher,
          fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
          _ref3$resultMap = _ref3.resultMap,
          resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
          _ref3$results = _ref3.results,
          results = _ref3$results === undefined ? [] : _ref3$results;

      // Check if the texvaluet can be searched
      if (value === undefined || value === null) {
        return;
      }

      var exists = false;
      var averageScore = -1;
      var numTextMatches = 0;

      if (typeof value === 'string') {
        this._log('\nKey: ' + (key === '' ? '-' : key));

        var mainSearchResult = fullSearcher.search(value);
        this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

        if (this.options.tokenize) {
          var words = value.split(this.options.tokenSeparator);
          var scores = [];

          for (var i = 0; i < tokenSearchers.length; i += 1) {
            var tokenSearcher = tokenSearchers[i];

            this._log('\nPattern: "' + tokenSearcher.pattern + '"');

            // let tokenScores = []
            var hasMatchInText = false;

            for (var j = 0; j < words.length; j += 1) {
              var word = words[j];
              var tokenSearchResult = tokenSearcher.search(word);
              var obj = {};
              if (tokenSearchResult.isMatch) {
                obj[word] = tokenSearchResult.score;
                exists = true;
                hasMatchInText = true;
                scores.push(tokenSearchResult.score);
              } else {
                obj[word] = 1;
                if (!this.options.matchAllTokens) {
                  scores.push(1);
                }
              }
              this._log('Token: "' + word + '", score: ' + obj[word]);
              // tokenScores.push(obj)
            }

            if (hasMatchInText) {
              numTextMatches += 1;
            }
          }

          averageScore = scores[0];
          var scoresLen = scores.length;
          for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
            averageScore += scores[_i2];
          }
          averageScore = averageScore / scoresLen;

          this._log('Token score average:', averageScore);
        }

        var finalScore = mainSearchResult.score;
        if (averageScore > -1) {
          finalScore = (finalScore + averageScore) / 2;
        }

        this._log('Score average:', finalScore);

        var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

        this._log('\nCheck Matches: ' + checkTextMatches);

        // If a match is found, add the item to <rawResults>, including its score
        if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
          // Check if the item already exists in our results
          var existingResult = resultMap[index];
          if (existingResult) {
            // Use the lowest score
            // existingResult.score, bitapResult.score
            existingResult.output.push({
              key: key,
              arrayIndex: arrayIndex,
              value: value,
              score: finalScore,
              matchedIndices: mainSearchResult.matchedIndices
            });
          } else {
            // Add it to the raw result list
            resultMap[index] = {
              item: record,
              output: [{
                key: key,
                arrayIndex: arrayIndex,
                value: value,
                score: finalScore,
                matchedIndices: mainSearchResult.matchedIndices
              }]
            };

            results.push(resultMap[index]);
          }
        }
      } else if (isArray(value)) {
        for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
          this._analyze({
            key: key,
            arrayIndex: _i3,
            value: value[_i3],
            record: record,
            index: index
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }
    }
  }, {
    key: '_computeScore',
    value: function _computeScore(weights, results) {
      this._log('\n\nComputing score:\n');

      for (var i = 0, len = results.length; i < len; i += 1) {
        var output = results[i].output;
        var scoreLen = output.length;

        var totalScore = 0;
        var bestScore = 1;

        for (var j = 0; j < scoreLen; j += 1) {
          var weight = weights ? weights[output[j].key].weight : 1;
          var score = weight === 1 ? output[j].score : output[j].score || 0.001;
          var nScore = score * weight;

          if (weight !== 1) {
            bestScore = Math.min(bestScore, nScore);
          } else {
            output[j].nScore = nScore;
            totalScore += nScore;
          }
        }

        results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

        this._log(results[i]);
      }
    }
  }, {
    key: '_sort',
    value: function _sort(results) {
      this._log('\n\nSorting....');
      results.sort(this.options.sortFn);
    }
  }, {
    key: '_format',
    value: function _format(results) {
      var finalOutput = [];

      this._log('\n\nOutput:\n\n', JSON.stringify(results));

      var transformers = [];

      if (this.options.includeMatches) {
        transformers.push(function (result, data) {
          var output = result.output;
          data.matches = [];

          for (var i = 0, len = output.length; i < len; i += 1) {
            var item = output[i];

            if (item.matchedIndices.length === 0) {
              continue;
            }

            var obj = {
              indices: item.matchedIndices,
              value: item.value
            };
            if (item.key) {
              obj.key = item.key;
            }
            if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
              obj.arrayIndex = item.arrayIndex;
            }
            data.matches.push(obj);
          }
        });
      }

      if (this.options.includeScore) {
        transformers.push(function (result, data) {
          data.score = result.score;
        });
      }

      for (var i = 0, len = results.length; i < len; i += 1) {
        var result = results[i];

        if (this.options.id) {
          result.item = this.options.getFn(result.item, this.options.id)[0];
        }

        if (!transformers.length) {
          finalOutput.push(result.item);
          continue;
        }

        var data = {
          item: result.item
        };

        for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
          transformers[j](result, data);
        }

        finalOutput.push(data);
      }

      return finalOutput;
    }
  }, {
    key: '_log',
    value: function _log() {
      if (this.options.verbose) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }]);

  return Fuse;
}();

module.exports = Fuse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fuse.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = [{"lesson":"01","question":"What is our only hope in life and death?","answer":"That we are not our own but belong, body and soul, both in life and death, to God and to our Savior Jesus Christ."},{"lesson":"02","question":"What is God?","answer":"God is the creator and sustainer of everyone and everything. He is eternal, infinite, and unchangeable in his power and perfection, goodness and glory, wisdom, justice, and truth. Nothing happens except through him and by his will."},{"lesson":"03","question":"How many persons are there in God?","answer":"There are three persons in the one true and living God: the Father, the Son, and the Holy Spirit. They are the same in substance, equal in power and glory."},{"lesson":"04","question":"How and why did God create us?","answer":"God created us male and female in his own image to know him, love him, live with him, and glorify him. And it is right that we who were created by God should live to his glory."},{"lesson":"05","question":"What else did God create?","answer":"God created all things by his powerful Word, and all his creation was very good; everything flourished under his loving rule."},{"lesson":"06","question":"How can we glorify God?","answer":"We glorify God by  enjoying him, loving him, trusting him, and by obeying his will, commands, and law."},{"lesson":"07","question":"What does the law of God require?","answer":"Personal, perfect, and perpetual obedience; that we love God with all our heart, soul, mind, and strength; and love our neighbor as ourselves. What God forbids should never be done and what God commands should always be done."},{"lesson":"08","question":"What is the law of God stated in the Ten Commandments?","answer":"You shall have no other gods before me. You shall not make for yourself an idol in the form of anything in heaven above or on the earth beneath or in the waters below—you shall not bow down to them or worship them. You shall not misuse the name of the LORD your God. Remember the Sabbath day by keeping it holy. Honor your father and your mother. You shall not murder. You shall not commit adultery. You shall not steal. You shall not give false testimony. You shall not covet."},{"lesson":"09","question":"What does God require in the first, second, and third commandments?","answer":"First, that we know and trust God as the only true and living God. Second, that we avoid all idolatry and do not worship God improperly. Third, that we treat God’s name with fear and reverence, honoring also his Word and works."},{"lesson":"10","question":"What does God require in the fourth and fifth commandments?","answer":"Fourth, that on the Sabbath day we spend time in public and private worship of God, rest from routine employment, serve the Lord and others, and so anticipate the eternal Sabbath. Fifth, that we love and honor our father and our mother, submitting to their godly discipline and direction."},{"lesson":"11","question":"What does God require in the sixth, seventh, and eighth commandments?","answer":"Sixth, that we do not hurt, or hate, or be hostile to our neighbor, but be patient and peaceful, pursuing even our enemies with love. Seventh, that we abstain from sexual immorality and live purely and faithfully, whether in marriage or in single life, avoiding all impure actions, looks, words, thoughts, or desires, and whatever might lead to them. Eighth, that we do not take without permission that which belongs to someone else, nor withhold any good from someone we might benefit."},{"lesson":"12","question":"What does God require in the ninth and tenth commandments?","answer":"Ninth, that we do not lie or deceive, but speak the truth in love. Tenth, that we are content, not envying anyone or resenting what God has given them or us."},{"lesson":"13","question":"Can anyone keep the law of God perfectly?","answer":"Since the fall, no mere human has been able to keep the law of God perfectly, but consistently breaks it in thought, word, and deed."},{"lesson":"14","question":"Did God create us unable to keep his law?","answer":"No, but because of the disobedience of our first parents, Adam and Eve, all of creation is fallen; we are all born in sin and guilt, corrupt in our nature and unable to keep God’s law."},{"lesson":"15","question":"Since no one can keep the law, what is its purpose?","answer":"That we may know the holy nature and will of God, and the sinful nature and disobedience of our hearts; and thus our need of a Savior. The law also teaches and exhorts us to live a life worthy of our Savior."},{"lesson":"16","question":"What is sin?","answer":"Sin is rejecting or ignoring God in the world he created, rebelling against him by living without reference to him, not being or doing what he requires in his law—resulting in our death and the disintegration of all creation."},{"lesson":"17","question":"What is idolatry?","answer":"Idolatry is trusting in created things rather than the Creator for our hope and happiness, significance and security."},{"lesson":"18","question":"Will God allow our disobedience and idolatry to go unpunished?","answer":"No, every sin is against the sovereignty, holiness, and goodness of God, and against his righteous law, and God is righteously angry with our sins and will punish them in his just judgment both in this life, and in the life to come."},{"lesson":"19","question":"Is there any way to escape punishment and be brought back into God’s favor?","answer":"Yes, to satisfy his justice, God himself, out of mere mercy, reconciles us to himself and delivers us from sin and from the punishment for sin, by a Redeemer."},{"lesson":"20","question":"Who is the Redeemer?","answer":"The only Redeemer is the Lord Jesus Christ, the eternal Son of God, in whom God became man and bore the penalty for sin himself."},{"lesson":"21","question":"What sort of Redeemer is needed to bring us back to God?","answer":"One who is truly human and also truly God."},{"lesson":"22","question":"Why must the Redeemer be truly human?","answer":"That in human nature he might on our behalf perfectly obey the whole law and suffer the punishment for human sin; and also that he might sympathize with our weaknesses."},{"lesson":"23","question":"Why must the Redeemer be truly God?","answer":"That because of his divine nature his obedience and suffering would be perfect and effective; and also that he would be able to bear the righteous anger of God against sin and yet overcome death."},{"lesson":"24","question":"Why was it necessary for Christ, the Redeemer, to die?","answer":"Since death is the punishment for sin, Christ died willingly in our place to deliver us from the power and penalty of sin and bring us back to God. By his substitutionary atoning death, he alone redeems us from hell and gains for us forgiveness of sin, righteousness, and everlasting life."},{"lesson":"25","question":"Does Christ’s death mean all our sins can be forgiven?","answer":"Yes, because Christ’s death on the cross fully paid the penalty for our sin, God graciously imputes Christ’s righteousness to us as if it were our own and will remember our sins no more."},{"lesson":"26","question":"What else does Christ’s death redeem?","answer":"Christ’s death is the beginning of the redemption and renewal of every part of fallen creation, as he powerfully directs all things for his own glory and creation’s good."},{"lesson":"27","question":"Are all people, just as they were lost through Adam, saved through Christ?","answer":"No, only those who are elected by God and united to Christ by faith. Nevertheless God in his mercy demonstrates common grace even to those who are not elect, by restraining the effects of sin and enabling works of culture for human well-being."},{"lesson":"28","question":"What happens after death to those not united to Christ by faith?","answer":"At the day of judgment they will receive the fearful but just sentence of condemnation pronounced against them. They will be cast out from the favorable presence of God, into hell, to be justly and grievously punished, forever."},{"lesson":"29","question":"How can we be saved?","answer":"Only by faith in Jesus Christ and in his substitutionary atoning death on the cross; so even though we are guilty of having disobeyed God and are still inclined to all evil, nevertheless, God, without any merit of our own but only by pure grace, imputes to us the perfect righteousness of Christ when we repent and believe in him."},{"lesson":"30","question":"What is faith in Jesus Christ?","answer":"Faith in Jesus Christ is acknowledging the truth of everything that God has revealed in his Word, trusting in him, and also receiving and resting on him alone for salvation as he is offered to us in the gospel."},{"lesson":"31","question":"What do we believe by true faith?","answer":"Everything taught to us in the gospel. The Apostles’ Creed expresses what we believe in these words: We believe in God the Father Almighty, Maker of heaven and earth; and in Jesus Christ his only Son our Lord, who was conceived by the Holy Spirit, born of the virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell. The third day he rose again from the dead. He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there he will come to judge the living and the dead. We believe in the Holy Spirit, the holy catholic church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting."},{"lesson":"32","question":"What do justification and sanctification mean?","answer":"Justification means our declared righteousness before God, made possible by Christ’s death and resurrection for us. Sanctification means our gradual, growing righteousness, made possible by the Spirit’s work in us."},{"lesson":"33","question":"Should those who have faith in Christ seek their salvation through their own works, or anywhere else?","answer":"No, they should not, as everything necessary to salvation is found in Christ. To seek salvation through good works is a denial that Christ is the only Redeemer and Savior."},{"lesson":"34","question":"Since we are redeemed by grace alone, through Christ alone, must we still do good works and obey God’s Word?","answer":"Yes, because Christ, having redeemed us by his blood, also renews us by his Spirit; so that our lives may show love and gratitude to God; so that we may be assured of our faith by the fruits; and so that by our godly behavior others may be won to Christ."},{"lesson":"35","question":"Since we are redeemed by grace alone, through faith alone, where does this faith come from?","answer":"All the gifts we receive from Christ we receive through the Holy Spirit, including faith itself."},{"lesson":"36","question":"What do we believe about the Holy Spirit?","answer":"That he is God, coeternal with the Father and the Son, and that God grants him irrevocably to all who believe."},{"lesson":"37","question":"How does the Holy Spirit help us?","answer":"The Holy Spirit convicts us of our sin, comforts us, guides us, gives us spiritual gifts and the desire to obey God; and he enables us to pray and to understand God’s Word."},{"lesson":"38","question":"What is prayer?","answer":"Prayer is pouring out our hearts to God in praise, petition, confession of sin, and thanksgiving."},{"lesson":"39","question":"With what attitude should we pray?","answer":"With love, perseverance, and gratefulness; in humble submission to God’s will, knowing that, for the sake of Christ, he always hears our prayers."},{"lesson":"40","question":"What should we pray?","answer":"The whole Word of God directs and inspires us in what we should pray, including the prayer Jesus himself taught us."},{"lesson":"41","question":"What is the Lord’s Prayer?","answer":"Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven. Give us today our daily bread. And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from evil."},{"lesson":"42","question":"How is the Word of God to be read and heard?","answer":"With diligence, preparation, and prayer; so that we may accept it with faith, store it in our hearts, and practice it in our lives."},{"lesson":"43","question":"What are the sacraments or ordinances?","answer":"The sacraments or ordinances given by God and instituted by Christ, namely baptism and the Lord’s Supper, are visible signs and seals that we are bound together as a community of faith by his death and resurrection. By our use of them the Holy Spirit more fully declares and seals the promises of the gospel to us."},{"lesson":"44","question":"What is baptism?","answer":"Baptism is the washing with water in the name of the Father, the Son, and the Holy Spirit; it signifies and seals our adoption into Christ, our cleansing from sin, and our commitment to belong to the Lord and to his church."},{"lesson":"45","question":"Is baptism with water the washing away of sin itself?","answer":"No, only the blood of Christ and the renewal of the Holy Spirit can cleanse us from sin."},{"lesson":"46","question":"What is the Lord’s Supper?","answer":"Christ commanded all Christians to eat bread and to drink from the cup in thankful remembrance of him and his death. The Lord’s Supper is a celebration of the presence of God in our midst; bringing us into communion with God and with one another; feeding and nourishing our souls. It also anticipates the day when we will eat and drink with Christ in his Father’s kingdom."},{"lesson":"47","question":"Does the Lord’s Supper add anything to Christ’s atoning work?","answer":"No, Christ died once for all. The Lord’s Supper is a covenant meal celebrating Christ’s atoning work; as it is also a means of strengthening our faith as we look to him, and a foretaste of the future feast. But those who take part with unrepentant hearts eat and drink judgment on themselves."},{"lesson":"48","question":"What is the church?","answer":"God chooses and preserves for himself a community elected for eternal life and united by faith, who love, follow, learn from, and worship God together. God sends out this community to proclaim the gospel and prefigure Christ’s kingdom by the quality of their life together and their love for one another."},{"lesson":"49","question":"Where is Christ now?","answer":"Christ rose bodily from the grave on the third day after his death and is seated at the right hand of the Father, ruling his kingdom and interceding for us, until he returns to judge and renew the whole world."},{"lesson":"50","question":"What does Christ’s resurrection mean for us?","answer":"Christ triumphed over sin and death by being physically resurrected, so that all who trust in him are raised to new life in this world and to everlasting life in the world to come. Just as we will one day be resurrected, so this world will one day be restored. But those who do not trust in Christ will be raised to everlasting death."},{"lesson":"51","question":"Of what advantage to us is Christ’s ascension?","answer":"Christ physically ascended on our behalf, just as he came down to earth physically on our account, and he is now advocating for us in the presence of his Father, preparing a place for us, and also sends us his Spirit."},{"lesson":"52","question":"What hope does everlasting life hold for us?","answer":"It reminds us that this present fallen world is not all there is; soon we will live with and enjoy God forever in the new city, in the new heaven and the new earth, where we will be fully and forever freed from all sin and will inhabit renewed, resurrection bodies in a renewed, restored creation."}]

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settingsContainer = document.querySelector('.site__settings');
var form = document.querySelector('.settings__form');
var audienceMode = document.querySelector('.form__audience-mode');
var scriptureMode = document.querySelector('.form__scripture-mode');
var keyboardNav = document.querySelector('.form__keyboard');
var welcomeMessage = document.querySelector('.form__welcome');
var lessonNumberElement = document.querySelector('[data-lesson]');
var button = document.querySelector('.settings__button');
var stateChange = new window.CustomEvent('stateChange', {
  bubbles: true,
  cancelable: true
});

// What: Visually represent the state on the settings form.
// How: Use the array of settings to map a value on the form. Check that input. Note that the value is the unique identifier, so this isn't very extensible (two settings could easily have "on" as values).
// Why: The settings for should reflect the state.
function setInitialSettings(array, scope) {
  return array.map(function (setting) {
    var target = scope.querySelector('[value=' + setting + ']');
    target.checked = true;
    return target;
  });
}

// What: Save the settings into state & localStorage.
// Why: Settings should be immediately available (state) and persist (localStorage).
function saveSettings(name, setting) {
  _state2.default[name] = setting;
  return window.localStorage.setItem(name, setting);
}

// What: Save the lessonNumber into localStorage.
// How: Should be called conditionally, because settings exist outside of Lessons, but lessonNumber only exists inside of Lessons.
// Why: Lesson number is used to resume lesson on CTA component.
function saveLessonNumber(lesson) {
  return window.localStorage.setItem('currentLesson', lesson);
}

function handleMenu(isOpen) {
  if (isOpen) {
    // button.setAttribute('aria-label', 'Close Settings Menu')
    button.setAttribute('aria-expanded', 'true');
    form.setAttribute('aria-hidden', 'false');
    form.classList.remove('settings__form--is-closed');
    form.classList.add('settings__form--is-open');
    // enable when expanded (correct tab-order for visible elements)
    audienceMode.disabled = false;
    scriptureMode.disabled = false;
    keyboardNav.disabled = false;
    welcomeMessage.disabled = false;
  } else {
    // button.setAttribute('aria-label', 'Settings Menu')
    button.setAttribute('aria-expanded', 'false');
    form.setAttribute('aria-hidden', 'true');
    form.classList.remove('settings__form--is-open');
    form.classList.add('settings__form--is-closed');
    // disable when collapsed (no tabbing invisible elements)
    audienceMode.disabled = true;
    scriptureMode.disabled = true;
    keyboardNav.disabled = true;
    welcomeMessage.disabled = true;
  }
}

// Contextually set the endpoints for keyboard navigation.
function setNavigationEndpoints() {
  var previous = document.querySelector('.navbar__link--previous');
  var next = document.querySelector('.navbar__link--next');
  var resume = document.querySelector('.resume__action');
  var go = {};

  if (next !== null) {
    go.next = next.href;
  } else if (resume && resume.href) {
    go.next = resume.href;
  } else {
    go.next = '/introduction/';
  }

  if (previous !== null) {
    go.previous = previous.href;
  } else if (resume && resume.href) {
    go.previous = resume.href;
  } else {
    go.previous = '/introduction/';
  }

  go.home = function () {
    window.location.href = '/';
  };
  go.search = function () {
    return document.querySelector('.search__input').focus();
  };

  return go;
}

function handleKeyboardInput(e) {
  var go = setNavigationEndpoints();
  // Set booleans for use in conditionals below.
  var navOn = _state2.default.keyboardNav === 'on';

  // Close the menu if the search input is the active element.
  if (document.activeElement === document.querySelector('.search__input')) {
    _state2.default.menuIsOpen = false;
    return document.body.dispatchEvent(stateChange);
  }

  // If the menu is open and the site settings container doesn't contain the active element (tabbed away from, for instance).
  if (_state2.default.menuIsOpen && !settingsContainer.contains(document.activeElement)) {
    _state2.default.menuIsOpen = false;
    return document.body.dispatchEvent(stateChange);
  }

  // Close the menu with "escape" if it's open.
  if (e.keyCode === 27 && _state2.default.menuIsOpen) {
    _state2.default.menuIsOpen = false;
    // Toggle the menu with "m" if the menu is closed.
  } else if (e.keyCode === 77) {
    _state2.default.menuIsOpen = !_state2.default.menuIsOpen;
    // If the menu is open, set the button to be the focused element (not inherently done since this was opened with the keyboard nav).
    if (_state2.default.menuIsOpen) {
      button.focus();
    }
  }

  // Keyboard navigation.
  // "p"
  if (e.keyCode === 80 && navOn) {
    document.location.href = go.previous;
    // "n"
  } else if (e.keyCode === 78 && navOn) {
    document.location.href = go.next;
    // "h"
  } else if (e.keyCode === 72 && navOn) {
    go.home();
    // "s"
  } else if (e.keyCode === 83 && navOn) {
    go.search();
  }

  // Dispached the changed state (if the action taken doesn't preclude this step, such as window.location.href change).
  return document.body.dispatchEvent(stateChange);
}

function handleClickOffElement(e) {
  var withinForm = form.contains(e.target);
  var matchedButton = button.contains(e.target);

  // Don't close the form if clicking on the settings button.
  if (matchedButton) {
    return;
  }

  // Close the form if clicking outside the form and the form is open.
  if (!withinForm && _state2.default.menuIsOpen === true) {
    _state2.default.menuIsOpen = false;

    return document.body.dispatchEvent(stateChange);
  }
}

var settings = {
  updateState: function updateState() {
    if (lessonNumberElement) {
      saveLessonNumber(lessonNumberElement.dataset.lesson);
    }

    setInitialSettings([_state2.default.audienceMode, _state2.default.scriptureMode, _state2.default.keyboardNav, _state2.default.welcomeMessage], form);

    handleMenu(_state2.default.menuIsOpen);
  },
  once: function once() {
    // Both saves the setting and triggers pub/sub for cusom event.
    form.addEventListener('change', function (e) {
      if (e.target.nodeName === 'INPUT') {
        saveSettings(e.target.name, e.target.value);
      }

      return document.body.dispatchEvent(stateChange);
    });

    window.addEventListener('keyup', handleKeyboardInput);

    button.addEventListener('click', function () {
      _state2.default.menuIsOpen = !_state2.default.menuIsOpen;
      return handleMenu(_state2.default.menuIsOpen);
    });

    // What: Close the form by methods other than clicking on the settings button.
    document.addEventListener('click', handleClickOffElement);
  }
};

exports.default = settings;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reset = document.querySelector('.answer__control--reset');
var harder = document.querySelector('.answer__control--harder');
var liveNodes = Array.from(document.querySelectorAll('.answer__container'));

// What: Responsible for manipulating the DOM.
// Why: Writes the modified text for the answer level.
function writeVersionToDOM(nodeArray, liveNodes) {
  return nodeArray.map(function (version, index) {
    var section = version.map(function (content) {
      return content.join(' ');
    });
    var currentLive = Array.from(liveNodes[index].firstElementChild.childNodes);

    return section.map(function (text, index) {
      currentLive[index].textContent = text;
      return currentLive[index];
    });
  });
}

// What: Takes array of innerHTML (with Node representations intact) and forms into array of DOM Nodes
// Why: Combined mode text contains spans of text that need to be "rehydrated" into their DOM form.
function textToNodes(textArray, liveNodes) {
  var nodes = textArray.map(function (version, index) {
    var div = liveNodes[index].cloneNode(false);
    div.innerHTML = version;
    return div;
  });
  return nodes;
}

// What: Takes DOM node and breaks into array of nodes.
// Why: In order to manipulate the text, each word should be broken down into an index in an array, with each level representing the DOM structure.
function nodesToArray(nodes) {
  var array = nodes.map(function (node) {
    return node.firstElementChild;
  }).map(function (child) {
    return Array.from(child.childNodes).map(function (childNodes) {
      return childNodes.textContent.split(' ');
    });
  });
  return array;
}

// What: Call the correct functions to modify the text for increased / decreased difficulty in the answer.
// Why: suppport learning the answer.
function manageTextContent() {
  var structured = textToNodes(_state2.default.answers, liveNodes);
  var nodeArray = nodesToArray(structured);

  // Return the original text when the level is 0.
  if (_state2.default.answerLevel === 0) {
    return writeVersionToDOM(nodeArray, liveNodes);
  }

  // What: Map through all versions, modifying each.
  // Why: If the audience mode is switched while the text is modified, I want the new text to be modified as well.
  var modifiedContent = nodeArray.map(function (answer) {
    return replaceRandomWords(_state2.default.answerLevel, answer);
  });

  // What: Finds unmodified content. Call with limits, as its possible to recursively exceed call stack.
  // Why: There's no point in modifying text that's already modified.
  function findUnmodified(content) {
    var index = (0, _helper.getRandomInt)(0, content.length);
    var word = content[index];

    if (word.includes('_')) {
      return findUnmodified(content);
    }

    return {
      word: word,
      index: index
    };
  }

  // What: Replace (semi)random words in an array of words.
  function replaceRandomWords(count, answer) {
    var modifiedContent = answer.map(function (content) {
      var allModified = content.every(function (word) {
        return word.includes('–');
      });

      if (allModified) {
        return content;
      } else {
        var unmodified = findUnmodified(content);

        content.splice(unmodified.index, 1, unmodified.word.replace(/./g, '–'));

        return content;
      }
    });

    // Recursively call according to the count, or...
    if (count >= 1) {
      return replaceRandomWords(count - 1, answer);
      // ...just return the content.
    } else {
      return modifiedContent;
    }
  }
  // Write the modified content to the DOM.
  return writeVersionToDOM(modifiedContent, liveNodes);
}

// What: Change the answer level, with boundaries to prevent calling the modification too many times.
// Why: Possible to overflow call stack with too many calls, and some logic is neede to scale the difficulty level.
function changeAnswerLevel(e) {
  var harder = this.matches('.answer__control--harder');
  var level = _state2.default.answerLevel;

  if (harder) {
    level = level < 2 ? level += 1 : level;
    level *= 2;
  } else {
    level = 0;
  }

  // Prevent stack overflow on needless button presses.
  if (level >= 128) {
    level = 128;
  }

  _state2.default.answerLevel = level;
  return manageTextContent();
}

// What: Set appropriate aria roles on elements for answer difficulty.
// Why: Support accessibility.
function setAriaActive() {
  liveNodes.map(function (version) {
    if (version.matches('.answer__container:not(.is-hidden)')) {
      version.setAttribute('aria-live', 'assertive');
      version.setAttribute('aria-relevant', 'all');
    } else {
      version.removeAttribute('aria-live');
      version.removeAttribute('aria-relevant');
    }
  });
}

var answer = {
  updateState: function updateState() {
    (0, _helper.showCorrectVersion)({
      list: liveNodes,
      prefix: 'answer__container--',
      correct: _state2.default.audienceMode
    });
    setAriaActive();
  },
  once: function once() {
    reset.addEventListener('click', changeAnswerLevel);
    harder.addEventListener('click', changeAnswerLevel);

    // Set unmodified text into state. The text will always be unmodified on initial load.
    _state2.default.answers = liveNodes.map(function (node) {
      return node.innerHTML;
    });
  }
};

exports.default = answer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const input = document.querySelector('.controls__loop-input')
var loop = document.querySelector('.controls__button--loop');
var button = document.querySelector('.controls__button--play-pause');
var progressContainer = document.querySelector('.controls__progress');
var progressBar = document.querySelector('.progress__indicator');
var songSection = document.querySelector('.site__song');
var audio = document.querySelector('.song__audio');
var list = document.querySelector('.playlist__list');

// What: Set the active song & associated aria properties in the playlist and related elements.
// Why: Visual / semantic styling on the active class, build accessibly.
function setActiveSong(audioElement) {
  var source = audioElement.src;
  var listLinks = Array.from(list.querySelectorAll('.playlist__link'));

  listLinks.map(function (link) {
    if (link.href === source) {
      link.id = 'active-song';
      loop.setAttribute('aria-describedby', 'active-song');
      return link.classList.add('playlist__link--active');
    } else {
      link.removeAttribute('id');
      return link.classList.remove('playlist__link--active');
    }
  });
}

function handleLoop() {
  _state2.default.loopSong = !_state2.default.loopSong;

  if (_state2.default.loopSong) {
    audio.loop = true;
    loop.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-label', 'Play this song repeatedly.');
    button.setAttribute('aria-describedby', 'active-song');
    return loop.classList.add('loop__is-active');
  } else {
    audio.loop = false;
    button.setAttribute('aria-label', 'Play all songs once.');
    button.setAttribute('aria-describedby', 'playlist');
    loop.setAttribute('aria-pressed', 'false');
    return loop.classList.remove('loop__is-active');
  }
}

function handleSongEnd(e) {
  var listLinks = Array.from(list.querySelectorAll('.playlist__link'));
  var audio = e.target;
  var sourceList = listLinks.map(function (link) {
    return link.href;
  });
  var length = sourceList.length;
  var current = sourceList.indexOf(audio.src);

  // If there's a next song in the listLinks...
  if (length && current + 1 < length) {
    // ...set the source to the next in the listLinks and play the song, or...
    audio.src = sourceList[current + 1];
    audio.play();
  } else {
    // ...set the source to the first song, without playing.
    audio.src = sourceList[0];
  }
  // Finally, set the active song again.
  return setActiveSong(audio);
}

function handleClick() {
  var method = audio.paused ? 'play' : 'pause';
  return audio[method]();
}

function updateButton() {
  var playImage = button.querySelector('.button-svg__play');
  var pauseImage = button.querySelector('.button-svg__pause');
  var pressed = audio.paused ? 'false' : 'true';

  if (audio.paused) {
    pauseImage.classList.add('is-hidden');
    playImage.classList.remove('is-hidden');
  } else {
    playImage.classList.add('is-hidden');
    pauseImage.classList.remove('is-hidden');
  }

  return button.setAttribute('aria-pressed', pressed);
}

function handleProgress() {
  // audio.duration is NaN when song has not yet started, so default to 0% when song has not yet started playing.
  var percent = audio.currentTime / audio.duration * 100 || 0;
  progressBar.style.flexBasis = percent + '%';
}

function handlePlaylistChange(e) {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.nodeName === 'A') {
    audio.src = e.target.href;
    audio.play();
    return setActiveSong(audio);
  }
}

function scrub(e) {
  if (!_state2.default.isMouseDown && e.type === 'mousemove') {
    return;
  }
  var scrubTime = e.offsetX / progressContainer.offsetWidth * audio.duration;
  audio.currentTime = scrubTime;
}

var song = {
  updateState: function updateState() {
    if (_state2.default.audienceMode === 'adult') {
      songSection.hidden = true;
      return songSection.classList.add('is-hidden');
    }
    songSection.hidden = false;
    songSection.classList.remove('is-hidden');
    return setActiveSong(audio);
  },
  once: function once() {
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('play', updateButton);
    audio.addEventListener('pause', updateButton);
    audio.addEventListener('timeupdate', handleProgress);

    list.addEventListener('click', handlePlaylistChange);

    button.addEventListener('click', handleClick);

    progressContainer.addEventListener('click', scrub);
    progressContainer.addEventListener('mousemove', scrub);

    loop.addEventListener('click', handleLoop);

    document.addEventListener('mousedown', function () {
      _state2.default.isMouseDown = true;
    });

    document.addEventListener('mouseup', function () {
      _state2.default.isMouseDown = false;
    });
  }
};

exports.default = song;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = document.querySelector('.resume__action');
var resume = document.querySelector('.site__lesson-resume');
var introduction = document.querySelector('.site__welcome');
var feature = document.querySelector('.CTA__feature-detect');
var currentLesson = (0, _helper.convertToNumber)(_state2.default.currentLesson);
var paddedNumeral = (0, _helper.leftPadString)(currentLesson);

var welcome = {
  updateState: function updateState() {
    if (currentLesson > 0) {
      action.href = '/lesson/' + paddedNumeral + '/';
      action.textContent = 'Resume Lesson ' + paddedNumeral;

      resume.classList.remove('is-hidden');
      resume.hidden = false;
    }

    if (_state2.default.welcomeMessage === 'hide') {
      introduction.classList.add('is-hidden');
      introduction.hidden = true;
    } else {
      introduction.classList.remove('is-hidden');
      introduction.hidden = false;
    }
  },
  once: function once() {
    // The serviceWorker is supported, so notify the user of offline support.
    if ('serviceWorker' in navigator) {
      feature.classList.remove('is-hidden');
    }
  }
};

exports.default = welcome;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var container = document.querySelector('.site__question-list-container');

// Enable clicking on the descriptive text as well as the link.
function handleQuestionClick(e) {
  if (e.target.matches('span')) {
    window.location.href = e.target.parentNode.firstElementChild.href;
  }
}

var questionList = {
  updateState: function updateState() {},
  once: function once() {
    container.addEventListener('click', handleQuestionClick);
  }
};

exports.default = questionList;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var versions = [].concat(_toConsumableArray(document.querySelectorAll('.scripture__container')));

function init() {
  return (0, _helper.showCorrectVersion)({
    list: versions,
    prefix: 'scripture__container--',
    correct: _state2.default.scriptureMode
  });
}

exports.default = init;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentary = document.querySelector('.site__commentary');

function init() {
  if (_state2.default.audienceMode === 'child') {
    commentary.hidden = true;
    return commentary.classList.add('is-hidden');
  }
}

exports.default = init;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var player = document.querySelector('.site__video');

var video = {
  updateState: function updateState() {
    if (_state2.default.audienceMode === 'child') {
      player.hidden = true;
      return player.classList.add('is-hidden');
    } else {
      player.hidden = false;
      return player.classList.remove('is-hidden');
    }
  },
  once: function once() {}
};

exports.default = video;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var versions = [].concat(_toConsumableArray(document.querySelectorAll('.prayer__container')));

function init() {
  (0, _helper.showCorrectVersion)({
    list: versions,
    prefix: 'prayer__container--',
    correct: _state2.default.audienceMode
  });
}

exports.default = init;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var versions = [].concat(_toConsumableArray(document.querySelectorAll('.copyright__container')));

var footer = {
  updateState: function updateState() {
    (0, _helper.showCorrectVersion)({
      list: versions,
      prefix: 'copyright__container--',
      correct: _state2.default.scriptureMode
    });
  },
  once: function once() {}
};

exports.default = footer;

/***/ })
/******/ ]);