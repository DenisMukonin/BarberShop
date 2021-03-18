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
    <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
    <hr/>
    <p>Вернуться на главную: <router-link to="/">Главная</router-link></p>
  </form>
</template>

<script>
import {useLoginForm} from "@/use/login-form";

export default {
  setup() {
    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
