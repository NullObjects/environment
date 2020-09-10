<template>
  <v-container>
    <v-row>
      <!--时间段选择-->
      <v-col>
        <v-menu
          v-model="value"
          open-on-hover
          close-on-click
          close-on-content-click
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="rounded-xl" color="primary" v-bind="attrs" v-on="on">
              <v-icon>mdi-timer</v-icon>
              {{ spans[span].title }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group v-model="span">
              <v-list-item v-for="(item, index) in spans" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
      <!--开始时间选择-->
      <v-col>
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="start"
          transition="scale-transition"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start"
              class="mt-3"
              label="Start Date"
              prepend-icon="mdi-calendar"
              dense
              readonly
              outlined
              hide-details
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker class="rounded-xl" v-model="start" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false"
              >Cancel
            </v-btn>
            <v-btn text color="primary" @click="onDateChange">OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!--结束时间选择-->
      <v-col>
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="end"
          transition="scale-transition"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end"
              class="mt-3"
              label="End Date"
              prepend-icon="mdi-calendar"
              dense
              readonly
              outlined
              hide-details
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker class="rounded-xl" v-model="end" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="onDateChange">OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!--错误提示-->
      <v-col>
        <v-alert
          v-model="alert"
          :type="alertType"
          dismissible
          dense
          border="top"
          colored-border
          >{{ alertMsg }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from "vue-property-decorator";

@Component
export default class DataPicker extends Vue {
  value = false;
  /**
   * 时间段选择
   */
  span = 0;
  /**
   * 时间段
   */
  spans = [
    { title: "最新", link: "latest" },
    { title: "一小时内", link: "hour" },
    { title: "一天内", link: "day" },
    { title: "一周内", link: "week" }
  ];

  now = new Date();
  startMenu = false;
  /**
   * 开始时间
   */
  start =
    this.now.getFullYear().toString() +
    "-" +
    (this.now.getMonth() + 1).toString() +
    "-" +
    this.now.getDate().toString();
  endMenu = false;
  /**
   * 结束时间
   */
  end = this.start;

  alert = false;
  alertType = "warning";
  alertMsg = "";

  /**
   * 初始化选择
   */
  mounted() {
    this.span = 1;
  }

  /**
   * 时间段变化
   */
  @Watch("span")
  @Emit()
  onSpanChange() {
    return this.spans[this.span].link;
  }

  $refs!: { startMenu: HTMLFormElement; endMenu: HTMLFormElement };
  /**
   * 选择日期变化
   */
  @Emit()
  onDateChange() {
    this.$refs.startMenu.save(this.start);
    this.$refs.endMenu.save(this.end);
    if (this.getDaySpan(this.start, this.end) <= 7) {
      this.alert = false;
      this.alertMsg = "";
      return this.start + "T00:00:00&&" + this.end + "T23:59:59";
    } else {
      this.alert = true;
      this.alertMsg = "选择时间不能大于一周，请重新选择！";
      return "latest";
    }
  }

  /**
   * 获取相差天数
   * @param startTime
   * @param endTime
   */
  getDaySpan(startTime: string, endTime: string): number {
    const dateBegin = new Date(startTime.replace(/-/g, "/")); //将-转化为/，使用new Date
    const dateEnd = new Date(endTime.replace(/-/g, "/")); //将-转化为/，使用new Date
    const dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    return Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  }
}
</script>
