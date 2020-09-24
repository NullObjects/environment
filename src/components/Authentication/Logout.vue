<template>
  <v-container>
    <v-btn class="mt-3" icon outlined @click="Logout">
      <v-icon>mdi-exit-run</v-icon>
      注销
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
  /**
   * 登录状态控制
   */
  @Prop() isLogin!: { login: boolean };

  Logout(): void {
    //清理用户信息
    window.localStorage["token"] = "";
    window.localStorage["user"] = "";

    this.isLogin.login = false;
  }
}
</script>
