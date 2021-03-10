<template>
  <div class="content record" id="">
    <h3>Буду рад видеть вас у себя</h3>
    <h4>Все о моих услугах вы сможете найти на этой странице. А так же, можете прямо сейчас записаться на стрижку!</h4>

    <teleport to="body">
      <app-model title="Записаться" v-if="modal" @close="modal = false">
        <record-model @record="modal = false"></record-model>
      </app-model>
    </teleport>
    <button class="btn warning btn-size" :disabled="!auth" @click="modal = !modal">Записаться на стрижку</button>
    <p v-if="!auth">Чтобы записаться на стрижку, нужно
      <router-link class="record-link" to="/login">войти в систему</router-link> или
      <router-link class="record-link" to="/register">зарегистрироваться</router-link></p>
  </div>
</template>

<script>
import AppModel from "@/components/ui/AppModel";
import RecordModel from "@/components/record/RecordModel";
import {useStore} from "vuex";
import {ref, computed} from 'vue'

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const hover = ref(false)
    const auth = computed(() => store.getters['login/isAuthenticated'])

    return{
      modal,
      auth,
      hover
    }
  },
  components: { AppModel, RecordModel }
}
</script>

<style scoped>

</style>
