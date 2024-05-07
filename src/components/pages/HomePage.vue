<template>
  <div>
    <h1>都道府県一覧</h1>
    <ul>
      <li v-for="prefecture in prefecturesStore.prefectures" :key="prefecture.prefCode">
        {{ prefecture.prefName }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePrefecturesStore } from '@/stores/prefectures'

export default defineComponent({
  setup() {
    const prefecturesStore = usePrefecturesStore()

    prefecturesStore.fetchPrefectures()

    return {
      prefecturesStore
    }
  }
})
</script>
