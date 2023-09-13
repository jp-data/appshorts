//importando a biblioteca cors e o express
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())

//criando a rota summary e recuperando o ID do vídeo
app.get('/summary/:id', (req, res) => {
  res.send('ID do vídeo:' + req.params.id)
});

//definindo o número da porta
app.listen(3333, () => console.log("Server is running on port 3333"));