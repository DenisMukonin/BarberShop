<template>
  <option :disabled="test.includes(value)" :value="value">{{ value }}</option>
</template>

<script>
export default {
  props: ['value','test'],
  setup() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
