<template>
  <div class="card reviews">
    <h1 class="content" style="color: #cccccc">Отзывы и пожелания</h1>
    <button class="btn warning" @click="changeReviews">{{ isReviews ? 'Закрыть отзывы' : 'Показать отзывы' }}</button>
    <div class="reviews-text" v-if="isReviews">
      <div class="reviews-message" >
        <h3>Отзывы:</h3>
        <div v-for="(rew,idx) in reviews" :key="idx">
          <h4 class="reviews-name">{{ rew.name }}</h4>
          <h4>Оценка: {{ appraisalFunction(rew.appraisal) }}</h4>
          <p>{{ rew.reviews }}</p>
          <hr />
        </div>
      </div>

      <reviews-form v-if="auth"></reviews-form>
    </div>

  </div>

</template>

<script>
import ReviewsForm from "@/components/reviews/ReviewsForm";
import {useStore} from 'vuex'
import {ref, computed, onMounted} from 'vue'

export default {
  setup() {
    const store = useStore()
    const auth = computed(() => store.getters['login/isAuthenticated'])

    onMounted(async () => {
      if (auth.value) {
        await store.dispatch('record/loadReviews')
      }
    })

    const reviews = computed(() => store.getters['record/reviews'])
    const isReviews = ref(false)

    function appraisalFunction(value) {
      if (value === -1) {
        return 'Нет оценки'
      }
      return value
    }

    return {
      reviews, isReviews,
      auth, appraisalFunction,
      changeReviews: () => isReviews.value = !isReviews.value
    }
  },
  components: { ReviewsForm }
}
</script>

<style scoped>

</style>
