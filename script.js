const submitBtn = document.getElementById('submit-btn');
const questionInput = document.getElementById('question-input');
const outputContainer = document.querySelector('.output-container');
//const apikeyInput = document.getElementById('apikey-input');

submitBtn.addEventListener('click', function() {
  const question = questionInput.value;
  const apikey = "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"
  if (question && apikey) {
    fetch('https://api.openai.com/v1/engine/gpt-3.5-turbo/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      },
      body: JSON.stringify({
        prompt: question + '\n',
        max_tokens: 50,
        n: 1,
        stop: '\n'
      })
    })
    .then(response => response.json())
    .then(data => {
      const answer = data.choices[0].text.trim();
      outputContainer.innerHTML = `<p>${answer}</p>`;
    })
    .catch(error => {
      outputContainer.innerHTML = `<p>API调用失败，请检查您的API Key是否正确。</p>`;
    });
  } else {
    outputContainer.innerHTML = `<p>请输入您的问题和API Key。</p>`;
  }
});