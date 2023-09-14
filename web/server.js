import axios from "axios"


//configuração do axios
export const server = axios.create({
  //definindo a porta para todas as requisições 
  baseURL: "http://localhost:3333"
})