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

    <button class="btn" type="submit" :disabled="isSubmitting">Зарегистрироваться</button>
    <p>Уже есть аккаунт! <router-link to="/login">Вход в систему</router-link></p>
  </form>
</template>

<script>
import {useRecordForm} from "@/use/record-form";

export default {
  setup() {
    return {
      ...useRecordForm()
    }
  }
}
</script>

<style scoped>

</style>
