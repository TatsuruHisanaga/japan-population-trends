<template>
  <div>
    <h1>都道府県一覧</h1>
    <PrefectureCheckboxList
      :prefectures="prefecturesStore.prefectures"
      @change="onPrefectureChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePrefecturesStore } from '@/stores/prefectures'
import PrefectureCheckboxList from '@/components/molecules/PrefectureCheckboxList.vue'

export default defineComponent({
  components: {
    PrefectureCheckboxList
  },
  setup() {
    const prefecturesStore = usePrefecturesStore()

    prefecturesStore.fetchPrefectures()

    const onPrefectureChange = async (selectedPrefectures: number[]) => {
      console.log('Selected Prefectures:', selectedPrefectures)
      // TODO: 選択された都道府県の人口構成を取得する処理を追加
    }
    return {
      prefecturesStore,
      onPrefectureChange
    }
  }
})
</script>
