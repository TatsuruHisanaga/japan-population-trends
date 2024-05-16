<!-- components/molecules/PrefectureCheckboxList.vue -->
<template>
  <div>
    <PopulationCompositionSelector @data-select="onDataSelect" />
    <div v-for="prefecture in prefectures" :key="prefecture.prefCode">
      <CheckboxItem
        :value="prefecture.prefCode"
        :checked="isChecked(prefecture.prefCode)"
        @change="onCheckboxChange(prefecture.prefCode, $event)"
      >
        {{ prefecture.prefName }}
      </CheckboxItem>
    </div>
    <PopulationCompositionGraph
      v-for="prefCode in selectedPrefectures"
      :key="prefCode"
      :population-composition="populationCompositionState[prefCode] || []"
      :selected-data="selectedData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type { Prefecture } from '@/types/prefecture'
import {
  populationCompositionState,
  fetchPopulationCompositionData
} from '@/utils/populationComposition'
import PopulationCompositionSelector from '@/components/molecules/PopulationCompositionSelector.vue'
import PopulationCompositionGraph from '@/components/molecules/PopulationCompositionGraph.vue'
import CheckboxItem from '@/components/atoms/CheckboxItem.vue'

export default defineComponent({
  components: {
    PopulationCompositionSelector,
    PopulationCompositionGraph,
    CheckboxItem
  },
  props: {
    prefectures: {
      type: Array as PropType<Prefecture[]>,
      required: true
    }
  },
  setup(props) {
    const selectedPrefectures = ref<number[]>([])
    const selectedData = ref('総人口')

    const isChecked = (prefCode: number) => {
      return selectedPrefectures.value.includes(prefCode)
    }

    const onCheckboxChange = async (prefCode: number, checked: boolean) => {
      if (checked) {
        selectedPrefectures.value.push(prefCode)
        await fetchPopulationCompositionData(prefCode)
      } else {
        selectedPrefectures.value = selectedPrefectures.value.filter((code) => code !== prefCode)
      }
    }

    const onDataSelect = (data: string) => {
      selectedData.value = data
    }

    return {
      selectedPrefectures,
      selectedData,
      populationCompositionState,
      isChecked,
      onCheckboxChange,
      onDataSelect
    }
  }
})
</script>
