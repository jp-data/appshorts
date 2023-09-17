import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")
  //recuperando a URL do vídeo
  const videoURL = input.value
  // validação de shorts
  if( !videoURL.includes("shorts") ){
    return content.textContent = "Esse vídeo não é um shorts"
  }

  // extraindo somente o ID do vídeo
  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio ..."
  // requisição para o servidor
  const transcription = await server.get("/summary/" + videoID)
  // conteúdo na view
  content.textContent = "Realizando o resumo ..."
  //nova requisição passando os dados de transcrição
  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  // atualizando o conteúdo na view com o resumo do vídeo
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})