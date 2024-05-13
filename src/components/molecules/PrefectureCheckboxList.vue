<!-- components/molecules/PrefectureCheckboxList.vue -->
<template>
  <div>
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
    />
  </div>
</template>

<script lang="ts">
import  { defineComponent, type PropType, ref } from 'vue'
import type { Prefecture } from '@/types/prefecture'
import { populationCompositionState, fetchPopulationCompositionData } from '@/utils/populationComposition'
import CheckboxItem from '@/components/atoms/CheckboxItem.vue'
import PopulationCompositionGraph from '@/components/molecules/PopulationCompositionGraph.vue'

export default defineComponent({
  components: {
    CheckboxItem,
    PopulationCompositionGraph
  },
  props: {
    prefectures: {
      type: Array as PropType<Prefecture[]>,
      required: true
    }
  },
  setup() {
    const selectedPrefectures = ref<number[]>([])

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

    return {
      populationCompositionState,
      selectedPrefectures,
      isChecked,
      onCheckboxChange
    }
  }
})
</script>
