import { reactive } from 'vue'
import { fetchPopulationComposition } from '@/utils/api'
import type { PopulationCompositionData } from '@/types/populationComposition'

export const populationCompositionState = reactive<PopulationCompositionData>({})

export const fetchPopulationCompositionData = async (prefCode: number) => {
  if (!populationCompositionState[prefCode]) {
    const populationComposition = await fetchPopulationComposition(prefCode)
    populationCompositionState[prefCode] = populationComposition.data
  }
}
