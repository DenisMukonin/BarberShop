<template>
  <the-navbar></the-navbar>
  <app-message></app-message>
  <div class="container container-small with-nav">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import AppMessage from "@/components/ui/AppMessage";

export default {
  name: 'main-layout',
  components: { TheNavbar, AppMessage }
}
</script>
