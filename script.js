// 获取DOM元素
const questionInput = document.getElementById('question');
const submitBtn = document.getElementById('submit');
const answerOutput = document.getElementById('answer');
const apiKeyInput = document.getElementById('api-key');
const saveBtn = document.getElementById('save');

// API Key
let apiKey = '';

// 保存API Key
saveBtn.addEventListener('click', function() {
	apiKey = apiKeyInput.value;
	alert('API Key已保存');
});

// 提交问题并获取答案
submitBtn.addEventListener('click', function() {
	const question = questionInput.value.trim();
	if (!question) {
		alert('请输入问题');
		return;
	}
	if (!apiKey) {
		alert('请填写API Key');
		return;
	}

	// 调用OpenAI API
	fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			prompt: question,
			max_tokens: 150,
			model: 'text-davinci-002',
			stop: ['\n']
		})
	})
	.then(response => response.json())
	.then(data => {
		answerOutput.innerHTML = data.choices[0].text.trim();
	})
	.catch(error => {
		answerOutput.innerHTML = '出错了，请检查API Key是否正确';
		console.error(error);
	});
});