<template>
  <div v-if="message" class="alert" :class="[message.type]">
    <span class="alert-close" @click="close">&times;</span>
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p class="alert-title">{{ message.value }}</p>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Успешно',
      danger: 'Ошибка',
      warning: 'Предупреждение'
    }

    const message = computed(() => store.state.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    return {
      message,
      title,
      close: () => {store.commit('clearMessage')}
    }
  }
}
</script>

<style scoped>

</style>
