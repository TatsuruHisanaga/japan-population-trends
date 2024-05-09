<!-- components/atoms/CheckboxItem.vue -->
<template>
  <label>
    <input
      type="checkbox"
      :value="value"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
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
  }
})
</script>
