<template>
  <v-container>
    <!--    顶部导航栏-->
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <!--        Logo-->
        <v-img
          alt="environment Logo"
          class="shrink mr-2"
          contain
          src="../../assets/logo/environment.svg"
          transition="scale-transition"
          width="40"
        />
      </div>

      <!--GitHub主页-->
      <v-btn href="https://github.com/nullobjects" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <div class="d-flex align-right">
        <Login />
        <Register />
      </div>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Authentication/Login.vue";
import Register from "@/components/Authentication/Register.vue";

@Component({
  components: {
    Login,
    Register
  }
})
export default class AppBar extends Vue {}
</script>
