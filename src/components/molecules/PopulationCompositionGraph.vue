<template>
  <div>
    <LineChart :width="600" :height="400" :data="populationCompositionData">
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import type { PopulationComposition } from '@/types/populationComposition'

export default defineComponent({
  name: 'PopulationCompositionGraph',
  components: {
    LineChart,
    // eslint-disable-next-line vue/no-reserved-component-names
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    // eslint-disable-next-line vue/no-reserved-component-names
    Legend
  },
  props: {
    populationComposition: {
      type: Array as PropType<PopulationComposition[]>,
      required: true
    },
    selectedData: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const populationCompositionData = computed(() => {
      return props.populationComposition.filter((item) => item.year === props.selectedData)
    })

    return {
      populationCompositionData
    }
  }
})
</script>
