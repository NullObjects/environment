<template>
  <v-app>
    <Navigation :navDrawer="navDrawer" />
    <BottomNavigation :draw="navDrawer.draw" />
    <AppBar />
    <v-main class="secondary" id="main">
      <div id="particles">
        <vue-particles
          color="#FF5555"
          :particleOpacit="0.7"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#8BE9FD"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.5"
          :linesDistance="150"
          :moveSpeed="2"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        >
        </vue-particles>
      </div>
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

  created() {
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
<style>
#main {
  background-image: url("./assets/image/void.png");
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
#particles {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
