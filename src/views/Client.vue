<template>
  <div class="card client-change" >
    <h1>Информация о записи: </h1>
    <p><strong>Имя клиента: </strong>{{ record.fio }}</p>
    <div>
      <p v-if="!isChange"> <strong>Телефон: </strong>{{ record.phone }}</p>
      <span v-else>
        <label for="phone"> Изменить телефон: </label>
        <input type="text" id="phone"  v-model="record.phone">
      </span>
    </div>
    <div >
      <div v-if="!isChange">
        <p><strong>Дата записи: </strong> {{ record.date }}</p>
      </div>
      <span v-else>
        <label for="date"> Изменить дату записи: </label>
        <input v-if="!isSelectDate" @click="isSelectDate = !isSelectDate" v-model="record.date"  type="date" id="date">
        <div class="form-control" v-else>
          <select-date v-model="dateRec" @close-date="isSelectDate = !isSelectDate" visible="true" ></select-date>
          <h3>{{dateRec}}</h3>
        </div>
<!--        <input type="date" id="date" v-model="record.date" :min="today">-->
      </span>
    </div>
    <div>
      <p v-if="!isChange"><strong>Время записи: </strong>{{ record.time }}</p>
      <span v-else >
        <label for="time"> Изменить время: </label>
        <AppOpt id="time" v-model="record.time" :key="record.date" :date="record.date" :time="record.time" :time-array="timeArray" @select="myChoiceTime"></AppOpt>
      </span>
    </div>
    <div >
      <p v-if="!isChange"><strong>Повод посещения: </strong> {{ changeStatus(record.status) }}</p>
      <span v-else>
          <label for="type"> Изменить повод посещения: </label>
          <select id="type" v-model="record.status">
            <option value="haircut">Стрижка</option>
            <option value="correction">Коррекция стрижки</option>
            <option value="children">Детская стрижка</option>
            <option value="modeling">Моделирование бороды и усов</option>
            <option value="beard">Коррекция бороды и усов</option>
            <option value="chat">Просто поболать</option>
          </select>
        </span>
    </div>


    <button class="btn" v-if="!isChange" @click="isChange = !isChange">Изменить</button>
    <div v-else>
      <button class="btn" @click="update">Обновить</button>
      <button class="btn warning" @click="isChange = !isChange">Скрыть редактирование</button>
      <button class="btn danger" @click="remove">Удалить </button>
    </div>


  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref, computed, watch, onMounted} from 'vue'
import {todayFunction, changeStatus, choiceTime} from "@/use/my-function";
import AppOptionSelect from "@/components/ui/AppOptionSelect";
import AppOpt from "@/components/ui/AppOpt";
import SelectDate from "@/components/date/SelectDate";

export default {
  name: 'Client',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const record = ref({})
    const isChange = ref(false)
    const today = ref(new Date())

    const isSelectDate = ref(false)

    onMounted(async () => {
      record.value = await store.dispatch('record/loadOne', route.params.id)
      today.value = todayFunction()
      myChoiceTime()
    })

    const records = computed(() => store.getters['record/records'])
    const timeArray = ref()

    const myChoiceTime = () => {
      const arr = records.value.filter(recDate => {
        return record.value.date === recDate.date
      })

      timeArray.value =  choiceTime(arr)
    }


    const dateRec = ref(record.date)
    watch(dateRec, value => {
      let dt1 = value.split('.') //2014-04-03
      let dt = dt1[2]+'-'+dt1[1]+'-' + dt1[0];
      record.value.date = dt
    })

    const remove = async () => {
      await store.dispatch('record/remove', {idClient: store.getters['record/idClient'], id:route.params.id})
      router.push('/clients')
    }

    const update = async () => {
      await store.dispatch('record/update', {...record.value})
      isChange.value = !isChange.value
    }

    const id = route.params.id
    return {
      id,
      remove,
      update,
      record,
      isChange,
      today,
      changeStatus,
      timeArray, myChoiceTime,
      isSelectDate, dateRec
    }
  },
  components: { AppOptionSelect, AppOpt, SelectDate }
}
</script>

<style scoped>

</style>
