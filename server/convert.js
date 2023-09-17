// manipulação de arquivos
import fs from 'fs'
// pacote de conversão do áudio
import wav from 'node-wav'
// pacote para manipular o áudio
import ffmpeg from 'fluent-ffmpeg'
// pacote para manipular o arquivo
import ffmpegStatic from 'ffmpeg-static'

// local do arquivo que será convertido
const filePath = "./tmp/audio.mp4"
// local de armazenamento do arq convertido
const outputPath = filePath.replace('.mp4', ".wav")


//função que converte o vídeo
export const convert = () => new Promise ((resolve, reject) => {
  console.log("Convertendo o vídeo...")
  //
  ffmpeg.setFfmpegPath(ffmpegStatic)
  // indicando o local do arquivo que será manipulado
  ffmpeg()
  .input(filePath)
  // frequencia de áudio utilizada
  .audioFrequency(16000)
  // número de canais
  .audioChannels(1)
  // definindo o formato
  .format("wav")

  .on("end", () => {
    //lendo o arquivo convertido
    const file = fs.readFileSync(outputPath)
    // decodificando o arquivo
    const fileDecoded = wav.decode(file)
    // captando o áudio no índice 0
    const audioData = fileDecoded.channelData[0]
    // convertendo no formato que a I.A utiliza
    const floatArray = new Float32Array(audioData)

    console.log("Vídeo convertido com sucesso")

    resolve(floatArray)
    // deletando o arquivo da pasta após a conversão
    fs.unlinkSync(outputPath)
  })
  // captando erro
  .on("error", (error) => {
    console.log("Erro ao converter vídeo", error)
    reject(error)
  })
  // caso não haja erro, salva o arquivo
  .save(outputPath)
})