const hymnEndpoint = 'https://ecoy-hymn-api.onrender.com/ecoyhymn';
let selectOption = document.querySelector('.option').value;
console.log(selectOption);
////////creating an async function //////////
async function getHymn() {
  const response = await fetch(hymnEndpoint);
  const ecoyhymn = await response.json();

  return ecoyhymn;
}

function displayHymn(ecoyhymn) {
  const displayCon = document.querySelector('.hymn-display-con');
  const newDisplayCon = document.createElement('div');
  newDisplayCon.classList.add('hymn-display-con');

  const hymnBody = document.createElement('p');
  hymnBody.innerText = ecoyhymn.hymn_body;
  hymnBody.classList.add('hymn-text');
  const hymnTitle = document.createElement('h3');
  hymnTitle.innerText = ecoyhymn.title;
  hymnTitle.classList.add('hymn-title');

  newDisplayCon.appendChild(hymnTitle);
  newDisplayCon.appendChild(hymnBody);
  displayCon.appendChild(newDisplayCon);
}

async function renderHymn() {
  const ecoyhymn = await getHymn();

  ecoyhymn.forEach((ecoyhymn) => displayHymn(ecoyhymn));
}

renderHymn();
