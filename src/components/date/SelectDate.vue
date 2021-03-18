<template>
  <div class="date-select">
    <div class="date-year">
      <div class="date-flex">
        <h3 class="left" @click="year === 2021 ? year = 2021 : year--">&lt;&mdash;</h3>
        <h3>{{year}}</h3>
        <h3 class="right" @click="year === 2050 ? year = 2021 : year++">&mdash;&gt;</h3>
      </div>
    </div>

    <div class="date-mouth">
      <div class="date-flex">
        <h4 class="left" @click="mouth === 0 ? mouth = 11 : mouth--">&lt;&mdash;</h4>
        <h4>{{mouthMap[mouth].name}}</h4>
        <h4 class="right" @click="mouth === 11 ? mouth = 0 : mouth++">&mdash;&gt;</h4>
      </div>
    </div>

    <div class="date-day">
      <label for="day">Выберите день:</label>
      <div id="day">
        <opt-date v-model="day" :map="dayMap" :block="blockDays"></opt-date>
      </div>
    </div>

    <button class="btn warning" v-if="visible" @click="$emit('close-date')">Готово</button>
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue'
import OptDate from "@/components/date/OptDate";
import {useStore} from "vuex";
import {blockDay} from "@/use/my-function";

export default {
  emits: ['update:modelValue', 'close-date'],
  props: ['modelValue', 'visible'],
  setup(props, {emit}) {

    const year = ref(new Date().getFullYear())
    const mouth = ref(new Date().getMonth())
    const day = ref(new Date().getDate())

    const blockDays = ref([])
    let blockDayRecord = null
    let i = 1
    const store = useStore()

    onMounted( async () => {
      blockDayRecord = await store.dispatch('record/loadDateBlock')

      while ( i < new Date().getDate()) {
        blockDays.value.push(i++);
      }

      const test = new Date(year.value, mouth.value, day.value).toLocaleDateString()
      blockDays.value = blockDay(blockDayRecord, blockDays, test)

    })

    const dayMap = ref(33 - new Date(new Date().getFullYear(), new Date().getMonth(), 33).getDate())
    const mouthMap = [
      {value: 1, name: 'Январь'},
      {value: 2, name: 'Февраль'},
      {value: 3, name: 'Март'},
      {value: 4, name: 'Апрель'},
      {value: 5, name: 'Май'},
      {value: 6, name: 'Июнь'},
      {value: 7, name: 'Июль'},
      {value: 8, name: 'Август'},
      {value: 9, name: 'Сентябрь'},
      {value: 10, name: 'Октябрь'},
      {value: 11, name: 'Ноябрь'},
      {value: 12, name: 'Декабрь'},
    ]

    watch(mouth, value => {
      if (value === 1) {
        if (year.value % 4 === 0 ) {
          dayMap.value = 29
        } else  {
          dayMap.value = 28
        }
      } else if (value === 3 || value === 5 || value === 8 || value === 10) {
        dayMap.value = 30
      } else dayMap.value = 31

    })

    watch([year,mouth, day], value => {
      blockDays.value = []

      if (value[0] <= new Date().getFullYear() &&
          value[1] < new Date().getMonth()
      ) {
        i = 1
        while ( i <= dayMap.value) {
          blockDays.value.push(i++);
        }

      } else
        if (value[0] === new Date().getFullYear() &&
            value[1] === new Date().getMonth() ) {
          i = 1
          while ( i < new Date().getDate()) {
            blockDays.value.push(i++);
          }

        }

      const test = new Date(year.value, mouth.value, day.value).toLocaleDateString()
      blockDays.value = blockDay(blockDayRecord, blockDays, test)

      emit('update:modelValue', new Date(value[0], value[1], value[2]).toLocaleDateString())
    })

    return {
      day, mouth, year,
      mouthMap, dayMap,
      blockDays
    }
  },
  components: { OptDate }
}
</script>

<style scoped>

</style>
