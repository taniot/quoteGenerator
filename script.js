const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loader = document.getElementById('loader')

// Loading Spinner Shown
function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Remove Loading Spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

// Get Quote from API
function getQuote() {
  showLoadingSpinner()

  const proxyUrl = 'https://still-thicket-97199.herokuapp.com/'
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  let errorCounter = 0
  async function get() {
    try {
      const response = await fetch(proxyUrl + apiUrl)
      const data = await response.json()
      // if Author is blank, add 'Unknown'
      if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown'
      } else {
        authorText.innerHTML = data.quoteAuthor
      }
      // Reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote')
      } else {
        quoteText.classList.remove('long-quote')
      }
      quoteText.innerHTML = data.quoteText
      // Stop Loader, Show the quote
      removeLoadingSpinner()
     
    } catch (error) {
      //Stop execution if more than 10 errors
      errorCounter++
      if (errorCounter < 10) {
        get()
      } else {
        console.log(error)
      }
    }
  }
  get()
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote()
