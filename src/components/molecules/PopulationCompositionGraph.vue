<template>
  <div>
    <LineChart v-if="chartData.length > 0" :width="600" :height="400" :data="chartData">
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line
        v-for="(pref, index) in populationComposition"
        :key="index"
        type="monotone"
        :dataKey="pref.prefName"
        :stroke="colors[index % colors.length]"
      />
    </LineChart>
    <p v-else>データがありません。</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import type { PopulationComposition } from '@/types/populationComposition'
import PopulationCompositionSelector from '@/components/molecules/PopulationCompositionSelector.vue'

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
      type: Array as PropType<{ prefName: string, data: PopulationComposition[] }[]>,
      required: true
    },
    selectedData: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const colors = ['#8884d8', '#82ca9d', '#ffc658']

    const chartData = computed(() => {
      const allYears = new Set<number>()
      props.populationComposition.forEach(pref => {
        const filteredData = pref.data.find(d => d.label === props.selectedData)
        filteredData?.data.forEach((d: { year: number; }) => {
          allYears.add(d.year)
        })
      })

      const yearsArray = Array.from(allYears).sort((a, b) => a - b)
      const data = yearsArray.map(year => {
        const yearData: any = { year }
        props.populationComposition.forEach(pref => {
          const filteredData = pref.data.find(d => d.label === props.selectedData)
          const yearValue = filteredData?.data.find((d: { year: number; }) => d.year === year)?.value || 0
          yearData[pref.prefName] = yearValue
        })
        return yearData
      })
      return data
    })

    return {
      chartData,
      colors
    }
  }
})
</script>


