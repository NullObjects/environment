<template>
  <v-container>
    <v-menu
      ref="registerMenu"
      v-model="registerMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3" icon outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-account-plus</v-icon>
          注册
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
          v-model="roles"
          color="success"
          class="mt-3"
          label="Group"
          prepend-icon="mdi-account-group"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="email"
          color="success"
          class="mt-3"
          label="Email"
          prepend-icon="mdi-email"
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
        <v-text-field
          v-model="confirm"
          type="password"
          color="success"
          class="mt-3"
          label="Confirm"
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
        <v-btn text @click="registerMenu = false">取消</v-btn>
        <v-btn text @click="Register">注册</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SecurityRsa from "@/components/Application/SecurityRsa";

@Component
export default class Register extends Vue {
  registerMenu = false;
  user = "";
  roles = "public::";
  email = "";
  password = "";
  confirm = "";

  alert = false;
  alertType = "warning";
  alertMsg = "";

  /**
   * 状态初始化
   */
  mounted(): void {
    this.user = "";
    this.roles = "public::";
    this.email = "";
    this.password = "";
    this.confirm = "";

    this.alert = false;
    this.alertType = "warning";
    this.alertMsg = "";
  }
  /**
   * 密码确认
   */
  @Watch("password")
  @Watch("confirm")
  onPasswordChange() {
    if (this.confirm.length <= 15 && this.password.length <= 15) {
      if (this.confirm != this.password) {
        this.alert = true;
        this.alertType = "warning";
        this.alertMsg = "密码不一致";
      } else {
        this.alert = false;
        this.alertMsg = "";
      }
    } else {
      this.alert = true;
      this.alertType = "warning";
      this.alertMsg = "密码长度不能大于15位";
    }
  }

  /**
   * 用户注册
   * @constructor
   */
  Register(): void {
    //检验注册信息
    if (
      this.user == "" ||
      this.roles == "" ||
      this.email == "" ||
      this.password == "" ||
      this.confirm == "" ||
      this.password != this.confirm
    ) {
      this.alert = true;
      this.alertType = "warning";
      this.alertMsg = "请检查注册信息";
      return;
    }
    //注册
    this.axios
      .post("Authentication/Register", {
        username: this.user,
        role: this.roles,
        email: this.email,
        password: SecurityRsa.Encrypt(this.password)
      })
      .then(Response => {
        this.alert = true;
        this.alertType = "success";
        this.alertMsg = this.user + Response.data;
      })
      .catch(Error => {
        this.alert = true;
        this.alertType = "warning";
        this.alertMsg = "注册失败，用户名已注册";
        console.log(Error);
      });
  }
}
</script>
