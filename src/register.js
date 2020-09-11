const getName = document.querySelector('.input-name');
const video = document.querySelector("#video");
const snap = document.querySelector("#snap");
const infoLogin = document.querySelector("#login-error");

snap.addEventListener('click', () => toDrawCapturedSnap())

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
}

const handleSuccess = stream => {
  window.stream = stream;
  video.srcObject = stream;
};

const toDrawCapturedSnap = () => {
  const context = canvas.getContext("2d");

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURI = canvas.toDataURL("image/jpeg", 0.7);
  if (getName.value !== '') {

    const getRef = firebase.storage().ref('photos')
    const renameImg = getRef.child(`${new Date().getTime()}.jpeg`)
    renameImg.putString(dataURI, 'data_url').then(() => renameImg.getDownloadURL().then(url => registerUser(url, getName.value)))
  } else {
    alert('Digite o seu nome')
  }
};

const registerUser = (url, username) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  const raw = JSON.stringify({ "name": username });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/persons", requestOptions)
    .then(response => response.json())
    .then(result => sendPhoto(url, result))
    .catch(error => console.log('error', error));
}

const sendPhoto = (url, result) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  const raw = JSON.stringify({ "url": url });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/persons/${result.personId}/persistedFaces`, requestOptions)
    .then(response => response.text())
    .then(() => train())
    .catch(error => console.log('error', error));
}

const train = () => {
  const myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("{body}", "");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/train", requestOptions)
    .then(response => response.text())
    .then(() => messageToUser())
    .catch(error => console.log('error', error));
}

const messageToUser = () => {
  const getName = document.querySelector('.get-name');

  video.style.display = 'none';
  snap.style.display = 'none';
  getName.style.display = 'none';
  infoLogin.classList.add('login-message')
  infoLogin.innerHTML = `Bem-vindx à equipe! (:`
}

window.onload = init();