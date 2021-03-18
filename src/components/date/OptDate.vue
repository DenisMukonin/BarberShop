<template>
  <select v-model="day" >
    <opt-date-select v-for="d in map" :key="d" :value="d" :block="block"></opt-date-select>
  </select>
</template>

<script>
import {ref, watch} from 'vue'
import OptDateSelect from "@/components/date/OptDateSelect";

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'map', 'block'],
  setup(props, {emit}) {

    // let i = 1
    // while (props.block.includes(i.toString())) {
    //   i++
    // }
    // const day = ref(i)

    const day = ref(props.modelValue)
    watch(day, value => {
      emit('update:modelValue', value)
    })

    return {
      day
    }
  },
  components: { OptDateSelect }
}
</script>

<style scoped>

</style>
