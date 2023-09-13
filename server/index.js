//importando a biblioteca cors e o express
import cors from 'cors'
import express from 'express'

import { download } from "./download.js"

const app = express()
app.use(cors())

//criando a rota que recupera o ID do vídeo e usa a função que realiza o download
app.get('/summary/:id', (req, res) => {
  download(req.params.id)
  res.json({ result: "Download do vídeo realizado com sucesso!"})
});

//definindo o número da porta
app.listen(3333, () => console.log("Server is running on port 3333"));