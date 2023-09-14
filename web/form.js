import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("Dados enviados")

  const videoURL = input.value
  
  if( !videoURL.includes("shorts") ){
    return content.textContent = "Esse vídeo não é um shorts"
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio ..."
  server.get("/summary/" + videoID)


})