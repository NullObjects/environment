<template>
  <v-container>
    <v-row>
      <!--时间段选择-->
      <v-col cols="3">
        <v-menu
          v-model="value"
          open-on-hover
          close-on-click
          close-on-content-click
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
      <v-col cols="3">
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
          <v-date-picker v-model="start" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false"
              >Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.startMenu.save(start)"
              >OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!--结束时间选择-->
      <v-col cols="3">
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
          <v-date-picker v-model="end" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.endMenu.save(end)"
              >OK
            </v-btn>
          </v-date-picker>
        </v-menu>
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

  /**
   * 初始化选择
   */
  mounted() {
    this.span = 1;
  }

  @Watch("span")
  @Emit()
  /**
   * 时间段变化
   */
  onSpanChange() {
    return this.spans[this.span].link;
  }

  @Watch("start")
  @Emit()
  /**
   * 开始时间变化
   */
  onStartChange() {
    return this.start + "T00:00:00&&" + this.end + "T23:59:59";
  }

  @Watch("end")
  @Emit()
  /**
   * 结束时间变化
   */
  onEndChange() {
    return this.start + "T00:00:00&&" + this.end + "T23:59:59";
  }
}
</script>
