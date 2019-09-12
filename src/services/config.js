import axios from 'axios'


export const http = axios.create({
    baseURL: 'https://apirest-gorila.herokuapp.com/api/'
})