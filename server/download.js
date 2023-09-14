import ytdl from "ytdl-core"
import fs from "fs"

//função que recupera o ID do vídeo
export const download = (videoId) =>
  new Promise((resolve, reject) => {
    //formatando a URL
    const videoURL = "https://youtube.com/shorts/" + videoId
    console.log("realizando o download do vídeo:" + videoId)

    //definindo parametros de qualidade do vídeo
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      //buscando informações do vídeo
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        //verificando se é um short
        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior que 60 segundos.")
        }
      })

      //verificando se o download do short foi finalizado
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      //identificando possíveis erros
      .on("error", (error) => {
        console.log("Download não realizado. Detalhes:", error)
        reject(error)
      })
      //salvando o vídeo na pasta temporária
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
