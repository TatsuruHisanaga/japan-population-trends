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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Prefecture } from '@/types/prefecture'
import CheckboxItem from '@/components/atoms/CheckboxItem.vue'

export default defineComponent({
  components: {
    CheckboxItem
  },
  props: {
    prefectures: {
      type: Array as PropType<Prefecture[]>,
      required: true
    }
  },
  data() {
    return {
      selectedPrefectures: [] as number[]
    }
  },
  methods: {
    isChecked(prefCode: number) {
      return this.selectedPrefectures.includes(prefCode)
    },
    onCheckboxChange(prefCode: number, checked: boolean) {
      if (checked) {
        this.selectedPrefectures.push(prefCode)
      } else {
        this.selectedPrefectures = this.selectedPrefectures.filter((code) => code !== prefCode)
      }
      this.$emit('change', this.selectedPrefectures)
    }
  }
})
</script>
