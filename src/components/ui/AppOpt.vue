<template>
  <select :disabled="!date" v-model="timeSelect" @click="$emit('select', timeSelect)" >
    <AppOptionSelect v-for="ta in timeArray" v-model="time"  :key="ta.value" :value="ta.value" :text="ta.text" :is-disable="ta.isDisable"></AppOptionSelect>
  </select>
</template>

<script>
import AppOptionSelect from "@/components/ui/AppOptionSelect";
import {ref} from 'vue'

export default {
  emits: ['select'],
  props:['time', 'date', 'timeArray'],
  setup() {
    const timeSelect = ref()
    return {
      timeSelect
    }
  },
  components: { AppOptionSelect }
}
</script>

<style scoped>

</style>
