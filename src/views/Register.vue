<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Регистрация в приложении</h1>
    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Введите Email</label>
      <input type="text" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: eError}]">
      <label for="password">Введите пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div :class="['form-control', {invalid: fError}]">
      <label for="fio">Введите ФИО</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div :class="['form-control', {invalid: phError}]">
      <label for="phone">Введите телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="phBlur">
      <small v-if="phError">{{ phError }}</small>
    </div>

    <button class="btn" type="submit" :disabled="isSubmitting">Войти</button>
    <p>Уже есть аккаунта! <router-link to="/login">Вход в систему</router-link></p>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import * as yup from 'yup'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const { handleSubmit, isSubmitting } = useForm()

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField('email',
        yup.string().trim().required('Введите емаил').email('Введите корректный емаил')
    )

    const PASSWORD_MIN_LEN = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
        yup.string().trim()
            .required('Введите пароль')
            .min(PASSWORD_MIN_LEN,`Пароль должен быть не меньше ${PASSWORD_MIN_LEN}`)
    )

    const { value: fio, errorMessage:fError, handleBlur: fBlur } = useField('fio',
        yup.string().trim().required('Введите имя')
    )

    const { value: phone, errorMessage:phError, handleBlur: phBlur } = useField('phone',
        yup.string().trim()
    )

    const onSubmit = handleSubmit(async values => {
      console.log('FormRegister', values)
      try {
        await store.dispatch('login/register', values)
        router.push('/')
      }
      catch (e) {
      }
    })

    return{
      email, eError, eBlur,
      password, pError, pBlur,
      phone, phError, phBlur,
      fio, fError, fBlur,
      onSubmit, isSubmitting,
    }
  }
}
</script>

<style scoped>

</style>
