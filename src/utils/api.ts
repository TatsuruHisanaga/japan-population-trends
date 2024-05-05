import axios from 'axios'

const API_KEY = 'xx'
const API_URL = 'https://opendata.resas-portal.go.jp'

export const fetchPrefectures = async () => {
  const response = await axios.get(`${API_URL}/api/v1/prefectures`, {
    headers: { 'X-API-KEY': API_KEY },
  })
  return response.data.result
}