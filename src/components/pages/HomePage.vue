<template>
  <div>
    <h1>都道府県一覧</h1>
    <PrefectureCheckboxList
      :prefectures="prefecturesStore.prefectures"
      @change="onPrefectureChange"
    <PopulationCompositionGraph
      v-for="prefCode in selectedPrefectures"
      :key="prefCode"
      :population-composition="populationCompositionState[prefCode] || []"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import PrefectureCheckboxList from '@/components/molecules/PrefectureCheckboxList.vue'
import { prefecturesState, fetchPrefecturesData } from '@/utils/prefectures'
import PopulationCompositionGraph from '../molecules/PopulationCompositionGraph.vue'
import {
  populationCompositionState,
  fetchPopulationCompositionData
} from '@/utils/populationComposition'

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

    return {
      prefecturesState,
      selectedPrefectures,
      populationCompositionState,
      onPrefectureChange
    }
  }
})
</script>
