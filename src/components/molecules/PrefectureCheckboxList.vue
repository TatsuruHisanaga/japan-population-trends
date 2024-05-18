<!-- components/molecules/PrefectureCheckboxList.vue -->
<template>
  <div class="checkbox-list">
    <PopulationCompositionSelector @data-select="onDataSelect" />
    <div class="checkbox-container">
      <div v-for="prefecture in prefectures" :key="prefecture.prefCode" class="checkbox-wrapper">
        <CheckboxItem
          :value="prefecture.prefCode"
          :checked="isChecked(prefecture.prefCode)"
          @change="onCheckboxChange(prefecture.prefCode, $event)"
        >
          {{ prefecture.prefName }}
        </CheckboxItem>
      </div>
    </div>
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
import CheckboxItem from '@/components/atoms/CheckboxItem.vue'

export default defineComponent({
  components: {
    PopulationCompositionSelector,
    CheckboxItem
  },
  props: {
    prefectures: {
      type: Array as PropType<Prefecture[]>,
      required: true
    }
  },
  setup() {
    const selectedPrefectures = ref<number[]>([])
    const selectedData = ref<number>(0)

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
      selectedData.value = Number(data)
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

<style scoped>
.checkbox-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
}
</style>