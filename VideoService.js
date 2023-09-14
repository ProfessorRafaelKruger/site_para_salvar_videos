import { videos } from "./bd.js";
// isso é uma classe
export class VideoService {
  async add(idVideo) {
    // serve para adicionar um video
    await videos.add({ idVideo });
  }
  getAll() {
    return videos.get(); // pega todos os vídeos do banco de dados
  }
  async remove(index) {
    // procura o vídeo pelo seu index (.doc)
    // deleta o vídeo do banco de dados (.delete)
    await videos.doc(index).delete();
  }
}
