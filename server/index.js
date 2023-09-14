//importando a biblioteca cors e o express
import cors from 'cors'
import express from 'express'

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js" 

const app = express()
app.use(express.json())
app.use(cors())

//criando a rota que recupera o ID do vídeo e usa a função que realiza o download
app.get('/summary/:id', async(req, res) => {
  await download(req.params.id)
  const result = await transcribe()

  return res.json({ result })
})

// rota que recupera a URL do vídeo no forms
app.post("/summary", async (req, res) => {
  const result = await summarize(req.body.text)
  return res.json({ result })
})

//definindo o número da porta
app.listen(3333, () => console.log("Server is running on port 3333"))