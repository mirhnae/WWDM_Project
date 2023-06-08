// GrammarBot API endpoint
const apiUrl = 'https://grammarbot.p.rapidapi.com/check';

// HTML elements
const textInput = document.getElementById('textInput');
const checkButton = document.getElementById('checkButton');
const errorList = document.getElementById('errorList');

// Event listener for the check button
checkButton.addEventListener('click', function() {
  const text = textInput.value.trim();

  if (text !== '') {
    checkGrammar(text);
  } else {
    errorList.innerHTML = '<p>Please enter some text.</p>';
  }
});

// Function to check grammar using the GrammarBot API
function checkGrammar(text) {
  const formData = new FormData();
  formData.append('text', text);

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': 'bec76b5887mshf03e056ed9d0069p1e5dc4jsn278bf1bd6620',
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => displayGrammarErrors(data))
  .catch(error => console.error('Error:', error));
}

// Function to display grammar errors in the HTML
function displayGrammarErrors(data) {
  const matches = data.matches;

  if (matches.length === 0) {
    errorList.innerHTML = '<p>No grammar errors found.</p>';
  } else {
    let errorHTML = '<ul>';
    matches.forEach(match => {
      const message = match.message;
      const replacements = match.replacements.map(rep => rep.value).join(', ');

      const errorItem = `<li class="error"><strong>Error:</strong> ${message}<br><strong>Replacement:</strong> ${replacements}</li>`;
      errorHTML += errorItem;
    });
    errorHTML += '</ul>';
    errorList.innerHTML = errorHTML;
  }
}
