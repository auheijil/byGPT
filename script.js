const apiKeyInput = document.getElementById('api-key-input');
const apiKeySubmit = document.getElementById('api-key-submit');
const inputText = document.getElementById('input-text');
const submitButton = document.getElementById('submit-button');
const outputText = document.getElementById('output-text');

let apiKey = '';

apiKeySubmit.addEventListener('click', () => {
  apiKey = apiKeyInput.value;
  apiKeyInput.value = '';
  alert('API Key submitted!');
});

submitButton.addEventListener('click', () => {
  const question = inputText.value;
  inputText.value = '';
  fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: question,
      max_tokens: 100,
      n: 1,
      stop: ['\n'],
    }),
  })
    .then(response => response.json())
    .then(data => {
      const answer = data.choices[0].text.trim();
      outputText.textContent = answer;
    })
    .catch(error => {
      console.error(error);
      outputText.textContent = 'Error: ' + error.message;
    });
});