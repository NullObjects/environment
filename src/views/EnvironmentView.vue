<template>
  <v-container class="home text-center">
    <EnvironmentRefresh />
    <Environment />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnvironmentRefresh from "@/components/Environment/EnvironmentRefresh.vue";
import Environment from "@/components/Environment/Environment.vue";

@Component({
  components: {
    EnvironmentRefresh,
    Environment
  }
})
export default class EnvironmentView extends Vue {}
</script>
