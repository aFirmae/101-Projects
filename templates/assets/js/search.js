const input = document.getElementById('inputs');
const add = document.getElementById('add-number');
const searchVal = document.getElementById('search-value');
const search = document.getElementById('search');
const output = document.getElementById('output');
const showArray = document.getElementById('show-array');
const array = document.getElementById('array');

document.addEventListener('DOMContentLoaded', () => {
    input.focus();
});

var data = [];

showArray.addEventListener('click', () => {
    if (showArray.innerHTML === 'Show Array') {
        if (data.length === 0) {
            array.innerHTML = 'Array is empty!';
            setTimeout(() => {
                array.innerHTML = '';
            }, 1500);
        } else {
            array.innerHTML = `Array: [${data}]`;
            showArray.innerHTML = 'Hide Array';
            showArray.className = 'btn btn-danger';
        }
    } 
    else {
        array.innerHTML = '';
        showArray.innerHTML = 'Show Array';
        showArray.className = 'btn btn-success';
    }
});

add.addEventListener('click', () => {
    const inputValue = input.value.trim();
    if (inputValue === '') {
        input.placeholder = "Please enter a number";
        setTimeout(() => {
            input.placeholder = '';
            input.style.color = '';
        }, 5000);
    } else {
        const number = Number(inputValue);
        if (Number.isSafeInteger(number)) {
            data.push(number);
            console.log(data);
            input.value = '';
            if (showArray.innerHTML === 'Hide Array') {
                array.innerHTML = `Array: [${data}]`;
            }
        }
    }
    input.focus();
});

search.addEventListener('click', () => {
    const searchValue = searchVal.value.trim();
    if (searchValue === '') {
        searchVal.placeholder = "Please enter a number";
        setTimeout(() => {
            searchVal.placeholder = '';
        }, 5000);
    } else {
        const number = Number(searchValue);
        if (Number.isSafeInteger(number)) {
            if (data.includes(number)) {
                output.innerHTML = `${searchValue} exists in the Array!`;
            } else {
                output.innerHTML = `${searchValue} doesn't exist in the Array!`;
            }
        }
    }
    searchVal.value = '';
    searchVal.focus();
});

input.addEventListener('input', () => {
    const number = Number(input.value);
    if (!Number.isSafeInteger(number)) {
        input.value = input.value.slice(0, -1);
    }
});


searchVal.addEventListener('input', () => {
    const number = Number(searchVal.value);
    if (!Number.isSafeInteger(number)) {
        searchVal.value = searchVal.value.slice(0, -1);
    }
});

document.getElementById('clear-array').addEventListener('click', () => {
    data = [];
    output.innerHTML = '';
    searchVal.value = '';
    array.innerHTML = '';
    showArray.innerHTML = 'Show Array';
    showArray.className = 'btn btn-success';
    input.focus();
});