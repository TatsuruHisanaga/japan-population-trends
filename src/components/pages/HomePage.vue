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
import { defineComponent, onMounted } from 'vue'
import PrefectureCheckboxList from '@/components/molecules/PrefectureCheckboxList.vue'
import { prefecturesState, fetchPrefecturesData } from '@/utils/prefectures'

export default defineComponent({
  components: {
    PrefectureCheckboxList
  },
  setup() {
    onMounted(async () => {
      await fetchPrefecturesData()
    })

    const onPrefectureChange = async (selectedPrefectures: number[]) => {
      console.log('Selected Prefectures:', selectedPrefectures)
      // TODO: 選択された都道府県の人口構成を取得する処理を追加
    }

    return {
      prefecturesState,
      onPrefectureChange
    }
  }
})
</script>
