<template>
  <div class="info-client info-client-small" >
    <div>
      <div v-if="isAuth" >
        <h4 @click="changeClient">Пользовательские данные <span @click="closeInfo">&times;</span></h4>
        <div v-if="isClient">
          <p>Email: {{ info.emailClient }}</p>
          <p>Name: {{ info.fioClient }}</p>
          <p>Phone: {{ info.phoneClient }}</p>
        </div>
      </div>
      <div v-else>
        <h4>Для доступа к полному функционалу войдите в систему или зарегестрируйтесь
          <span @click="closeInfo">&times;</span>
        </h4>
        <p><router-link to="/login">Войти</router-link> / <router-link to="/register">Зарегистрироваться</router-link></p>
      </div>
    </div>

    <div class="info-client-menu">
      <ul @click="closeInfo">
        <li>
          <a href="#information" >Информация</a>
        </li>
        <li>
          <a href="#about">О себе</a>
        </li>
        <li>
          <a href="#record">Записаться</a>
        </li>
        <li>
          <a href="#gallery">Галерея</a>
        </li>
        <li>
          <a href="#price">Услуги и цены</a>
        </li>
        <li>
          <a href="#reviews">Отзывы</a>
        </li>
        <li>
          <a href="#address">Адрес</a>
        </li>
        <li>
          <a href="#footer">Контакты</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref,computed} from 'vue'

export default {
  emits: ['openMenu'],
  props: ['info'],
  setup(props, { emit } ) {
    const store = useStore()
    const isAuth = computed(() => store.getters['login/isAuthenticated'])
    const isClient = ref(false)

    return {
      isAuth,
      isClient,
      changeClient: () => isClient.value = !isClient.value,
      closeInfo: () => {
        emit('openMenu')
        store.commit('closeInfoClient')
      }

    }
  }
}
</script>

<style scoped>


</style>
