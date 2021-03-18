<template>
  <nav class="navbar navbar-small">
    <div class="navbar-text">
      <h3 v-if="info"> {{ info.fioClient }}</h3>
      <h3 v-else>Barber </h3>
    </div>

    <ul class="navbar-menu navbar-menu-small">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li>
        <router-link to="/login">Войти</router-link>
      </li>
      <li v-if="!auth">
        <router-link to="/register">Зарегистрироваться</router-link>
      </li>
      <li v-if="admin">
        <router-link to="/clients">Клиенты</router-link>
      </li>
      <li v-if="auth">
        <router-link to="/record-info">Профиль</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>

import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from 'vue'

export default {
    setup() {
      const router = useRouter()
      const store = useStore()
      const info = computed(() => store.state.info || null)
      const auth = computed(() => store.getters['login/isAuthenticated'])

      const admin = ref(false)
      if (auth.value) {
        admin.value = info.value.localIdClient === 'K0zzixVPjvXkt98rhr4DCkxxAqf2'
      }

      return {
        info,
        auth,
        admin,
        logout: () => {
          store.commit('login/logout')
          store.commit('clearInfoClient', {root: true})
          router.push('/')
        }
      }
    }
}
</script>

<style scoped>

</style>
