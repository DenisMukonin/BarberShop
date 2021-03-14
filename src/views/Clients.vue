<template>
  <div class="client-change">
    <p>
      <button class="btn" @click="changeTable" :disabled="!isTable">Список клиентов</button>
      <button class="btn" @click="changeTable" :disabled="isTable">Записи на стрижку</button>
    </p>
    <button class="btn warning" @click="modal = !modal" disabled="false">Заблокировать даты на стрижки</button>
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

export default {
  setup() {
    const store = useStore()
    const isTable = ref(false)
    const isDate = ref(false)
    const dateRecord = ref(null)
    const modal = ref(false)

    onMounted(async () => {
      await store.dispatch('record/load')
    })

    watch(dateRecord, values => {
      if (values !== '') {
        isDate.value = true
      } else {
        isDate.value = false
      }
    })

    const dateRec = ref(dateRecord.value)//computed(() => date.value)

    watch(dateRec, value => {
      let dt1 = value.split('.')
      let dt = dt1[2]+'-'+dt1[1]+'-' + dt1[0];
      dateRecord.value = dt
    })

    const records = computed(() => store.getters['record/records'] //recordsDate
            .filter(recDate => {
              if (dateRecord.value) {
                return dateRecord.value === recDate.date//recDate.date.includes(Date.value)
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
