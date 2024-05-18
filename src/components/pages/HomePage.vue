<template>
  <div>
    <h3>都道府県一覧</h3>
    <PrefectureCheckboxList :prefectures="prefecturesState" @change="onPrefectureChange" />
    <PopulationCompositionGraph
      :population-composition="filteredPopulationComposition"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import PrefectureCheckboxList from '@/components/molecules/PrefectureCheckboxList.vue'
import { prefecturesState, fetchPrefecturesData } from '@/utils/prefectures'
import PopulationCompositionGraph from '@/components/molecules/PopulationCompositionGraph.vue'
import {
  populationCompositionState,
  fetchPopulationCompositionData
} from '@/utils/populationComposition'
import type { Prefecture } from '@/types/prefecture'
export default defineComponent({
  components: {
    PrefectureCheckboxList,
    PopulationCompositionGraph
  },
  setup() {
    const selectedPrefectures = ref<number[]>([])

    onMounted(async () => {
      await fetchPrefecturesData()
    })

    const onPrefectureChange = async (selectedPrefCodes: number[]) => {
      selectedPrefectures.value = selectedPrefCodes
      await Promise.all(
        selectedPrefCodes.map((prefCode) => fetchPopulationCompositionData(prefCode))
      )
    }

    const filteredPopulationComposition = computed(() => {
      return selectedPrefectures.value.map(prefCode => {
        const prefecture = prefecturesState.find((pref: Prefecture) => pref.prefCode === prefCode)
        const prefName = prefecture ? prefecture.prefName : ''
        const data = populationCompositionState[prefCode] || []
        return { prefName, data }
      })
    })

    return {
      prefecturesState,
      selectedPrefectures,
      filteredPopulationComposition,
      onPrefectureChange
    }
  }
})
</script>