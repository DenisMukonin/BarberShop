<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Время</th>
      <th>ФИО</th>
      <th>Телефон</th>
      <th>Вид посещения</th>
      <th>Просмотр</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(r, idx) in records" :key="r.id">
      <td>{{ idx +1 }}</td>
      <td>{{ r.time }}</td>
      <td>{{ r.fio }}</td>
      <td>{{ r.phone }}</td>
      <td>{{ changeStatus(r.status) }}</td>
      <td>
        <router-link v-slot="{navigate}" :to="{name: 'Client', params: {id: r.id}}">
          <button class="btn danger" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>

  <h3 v-if="records.length === 0" class="text-center">Записей на эту дату пока нет</h3>
</template>

<script>
import {changeStatus} from "@/use/my-function";

export default {
  props: ['records'],
  setup() {
    return {
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>
