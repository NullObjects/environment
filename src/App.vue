<template>
  <v-app>
    <Navigation :navDrawer="navDrawer" />
    <BottomNavigation :draw="navDrawer.draw" />
    <AppBar />
    <v-main class="secondary">
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

  mounted() {
    this.$vuetify.theme.dark = true;
    this.$vuetify.theme.themes.dark.primary = "#6272A4";
    this.$vuetify.theme.themes.dark.secondary = "#272935";
    this.$vuetify.theme.themes.dark.accent = "#D6ACFF";
    this.$vuetify.theme.themes.dark.error = "#FF6E6E";
    this.$vuetify.theme.themes.dark.info = "#FF92DF";
    this.$vuetify.theme.themes.dark.success = "#69FF94";
    this.$vuetify.theme.themes.dark.warning = "#FFFFA5";
  }
}
</script>
