<template>
  <div class="client-change">
    <p>
      <button class="btn" @click="changeTable" :disabled="!isTable">Список клиентов</button>
      <button class="btn" @click="changeTable" :disabled="isTable">Записи на стрижку</button>
    </p>
    <button class="btn warning" @click="modal = !modal">Заблокировать даты на стрижки</button>
    <teleport to="body">
      <app-model title="Заблокировать даты" v-if="modal" @close="modal = false">
        <block-date></block-date>
      </app-model>
    </teleport>

    <hr>
    <h1>{{ isTable ? 'Список записей на стрижку' : 'Список клиентов' }}</h1>
    <record-table v-if="!isTable" :records="records"></record-table>

    <div v-else>
      <div class="date-input">
        <label for="date">Выберите дату:</label>
        <input type="date" id="date" v-model="dateRecord">
      </div>
      <div>
        <div class="form-control card">
          <select-date v-model="dateRec" ></select-date>
          <h3>{{dateRec}}</h3>
        </div>
      </div>

      <record-table-date v-if="isDate" :records="records"></record-table-date>
    </div>
  </div>

</template>

<script>
import AppModel from "@/components/ui/AppModel";
import RecordTable from "@/components/record/RecordTable";
import RecordTableDate from "@/components/record/RecordTableDate";
import BlockDate from "@/components/date/BlockDate";
import SelectDate from "@/components/date/SelectDate";
import {useStore} from 'vuex'
import {ref, computed, watch, onMounted} from 'vue'
import {useRouter} from "vue-router";

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isTable = ref(false)
    const isDate = ref(false)
    const dateRecord = ref()

    // НЕ работает
    // if (!isTable.value) {
    //   function month () {
    //     if ((new Date().getMonth()+1).toString().length === 1) {
    //       return ('0' + (new Date().getMonth()+1).toString())
    //     }
    //     return (new Date().getMonth()+1).toString()
    //   }
    //
    //   dateRecord.value = new Date().getFullYear() + '-'+ month()  + '-' + new Date().getDate()
    // }

    const modal = ref(false)
    const auth = computed(() => store.getters['login/isAuthenticated'])

    onMounted(async () => {
      if (auth.value) {
        await store.dispatch('record/load')
      } else {
        store.commit('login/logout')
        router.push('/')
      }
    })

    watch(dateRecord, values => {
      if (values !== '') {
        isDate.value = true
      } else {
        isDate.value = false
      }
    })

    const dateRec = ref(dateRecord.value)

    watch(dateRec, value => {
      let dt1 = value.split('.')
      let dt = dt1[2]+'-'+dt1[1]+'-' + dt1[0];
      dateRecord.value = dt
    })

    const records = computed(() => store.getters['record/records']
            .filter(recDate => {
              if (dateRecord.value) {
                return dateRecord.value === recDate.date
              }
              return recDate
            })
            .sort(function (a, b) {
              if (a.date > b.date) {
                return 1;
              }
              if (a.date < b.date) {
                return -1;
              }
              if (a.time > b.time) {
                return 1;
              }
              if (a.time < b.time) {
                return -1;
              }
              return 0;
            })
    )

    return{
      records,
      isTable,isDate,
      dateRecord,
      changeTable: () => {
        isTable.value = !isTable.value
        dateRecord.value = null
      },
      modal,
      dateRec,
      block: () => {

      }
    }
  },
  components: {RecordTableDate, AppModel , RecordTable, BlockDate, SelectDate}
}
</script>

<style scoped>

</style>
