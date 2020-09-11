const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const snap = document.querySelector("#snap");
const infoLogin = document.querySelector("#login-error");
const modal = document.getElementById("myModal");
const btn = document.querySelector(".infos");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
  const getRef = firebase.storage().ref('photos')
  const renameImg = getRef.child(`${new Date().getTime()}.jpeg`)
  renameImg.putString(dataURI, 'data_url').then(() => renameImg.getDownloadURL().then(url => getFaceId(url)))
};

const getNameUser = response => {
  const personId = response[0].candidates[0].personId
  const url = `https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/persons/${personId}`
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(user => messageToUser(user))
    .catch(error => console.log('error', error));
}
const messageToUser = userData => {
  const modal = document.querySelector('.modal-div');
  const register = document.querySelector('.register-div');

  const userName = userData.name
  video.style.display = 'none';
  snap.style.display = 'none';
  infoLogin.classList.add('login-message');
  register.style.display = 'none';
  infoLogin.innerHTML = `Que bom ver você novamente, ${userName}! (:`;
  modal.style.display = 'none';
}

const getFaceId = url => {
  const myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "url": url });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise", requestOptions)
    .then(response => response.json())
    .then(result => validateImage(result))
    .catch(() => {
      document.getElementById('login-error').innerHTML = 'Não foi possível efetuar o login.'
    })
}

const validateImage = result => {
  const resultImage = result[0].faceId
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  const raw = JSON.stringify({ "personGroupId": "laboratoria", "faceIds": [resultImage], "maxNumOfCandidatesReturned": 1, "confidenceThreshold": 0.5 });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/identify", requestOptions)
    .then(response => response.json())
    .then(result => getNameUser(result))
    .catch(error => console.log('error', error));
}
snap.addEventListener("click", toDrawCapturedSnap);

window.onload = init();