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
        <Login :is-login="isLogin" v-if="!isLogin.login" />
        <Register v-if="!isLogin.login" />
        <Management v-if="isLogin.login" />
        <Logout :is-login="isLogin" v-if="isLogin.login" />
      </div>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Authentication/Login.vue";
import Register from "@/components/Authentication/Register.vue";
import Management from "@/components/Authentication/Management.vue";
import Logout from "@/components/Authentication/Logout.vue";

@Component({
  components: {
    Login,
    Register,
    Management,
    Logout
  }
})
export default class AppBar extends Vue {
  isLogin = { login: false };

  /**
   * 获取公钥
   */
  getKey(): void {
    // 获取公钥
    this.axios
      .get("Authentication/GetKey")
      .then(Response => {
        window.localStorage["pubKey"] = Response.data;
      })
      .catch(Error => {
        console.log("GetKetError:" + Error);
      });
  }

  /**
   * 初始化
   */
  mounted(): void {
    this.getKey();
    //登录状态判断
    if (
      window.localStorage["token"] != "" &&
      window.localStorage["user"] != ""
    ) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + window.localStorage["token"];
      this.isLogin.login = true;
    }
  }
}
</script>
