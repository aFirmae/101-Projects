const year = document.getElementById('year-input');
const result = document.getElementById('output-text');

document.addEventListener('DOMContentLoaded', () => {
    year.focus();
});

year.addEventListener('focus', () => {
    year.setAttribute('type', 'number');
});

function checkLeapYear() {
    const yearValue = year.value;
    if (yearValue % 4 === 0 && (yearValue % 100 !== 0 || yearValue % 400 === 0)) {
        result.innerHTML = `${yearValue} is a leap year!`;
        year.style.backgroundColor = '#D0F0C0';
    } else {
        result.innerHTML = `${yearValue} is not a leap year!`;
        year.style.backgroundColor = '';
    }
}

year.addEventListener('input', () => {
    if (isNaN(year.value)) {
        result.innerHTML = 'Please enter a valid year!';
        year.style.backgroundColor = '#F8D7DA';
    }
    else if (year.value.trim().length > 4) {
        result.innerHTML = "Year shouldn't exceed 4 digits!";
        year.style.backgroundColor = '#F8D7DA';
    }
    else if (year.value.trim() < 1000) {
        result.innerHTML = 'Check for leap year!';
        year.style.backgroundColor = '';
    }
    else if (year.value.trim() !== '') {
        checkLeapYear();
    } 
    else {
        result.innerHTML = 'Check for leap year!';
        year.style.backgroundColor = '';
    }
});