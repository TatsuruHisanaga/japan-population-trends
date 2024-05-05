import { defineStore } from 'pinia'
import { Prefecture } from '@/types/prefecture'
import { fetchPrefectures } from '@/utils/api'

export const usePrefectureStore = defineStore({
  id: 'prefectures',
  state: () => ({
    prefectures: [] as Prefecture[]
  }),
  actions: {
    async fetchPrefectures() {
      this.prefectures = await fetchPrefectures()
    }
  }
})
