<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control form-control-small', {invalid: fError}]">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: pError}]">
      <label for="phone">Телефон</label>
      <input type="tel" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: dError}]" @blur="dBlur" >
      <label for="date">Дата</label>
      <input type="date" id="date" v-model="date" :min="today">
      <small v-if="dError">{{ dError }}</small>
    </div>

    <div :class="['form-control form-control-small', {invalid: tError}]" @blur="tBlur" >
      <label for="time">Время</label>
      <AppOpt id="time" v-model="time" :key="date" :date="date" :time="time" :time-array="timeArray" @select="myChoiceTime"></AppOpt>
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
import {ref,onMounted, computed} from 'vue'
import {todayFunction,choiceTime} from "@/use/my-function";
import AppOptionSelect from "@/components/ui/AppOptionSelect";
import AppOpt from "@/components/ui/AppOpt";

export default {
  emits: ['record'],
  setup(_, {emit}) {
    const store = useStore()
    const today = ref(new Date())
    const dateRecord = ref(null)

    onMounted(async () => {
      today.value = todayFunction()
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
    }

    const {handleSubmit, isSubmitting} = useForm({
      initialValues: {
        status: 'haircut'
      }
    })

    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
        'fio', // название контрола,
        yup.string().trim().required('Введите ФИО') //.name() // набор валидаторов
    )

    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone', // название контрола,
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
        yup.string().required('Введите дату')
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
      today,
      timeArray, myChoiceTime
    }
  },
  components: { AppOptionSelect, AppOpt }
}
</script>

<style scoped>

</style>
