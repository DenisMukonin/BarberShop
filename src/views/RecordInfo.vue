<template>
  <h1>Мои данные:</h1>

  <div v-if="info">
    <p>Имя: {{ info.fioClient }}</p>
    <p>Email: {{ info.emailClient }}</p>
    <p>Телефон: {{ info.phoneClient }}</p>
  </div>

  <h1>Мои записи: </h1>
  <record-table-info :records="records"></record-table-info>

</template>

<script>
import RecordTableInfo from '@/components/record/RecordTableInfo';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const records = ref({})
    const info = ref(null)
    const auth = computed(() => store.getters['login/isAuthenticated'])

    onMounted(async () => {
      if (auth.value) {
        records.value = await store.dispatch('record/loadOneClient')
      } else {
        store.commit('login/logout')
        router.push('/')
      }
    })

    info.value = store.state.info

    return {
      records,
      info
    }
  },
  components: { RecordTableInfo }
}

</script>

<style scoped>

</style>
