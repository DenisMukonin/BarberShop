<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Вход в программу</h1>
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

    <button class="btn" type="submit" :disabled="isSubmitting">Войти</button>
    <p>Нет аккаунта? <router-link to="/register">Зарегестрироваться</router-link></p>
    <hr/>
    <p>Вернуться на главную: <router-link to="/">Главная</router-link></p>
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


    const onSubmit = handleSubmit(async values => {
      console.log('FormLogin', values)
      try {
        await store.dispatch('login/login', values)
        router.push('/')
      }
      catch (e) {
      }
    })

    return{
      email, eError, eBlur,
      password, pError, pBlur,
      onSubmit, isSubmitting,
    }
  }
}
</script>

<style scoped>

</style>
