/////////////////SEARCH BUTTON //////////////////
const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', function () {
  if (errorCheck()) {
    searchToQueryHymn();
  }
});

////////////////SELECT OPTIONS //////////////////

const selectBox = document.querySelector('.select-box');
const optionCon = document.querySelector('.option-con');
const allOptionEl = document.querySelectorAll('.option');

selectBox.addEventListener('click', () => {
  optionCon.classList.toggle('selected');
});

allOptionEl.forEach((option) => {
  option.addEventListener('click', () => {
    selectBox.innerHTML = option.querySelector('label').innerHTML;
    optionCon.classList.remove('selected');
  });
});

/////////////////ERROR CHECK FUNCTION //////////////////

function errorCheck() {
  let searchEl = document.querySelector('.search-input').value;

  if (searchEl.trim() === '') {
    alert('Field cannot be empty');
    return false;
  } else if (searchEl.trim() === '0') {
    alert('Field cannot contain a 0');
    return false;
  }

  return true;
}

///////////////// FETCHING DATA FROM ECOY API ENDPOINT BY SEARCH //////////////////
function searchToQueryHymn() {
  let searchEl = document.querySelector('.search-input').value;

  fetch(`https://ecoy-hymn-api.onrender.com/ecoyhymn/${searchEl}`)
    .then((response) => response.json())
    .then((data) => {
      const hymnDisplay = document.querySelector('.hymn-display-con');
      hymnDisplay.innerHTML = ''; // Clear existing content
      const renderedHymnCon = document.createElement('div');
      const title = document.createElement('h3');
      title.innerText = `${data.title}`;
      title.classList.add('hymn-title');
      const hymnBody = document.createElement('p');
      hymnBody.innerText = `${data.hymn_body}`;
      hymnBody.classList.add('hymn-text');

      renderedHymnCon.appendChild(title);
      renderedHymnCon.appendChild(hymnBody);
      hymnDisplay.appendChild(renderedHymnCon);
    });
}

///////////////// FETCHING DATA FROM ECOY API ENDPOINT BY SELECTION //////////////////
function fetchIdBySelect() {
  const labels = document.querySelectorAll('.option label');
  let input;
  labels.forEach((label) => {
    label.addEventListener('click', () => {
      const inputId = label.getAttribute('for');
      input = document.getElementById(inputId);
      let inputValue = input.id;

      fetch(`https://ecoy-hymn-api.onrender.com/ecoyhymn/${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          const hymnDisplay = document.querySelector('.hymn-display-con');
          hymnDisplay.innerHTML = ''; // Clear existing content
          const renderedHymnCon = document.createElement('div');
          const title = document.createElement('h3');
          title.innerText = `${data.title}`;
          title.classList.add('hymn-title');
          const hymnBody = document.createElement('p');
          hymnBody.innerText = `${data.hymn_body}`;
          hymnBody.classList.add('hymn-text');

          renderedHymnCon.appendChild(title);
          renderedHymnCon.appendChild(hymnBody);
          hymnDisplay.appendChild(renderedHymnCon);
        });
    });
  });
}
fetchIdBySelect();
