import { VideoService } from "./VideoService.js"; // importei a classe
document.getElementById("frm").addEventListener("submit", addVideo);

const videoService = new VideoService(); // estou instanciando a classe, essa instancia se chama objeto
// por meio desse objeto, eu consigo utilizar as funções que foram criadas na classe
async function addVideo(event) {
  event.preventDefault();
  let urlVideo = document.getElementById("urlVideo").value; //cria a variável urlVideo, e armazena nela o que está escrito dentro do input com o ID urlVideo
  let idVideo = urlVideo.slice(32, 53);
  videoService.add(idVideo); // idVideo é o parâmetro que está sendo mandado para a função de adicionar vídeo
  renderVideos();
  document.getElementById("frm").reset();
}

renderVideos();
async function renderVideos() {
  // cria uma constante VIDEOS para armazenar os vídeos que forem recebidos
  // videoService.getAll(); - executa o método do objeto que foi instaniado da classe VideoService
  const videos = await videoService.getAll();
  // recupera a seção dos videos e reseta o seu HTML
  document.getElementById("videos").innerHTML = "";
  // cria uma estrutura de repetição para conseguir percorrer a lista completa dos videos que vieram do banco de dados
  videos.forEach(function (video) {
    document.getElementById("videos").innerHTML += `
    <div class="video">
    <iframe src="https://wsww.youtube.com/embed/${
      video.data().idVideo
    }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
    clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
    </iframe>
    <button id="btn-removeVideo" title="Excluir Vídeo" index=${
      video.id
    }>🗑️</button>
    </div>
    `;
  });
  document
    .getElementById("btn-removeVideo")
    .addEventListener("click", removeVideo);
}

// essa linha de código está pegando um elemento pelo seu ID, e colocando uma escuta de evento de CLIQUE, para que na hora que o usuário clique, acione a função "removevideo"
//função para excluir
// event - traz esse evento para cá
async function removeVideo(event) {
  // target - alvo do evento
  // getAttribute - pega um atributo desse elemento HTML
  let index = event.target.getAttribute("index");
  // a linha abaixo usa o objeto videoService, para executar a função remove da classe VideoService
  // async - assíncrono
  // await - esperar - vai esperar que o que vem após ele (videoService.remove(index);)
  // seja completamente concluído
  // aí sim ele segue executando o resto do código
  await videoService.remove(index);
  renderVideos();
}
