import axios from 'axios'

const API_KEY = import.meta.env.VITE_RESAS_API_KEY
const API_URL = 'https://opendata.resas-portal.go.jp'

export const fetchPrefectures = async () => {
  const response = await axios.get(`${API_URL}/api/v1/prefectures`, {
    headers: { 'X-API-KEY': API_KEY }
  })
  return response.data.result
}

export const fetchPopulationComposition = async (prefCode: number) => {
  const response = await axios.get(
    `${API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: { 'X-API-KEY': API_KEY },
    }
  )
  return response.data.result
}