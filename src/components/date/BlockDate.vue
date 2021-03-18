<template>
  <div>
    <label for="mouth">Выберите месяц:</label>
    <select id="mouth" v-model="mouth" >
      <option v-for="m in mouthMap" :value="m.value">{{ m.name }}</option>
    </select>
  </div>
  <div class="select-day">
    <label for="day">Выберите день:</label>
    <p v-if="!mouth">Сначала выберите месяц</p>
    <div v-else>
      <select  id="day" multiple v-model="day" >
          <option  v-for="d in dayMap" :value="d">{{ d }}</option>
      </select>
    </div>
  </div>

  <button class="btn warning" @click="submit">Заблокировать запись на эти даты</button>
  <div>
    <h2>Меcяц - {{mouthMap[mouth-1].name}}</h2>
    <h2>День/дни - {{day}}</h2>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
import {error} from "@/utils/error";

export default {
  setup() {
    const mouth = ref(new Date().getMonth()+1)
    const day = ref([])

    const store = useStore()

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
      if (value === 2) {
        dayMap.value = 28
      } else if (value === 4 || value === 6 ||value === 9 ||value === 11) {
        dayMap.value = 30
      } else dayMap.value = 31

      day.value = []
    })

    const submit = () => {
      try {
        const dateBlock = ref([])
        for (let d in day.value) {
          dateBlock.value.push(new Date(new Date().getFullYear(), mouth.value-1, day.value[d]).toLocaleDateString())
        }
        store.dispatch('record/createDateBlock', dateBlock.value)
      } catch (e) {
        store.dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
      }
    }

    return {
      mouth,
      day,
      mouthMap,
      dayMap,
      submit
    }
  }
}
</script>

<style scoped>

</style>
