<template>
  <div>
    <h3>都道府県一覧</h3>
    <PrefectureCheckboxList :prefectures="prefecturesState" @change="onPrefectureChange" />
    <PopulationCompositionGraph
      v-for="prefCode in selectedPrefectures"
      :key="prefCode"
      :population-composition="populationCompositionState[prefCode] || []"
      :selected-data="selectedData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
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
    const selectedData = ref<number>(0)
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
      selectedData,
      onPrefectureChange
    }
  }
})
</script>
