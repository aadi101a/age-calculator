// Load history when the page loads
window.onload = function () {
    loadHistory();
};

function getDOB() {
    const name = document.getElementById('name').value.trim();
    const dobInput = document.getElementById('inputDob').value;
    const currentDateInput = document.getElementById('cdate').value;

    if (!name || !dobInput || !currentDateInput) {
        alert('Please enter your name, Date of Birth, and Current Date.');
        return;
    }

    const dob = new Date(dobInput);
    const currentDate = new Date(currentDateInput);

    if (dob > currentDate) {
        alert('Date of Birth cannot be after the current date.');
        return;
    }

    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
    }

    const ageMessage = `${name}, your age is ${age} years.`;
    document.getElementById('currentAge').textContent = ageMessage;

    const historyItem = {
        name: name,
        dob: dobInput,
        currentDate: currentDateInput,
        age: age
    };

    saveToLocalStorage(historyItem);
    appendToHistory(historyItem);
}

function saveToLocalStorage(item) {
    let history = JSON.parse(localStorage.getItem('ageHistory')) || [];
    history.push(item);
    localStorage.setItem('ageHistory', JSON.stringify(history));
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('ageHistory')) || [];
    history.forEach(item => appendToHistory(item));
}

function appendToHistory(item) {
    const historyList = document.getElementById('historyList');
    const newItem = document.createElement('li');
    newItem.textContent = `Name: ${item.name} | DOB: ${item.dob} | Current Date: ${item.currentDate} | Age: ${item.age} years`;
    historyList.appendChild(newItem);
}

function clearHistory() {
    localStorage.removeItem('ageHistory');
    document.getElementById('historyList').innerHTML = '';
    document.getElementById('currentAge').textContent = '';
}
