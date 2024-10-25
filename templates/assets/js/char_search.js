const cycle = document.getElementById('cycle');
const typed = document.getElementById('typed');
const charCount = document.getElementById('char-count');
const search = document.getElementById('search');
const searchIcon = document.getElementById('search-icon');
const content = document.getElementById('content');

var cycleList = ['sentence', 'word', 'phrase', 'paragraph'];
var colorList = ['yellow', 'cyan', 'magenta', 'lime'];
var cycleIndex = 0;

document.addEventListener('DOMContentLoaded', () => {

    typed.focus();

    const updateCycleText = () => {
        cycle.style.transition = 'opacity 0.5s ease-in-out';
        cycle.style.opacity = 0;

        setTimeout(() => {
            cycle.textContent = cycleList[cycleIndex];
            cycle.style.color = colorList[cycleIndex];
            cycle.style.opacity = 1;
            cycleIndex = (cycleIndex + 1) % cycleList.length;
        }, 500);
    };

    let cycleInterval = setInterval(updateCycleText, 5000);
    let hoverTimeout;

    cycle.addEventListener('mouseout', () => {
        hoverTimeout = setTimeout(() => {
            updateCycleText();
            cycleInterval = setInterval(updateCycleText, 5000);
        }, 500);
    });

    cycle.addEventListener('mouseover', () => {
        clearInterval(cycleInterval);
        clearTimeout(hoverTimeout);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(cycleInterval);
        } else {
            cycleInterval = setInterval(updateCycleText, 5000);
        }
    });

    updateCycleText();
});

let typingTimeout;

typed.addEventListener('input', () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        charCount.innerHTML = typed.innerText.trim().length;
    }, 0);

    if (typed.innerText.trim() === '') {
        charCount.innerText = '0';
    } else {
        charCount.innerText = typed.innerText.trim().length;
    }

    if (typed.innerText.length > 500) {
        typed.innerText = typed.innerText.substring(0, 500);
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(typed.childNodes[0], typed.innerText.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    clearSearch();
});

searchIcon.addEventListener('click', performSearch);

search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function clearSearch() {
    if (typed.innerText.length > 0) {
        const highlightedElements = typed.querySelectorAll('.highlighted');
        highlightedElements.forEach(element => {
            element.outerHTML = element.innerText;
        });
        search.value = '';
    }
}

typed.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && document.activeElement === typed) {
        clearSearch();
    }
});

function performSearch() {
    const typedText = typed.innerText;
    const searchText = search.value;

    if (searchText) {
        const regex = new RegExp(searchText, 'gi');
        const highlighted = typedText.replace(regex, (match) => `<span class="highlighted">${match}</span>`);

        if (highlighted !== typedText) {
            typed.innerHTML = highlighted;
        } else {
            search.value = '';
            content.innerHTML = `<span><i class="fa-solid fa-xmark"></i></span>&nbsp;No matches found for <span id="unfound">${searchText}</span>`;
            content.classList.add('slide');
            setTimeout(() => {
                content.innerHTML = '';
                content.classList.remove('slide');
            }, 7000);
        }
    }

    const unfound = document.getElementById('unfound');

    unfound.style.color = 'orange';

    let textSize;

    if (window.innerWidth < 480) {
        textSize = 10;
    } else {
        textSize = 25;
    }

    if (searchText.length > textSize) {
        unfound.innerHTML = searchText.substring(0, textSize) + '...';
    }
}