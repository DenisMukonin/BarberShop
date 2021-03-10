<template>
  <div class="reviews-form">
    <h3>Оставить отзыв:</h3>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" type="text" disabled="true"  v-model="name">
      </div>
      <div class="form-control" >
        <label for="email">Email</label>
        <input id="email" type="text" disabled="true" v-model="email">
      </div>
      <div class="form-control">
        <label for="appraisal">Оценка</label>
        <select id="appraisal" v-model="appraisal">
          <option value="-1">Поставте оценку</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div :class="['form-control', {invalid: rError}]">
        <label for="reviews">Ваш отзыв:</label>
        <textarea id="reviews" v-model="reviews"></textarea>
        <small v-if="rError">{{ rError }}</small>
      </div>
      <button class="btn warning" type="submit" :disabled="isSubmitting">Отправить отзыв</button>
    </form>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import {useStore} from 'vuex'
import * as yup from 'yup'

export default {
  setup() {
    const store = useStore()

    const { handleSubmit, isSubmitting } = useForm()

    const { value: name } = useField('name')
    const { value: email } = useField('email')
    const { value: appraisal } = useField('appraisal')
    const { value: reviews, errorMessage: rError, handleBlur: rBlur } = useField('reviews',
        yup.string().required('Введите ваш отзыв')
    )

    name.value = store.state.info?.fioClient
    email.value = store.state.info?.emailClient
    appraisal.value = -1


    const onSubmit = handleSubmit(async values => {
      try {
        await store.dispatch('record/createReview', values)
        appraisal.value = -1
        reviews.value = ''
      }
      catch (e) {
      }
    })
    return {
      name, email, appraisal, reviews,
      rError, rBlur,
      onSubmit, isSubmitting
    }
  }
}
</script>

<style scoped>

</style>
