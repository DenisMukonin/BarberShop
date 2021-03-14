<template>
  <select :disabled="!date" v-model="timeSelect" @click="$emit('select', timeSelect)" >
    <AppOptionSelect v-for="ta in timeArray" v-model="time"  :key="ta.value" :value="ta.value" :text="ta.text" :is-disable="ta.isDisable"></AppOptionSelect>
  </select>
</template>

<script>
import AppOptionSelect from "@/components/ui/AppOptionSelect";
import {ref, watch} from 'vue'

export default {
  emits: ['select', 'update:modelValue'],
  props:['modelValue', 'time', 'date', 'timeArray'],
  setup(_, {emit}) {
    const timeSelect = ref()

    watch(timeSelect, value => {
      emit('update:modelValue', value)
      console.log('vsvs', value)
    })

    return {
      timeSelect
    }
  },
  components: { AppOptionSelect }
}
</script>

<style scoped>

</style>
