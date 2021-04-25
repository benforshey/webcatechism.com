const container = document.querySelector('.site__question-list-container')

// Enable clicking on the descriptive text as well as the link.
function handleQuestionClick (e) {
  if (e.target.matches('span')) {
    window.location.href = e.target.parentNode.firstElementChild.href
  }
}

const questionList = {
  updateState () {

  },
  once () {
    container.addEventListener('click', handleQuestionClick)
  }
}

export default questionList
