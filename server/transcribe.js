// importando o modelo de I.A que transcreve o áudio
import { pipeline } from "@xenova/transformers"

// import { transcriptionExample } from "./utils/transcription.js"
// função para extrair o texto
export async function transcribe(audio) {
  
  // aplicando o modelo no áudio convertido
  try {
    console.log("Realizando a transcrição")
    const transcribe = await pipeline
    ("automatic-speech-recognition",
     "xenova/whisper-small")

     const transcription = await transcribe(audio, {
      //dividindo o conteúdo e definindo a tarefa do modelo
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
     })

     console.log('Transcrição finalizada com sucesso.')
     //retornando o conteúdo da transcrição e retirando a música da transcrição dos vídeos
     return transcription?.text.replace('[Música]', '')
  } catch (error) {
    throw new Error(error)
  }
}