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
import {ref, onMounted} from 'vue'

export default {
  setup() {
    const store = useStore()
    const records = ref({})
    const info = ref(null)

    onMounted(async () => {
      records.value = await store.dispatch('record/loadOneClient')
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
