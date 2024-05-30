import axios from 'axios'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_RESAS_API_KEY
const API_URL = 'https://opendata.resas-portal.go.jp'

export const populationCompositionState = ref<{ [key: number]: any }>({})

export const fetchPrefectures = async () => {
  const response = await axios.get(`${API_URL}/api/v1/prefectures`, {
    headers: { 'X-API-KEY': API_KEY }
  })
  return response.data.result
}

export const fetchPopulationCompositionData = async (prefCode: number) => {
  const response = await axios.get(
    `${API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: { 'X-API-KEY': API_KEY },
    }
  )
  populationCompositionState.value[prefCode] = response.data.result.data
}

