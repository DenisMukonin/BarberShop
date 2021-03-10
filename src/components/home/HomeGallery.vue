<template>
  <div class="content gallery">
    <h1>Галерея</h1>
    <div class="gallery-block" v-if="true">
      <div class="gallery-img">
        <img class="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
      <div class="gallery-img">
        <img class="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
      <div class="gallery-img">
        <img  class="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
    </div>
    <div class="gallery-block" v-else>
      <div class="gallery-img">
        <img class="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
      <div class="gallery-img">
        <img class="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
      <div class="gallery-img">
        <img  lass="gallery-img-one" src="../../assets/fon.jpg" alt="">
      </div>
    </div>
    <p>На фото представлены мои работы :)</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
