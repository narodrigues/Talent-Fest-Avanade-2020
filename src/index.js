//Manipulação do dom
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const snap = document.querySelector("#snap");

//Renderizar imagem da webcam no navegador
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
}

// Função para sucesso
const handleSuccess = (stream) => {
  window.stream = stream;
  video.srcObject = stream;
};

// Função para desenhar imagem na tela
const toDrawCapturedSnap = () => {
  var context = canvas.getContext("2d");
  //desenhar canvas (x,y,width, height)
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //testar se deu certo fazendo download da imagem com botao direito
  //formato default: png

  //Transformar canva em imagem jpeg com qualidade 0.7
  const dataURI = canvas.toDataURL("image/jpeg", 0.7);
  //como obter uma url da imagem armazenada em dataURI?
  //salvar no firebase?
};

//Atribuir captura com o click
snap.addEventListener("click", toDrawCapturedSnap);

//Iniciar com o carregamento da página!
window.onload = init();