<template>
  <option :disabled="isDisable" :value="value"> {{ text }}</option>
</template>

<script>
export default {
  props: ['value', 'text', 'isDisable']
}
</script>

<style scoped>

</style>
