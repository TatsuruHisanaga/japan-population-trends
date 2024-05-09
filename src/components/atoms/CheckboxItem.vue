<!-- components/atoms/CheckboxItem.vue -->
<template>
  <label>
    <input 
      type="checkbox" 
      :value="value" 
      :checked="checked" 
      @change="onChange($event)" 
    />
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  methods: {
    onChange(event: Event) {
      const target = event.target as HTMLInputElement
      if (target) {
        this.$emit('change', target.checked)
      }
    }
  }
})
</script>
