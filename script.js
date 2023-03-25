const submitBtn = document.getElementById('submit-btn');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const apiKeyInput = document.getElementById('apikey');

submitBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value;
  const input = inputText.value.trim();

  if (!apiKey) {
    alert('Please enter your API key.');
    return;
  }

  if (!input) {
    alert('Please enter some text to generate output.');
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 1024,
        n: 1,
        temperature: 0.5,
        stop: ['\n']
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      outputText.value = data.choices[0].text.trim();
    } else {
      outputText.value = 'Sorry, no output was generated.';
    }
  } catch (error) {
    console.error(error);
    outputText.value = 'Sorry, an error occurred while generating the output.';
  }
});