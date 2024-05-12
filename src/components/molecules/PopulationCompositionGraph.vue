<template>
  <div>
    <LineChart :width="600" :height="400" :data="populationCompositionData" >
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
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { PopulationComposition } from '@/types/populationComposition';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    Legend,
  },
  props: {
    populationComposition: {
      type: Array as PropType<PopulationComposition[]>,
      required: true,
    },
  },
  computed: {
    populationCompositionData(): { year: number; value: number }[] {
      return this.populationComposition.map((data) => ({
        year: data.year,
        value: data.value,
      }));
    },
  },
});
</script>