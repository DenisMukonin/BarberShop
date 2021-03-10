<template>
  <div class="body-fon">
    <div>
      <div class="img-menu" @click="openInfo" v-if="isMenu"><img class="img-menu-icons" src="@/assets/menuIcons.png" alt=""></div>
      <app-info-client @open-menu="isMenu = !isMenu" :info="info" v-if="hasInfo"></app-info-client>
    </div>
    <home-header id="header"></home-header>
    <home-information id="information"></home-information>
    <home-about id="about"></home-about>
  </div>

  <home-record id="record"></home-record>
  <home-gallery id="gallery"></home-gallery>
  <home-price id="price"></home-price>
  <home-reviews id="reviews"></home-reviews>
  <home-address id="address"></home-address>

  <home-footer id="footer" ></home-footer>
</template>

<script>
import AppInfoClient from "@/components/ui/AppInfoClient";
import HomeHeader from "@/components/home/HomeHeader";
import HomeInformation from "@/components/home/HomeInformation";
import HomeRecord from "@/components/home/HomeRecord";
import HomeAbout from "@/components/home/HomeAbout";
import HomeGallery from "@/components/home/HomeGallery";
import HomePrice from "@/components/home/HomePrice";
import HomeAddress from "@/components/home/HomeAddress";
import HomeFooter from "@/components/home/HomeFooter";
import HomeReviews from "@/components/home/HomeReviews";

import {ref, onMounted, computed} from 'vue'
import store from '../store/index'


export default {
  setup() {
    const info = computed(() => store.state.info)
    const hasInfo = computed(() => store.state.infoClient)
    const auth = computed(() => store.getters['login/isAuthenticated'])
    const isMenu = ref(true)

    onMounted(async () => {
      if (auth.value) {
        await store.dispatch('record/load')
      }
    })

    return {
      info,
      hasInfo,
      isMenu,
      openInfo: () => {
        isMenu.value = !isMenu.value
        store.commit('openInfoClient')
      }
    }

  },
  components: {
    AppInfoClient,
    HomeHeader, HomeInformation, HomeRecord,
    HomeAbout, HomeGallery, HomePrice,
    HomeReviews, HomeAddress, HomeFooter
  }
}
</script>

<style scoped>

</style>
