<template>
  <v-app>
    <Navigation :navDrawer="navDrawer" />
    <BottomNavigation :draw="navDrawer.draw" />
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Application/Navigation.vue";
import BottomNavigation from "@/components/Application/BottomNavigation.vue";
import AppBar from "@/components/Application/AppBar.vue";

@Component({
  components: {
    Navigation,
    BottomNavigation,
    AppBar
  }
})
export default class App extends Vue {
  navDrawer = { draw: "true" };
}
</script>
