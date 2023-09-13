import ytdl from 'ytdl-core'
import fs from 'fs'


//função que recupera o ID do vídeo
export const download = (videoId) => {
  const videoURL = "https://youtube.com/shorts/" + videoId
  console.log("realizando o download do vídeo:" + videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"})
  .on("info", 
  (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if( seconds > 60 ){
      throw new Error('A duração desse vídeo é maior que 60 segundos.')
    }
  })
  .on('end', () => {
    console.log("Download do vvídeo finalizado.")
  })
  .on('error', (error) => {
    console.log("Download não realizado. Detalhes:", error)
  }).pipe(fs.createWriteStream('./tmp/audio.mp4'))
}