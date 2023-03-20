/////////////////SEARCH BUTTON //////////////////
const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', function () {
  if (errorCheck()) {
    queryHymn();
  }
});

/////////////////SELECT OPTIONS //////////////////
for (var i = 0; i < select.options.length; i++) {
  const select = document.getElementById('select');
  let options = select.options[i];

  options.addEventListener('click', function () {
    console.log(options.value);
  });
}

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

///////////////// FETCHING DATA FROM ECOY API ENDPOINT //////////////////
function queryHymn(e) {
  let searchEl = document.querySelector('.search-input').value;

  fetch(`https://ecoy-hymn-api.onrender.com/ecoyhymn/${searchEl}`)
    .then((response) => response.json())
    .then((data) => {
      // const hymnDisplay = document.querySelector('.hymn-display-con');
      // hymnDisplay.innerHTML = `
      // <h3 class="hymn-title">"${data.title}"</h3>
      // <p class="hymn-text">
      //  "${data.hymn_body}"
      // </p>
      // `;
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

  e.preventDefault();
}
