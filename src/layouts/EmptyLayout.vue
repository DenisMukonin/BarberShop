<template>
  <app-message></app-message>
  <div class="container-empty container-empty-small">
    <router-view></router-view>
  </div>
</template>

<script>
import AppMessage from "@/components/ui/AppMessage";
export default {
  name: 'empty-layout',
  components: { AppMessage }
}
</script>
