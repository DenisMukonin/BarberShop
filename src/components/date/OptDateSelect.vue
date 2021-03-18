<template>
  <option :disabled="block.includes(value)" :value="value">{{ value }}</option>
</template>

<script>
export default {
  props: ['value','block'],
  setup() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
