<template>
  <div>
    <!-- グラフコンポーネントの実装 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { PopulationComposition } from '@/types/populationComposition';

export default defineComponent({
  name: 'PopulationCompositionGraph',
  props: {
    populationComposition: {
      type: Array as PropType<PopulationComposition[]>,
      required: true,
    },
  },
  // グラフコンポーネントの実装
});
</script>