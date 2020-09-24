<template>
  <v-container>
    <v-menu
      ref="loginMenu"
      v-model="loginMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3" icon outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-shield-account</v-icon>
          登录
        </v-btn>
      </template>
      <v-card color="primary" class="rounded-xl" no-title scrollable>
        <v-text-field
          v-model="user"
          color="success"
          class="mt-3"
          label="User"
          prepend-icon="mdi-account"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          color="success"
          class="mt-3"
          label="Password"
          prepend-icon="mdi-onepassword"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-alert
          v-model="alert"
          :type="alertType"
          dismissible
          dense
          border="top"
          colored-border
          >{{ alertMsg }}
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn text @click="loginMenu = false">取消</v-btn>
        <v-btn text @click="Login">登录</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SecurityRsa from "@/components/Application/SecurityRsa";

@Component
export default class Login extends Vue {
  /**
   * 登录状态控制
   */
  @Prop() isLogin!: { login: boolean };

  loginMenu = false;
  user = "";
  password = "";

  alert = false;
  alertType = "warning";
  alertMsg = "";

  /**
   * 状态初始化
   */
  mounted(): void {
    this.user = "";
    this.password = "";

    this.alert = false;
    this.alertMsg = "warning";
    this.alertMsg = "";
  }
  /**
   * 登录方法
   * @constructor
   */
  Login(): void {
    this.axios
      .post("Authentication/Login", {
        username: this.user,
        password: SecurityRsa.Encrypt(this.password)
      })
      .then(Response => {
        //记录用户信息
        window.localStorage["token"] = Response.data;
        window.localStorage["user"] = this.user;

        this.axios.defaults.headers.common["Authorization"] =
          "Bearer " + window.localStorage["token"];
        //修改登录状态
        this.isLogin.login = true;
      })
      .catch(Error => {
        this.alert = true;
        this.alertMsg = "登录失败，请检查账号及密码";
        console.log(Error);
      });
  }
}
</script>
