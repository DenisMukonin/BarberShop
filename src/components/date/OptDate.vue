<template>
  <select v-model="day" >
    <opt-date-select v-for="d in map" :key="d" :value="d" :test="test"></opt-date-select>
<!--    <option v-for="d in dayMap" :value="d">{{ d }}</option>-->
  </select>
</template>

<script>
import {ref, watch} from 'vue'
import OptDateSelect from "@/components/date/OptDateSelect";

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'map', 'test'],
  setup(props, {emit}) {

    const day = ref(1)
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
