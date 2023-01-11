import axios from 'axios'

const API_TIMEOUT = 120000
const API_HEADERS_TOKEN = {
  'content-type': 'application/json',
}

const APICALL = axios.create({
  baseURL: 'https://getjadwal.api.devcode.gethired.id',
  responseType: 'json',
  withCredentials: true,
  headers: API_HEADERS_TOKEN,
  timeout: API_TIMEOUT,
})

export default APICALL
