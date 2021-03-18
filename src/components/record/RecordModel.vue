<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control form-control-small', {invalid: fError}]">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: pError}]">
      <label for="phone">Телефон</label>
      <input type="tel" id="phone"  v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: dError}]" @blur="dBlur" >
      <label for="date">Дата</label>
      <input v-if="isSelectDate"  @click="isSelectDate = !isSelectDate" v-model="date" type="date" id="date">
      <div v-else>
        <select-date v-model="dateRec" @close-date="myChoiceTime" visible="true"></select-date>
        <h3>Выбранная дата: {{dateRec}}</h3>
      </div>
      <small v-if="dError">{{ dError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: tError}]" @blur="tBlur" >
      <label for="time">Время</label>
      <AppOpt id="time" v-model="time" :key="date" :date="date" :time="time" :time-array="timeArray">
      </AppOpt>
      <small v-if="tError">{{ tError }}</small>
    </div>

    <div class="form-control form-control-small">
      <label for="status">Вид стрижки</label>
      <select id="status" v-model="status">
        <option value="haircut">Стрижка</option>
        <option value="correction">Коррекция стрижки</option>
        <option value="children">Детская стрижка</option>
        <option value="modeling">Моделирование бороды и усов</option>
        <option value="beard">Коррекция бороды и усов</option>
        <option value="chat">Просто поболать</option>
      </select>
    </div>

    <button class="btn" type="submit" :disabled="isSubmitting">Создать заявку</button>
  </form>
</template>

<script>
import {useStore} from "vuex";
import {useField, useForm} from "vee-validate";
import * as yup from 'yup'
import {ref,onMounted, computed, watch} from 'vue'
import {todayFunction, choiceTime, myValidateDate} from "@/use/my-function";
import AppOptionSelect from "@/components/ui/AppOptionSelect";
import AppOpt from "@/components/ui/AppOpt";
import SelectDate from "@/components/date/SelectDate";

export default {
  emits: ['record'],
  setup(_, {emit}) {
    const store = useStore()
    const dateRecord = ref(null)
    const isSelectDate = ref(false)

    onMounted(async () => {
      date.value = todayFunction()
      myChoiceTime()
    })

    const records = computed(() => store.getters['record/records'])
    const timeArray = ref()

    function myChoiceTime() {
      dateRecord.value = date.value
      const arr = records.value.filter(recDate => {
        return date.value === recDate.date
      })
      timeArray.value = choiceTime(arr)
      isSelectDate.value = !isSelectDate.value
    }

    const dateRec = ref(date)
    watch(dateRec, value => {
      let dt1 = value.split('.')
      let dt = dt1[2]+'-'+dt1[1]+'-' + dt1[0];
      date.value = dt

      const isD = myValidateDate(date.value)
      if (!isD) {
        date.value = null
      }
    })

    const {handleSubmit, isSubmitting} = useForm({
      initialValues: {
        status: 'haircut',
        date: new Date().toLocaleDateString()
      }
    })

    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
        'fio',
        yup.string().required('Введите ФИО')
    )

    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone',
        yup.string()
            .trim()
            // .typeError('Это не похоже на номер телефона')
            // .positive('Номер телефона не может начинаться с минуса')
            // .integer('Номер телефона не может содержать десятичную точку')
            // .min(5)
            .required('Введите номер телефона')
    )

    const {value: date, errorMessage: dError, handleBlur: dBlur} = useField(
        'date',
        yup.string()
        .nullable()
        .required('Введите дату или была Введена дата в прошлое')
    )

    const {value: time, errorMessage: tError, handleBlur: tBlur} = useField(
        'time',
        yup.string().required('Выберите время')
    )

    const {value: status} = useField('status')

    const onSubmit = handleSubmit(async values => {
      try {
        await store.dispatch('record/create', values)
        emit('record')
      }
      catch (e) {
        emit('record')
      }
    })

    return {
      fio, fError, fBlur,
      phone, pError, pBlur,
      time, tError, tBlur,
      date, dError, dBlur,
      status,
      onSubmit, isSubmitting,
      timeArray, myChoiceTime,
      isSelectDate, dateRec
    }
  },
  components: { AppOptionSelect, AppOpt, SelectDate }
}
</script>

<style scoped>

</style>
