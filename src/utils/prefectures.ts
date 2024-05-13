import { reactive } from 'vue'
import type { Prefecture } from '@/types/prefecture'
import { fetchPrefectures } from '@/utils/api'

export const prefecturesState = reactive<Prefecture[]>([])

export const fetchPrefecturesData = async () => {
  prefecturesState.splice(0, prefecturesState.length, ...(await fetchPrefectures()))
}
