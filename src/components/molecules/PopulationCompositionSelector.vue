<template>
  <div>
    <label>
      <input type="radio" value="総人口" v-model="selectedData" @change="onDataSelect" />
      総人口
    </label>
    <label>
      <input type="radio" value="年少人口" v-model="selectedData" @change="onDataSelect" />
      年少人口
    </label>
    <label>
      <input type="radio" value="生産年齢人口" v-model="selectedData" @change="onDataSelect" />
      生産年齢人口
    </label>
    <label>
      <input type="radio" value="老年人口" v-model="selectedData" @change="onDataSelect" />
      老年人口
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['data-select'],
  setup(_, { emit }) {
    const selectedData = ref('総人口')

    const onDataSelect = () => {
      emit('data-select', selectedData.value)
    }

    return {
      selectedData,
      onDataSelect
    }
  }
})
</script>
