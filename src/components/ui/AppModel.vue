<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal modal-small with-nav">
    <h3 v-if="title">{{ title }} <span  class="right" @click="$emit('close')">&times;</span></h3>

    <slot></slot>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

h3 {
  margin-left: 15px;
}

span:hover {
  color: white;
}
span:link {
  color: #3eaf7c;
}
.right {
  align-self: center;
  float: right;
  margin-right: 15px;
  display: block;
  cursor: pointer;
}
</style>
