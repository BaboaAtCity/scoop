const apiUrl = 'http://localhost:3000';

const submitButton = document.getElementById('submit-button');
const functionSelect = document.getElementById('function-select');
const nameInput = document.getElementById('name-input');
const sizeInput = document.getElementById('size-input');
const resultDiv = document.getElementById('result');

submitButton.addEventListener('click', () => {
    const functionName = functionSelect.value;
    const name = nameInput.value;
    const size = sizeInput.value;

    fetch(`${apiUrl}/api/${functionName}?name=${name}&size=${size}`)
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = JSON.stringify(data);
        })
        .catch(error => {
            resultDiv.textContent = `Error: ${error.message}`;
        });
});
