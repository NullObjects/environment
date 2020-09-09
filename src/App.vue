<template>
  <v-app>
    <Navigation :drawer="drawer" />
    <AppBar :drawer="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Application/Navigation.vue";
import AppBar from "@/components/Application/AppBar.vue";

@Component({
  components: {
    Navigation,
    AppBar
  }
})
export default class App extends Vue {
  drawer = {
    draw: "true"
  };
}
</script>
