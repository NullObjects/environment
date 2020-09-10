<template>
  <v-container>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-img
          alt="environment Logo"
          class="shrink mr-2"
          contain
          src="../../assets/environment.svg"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/nullobjects" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppBar extends Vue {}
</script>
