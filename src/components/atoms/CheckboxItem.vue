<!-- components/atoms/CheckboxItem.vue -->
<template>
  <label class="checkbox-item">
    <input 
      type="checkbox" 
      :value="value" 
      :checked="checked" 
      @change="onChange($event)" 
    />
    <span><slot></slot></span>
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

<style scoped>
.checkbox-item {
  display: flex;
  align-items: center;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s;
}

.checkbox-item input {
  margin-right: 8px;
}

.checkbox-item:hover {
  background-color: var(--theme-color-surface1);
}
</style>
