<template>
  <v-container fluid>
    <v-row>
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
              {{ items[item].title }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group v-model="item">
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>

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

      <v-col cols="3">
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

    <v-row>
      <v-chart :options="DeviceStatus" style="width:100%" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DeviceStatusChart from "./DeviceStatusChart";

const now = new Date();
@Component
export default class DeviceStatus extends Vue {
  value = false;
  item = 0;
  items = [
    { title: "最新", link: "latest" },
    { title: "一小时内", link: "hour" },
    { title: "一天内", link: "day" },
    { title: "一月内", link: "month" }
  ];

  startMenu = false;
  start =
    now.getFullYear().toString() +
    "-" +
    (now.getMonth() + 1).toString() +
    "-" +
    now.getDate().toString();
  endMenu = false;
  end = this.start;

  alert = false;
  alertType = "warning";
  alertMsg = "";
  DeviceStatus = new DeviceStatusChart().LinesChart;

  mounted(): void {
    this.item = 2;
  }

  @Watch("item")
  onItemChange() {
    this.RefreshData(this.items[this.item].link);
  }

  @Watch("start")
  onStartChange() {
    this.RefreshData(this.start + "T00:00:00&&" + this.end + "T23:59:59");
  }

  @Watch("end")
  onEndChange() {
    this.RefreshData(this.start + "T00:00:00&&" + this.end + "T23:59:59");
  }

  RefreshData(value: string): void {
    this.axios
      .get("/DeviceStatus/Get/" + value)
      .then(Response => {
        this.DeviceStatus.xAxis.data = [];
        for (let i = 0; i < 5; i++) {
          this.DeviceStatus.series[i].data = [];
        }
        if (typeof Response.data.length === "number") {
          Response.data.forEach(
            (element: {
              recordTime: string;
              cpuTemperature: number;
              cpuOccupancyRate: number;
              ramOccupancyRate: number;
              sdCardOccupancyRate: number;
              hddOccupancyRate: number;
            }) => {
              this.DeviceStatus.xAxis.data.push(
                element.recordTime.replace("T", " ")
              );
              this.DeviceStatus.series[0].data.push(element.cpuTemperature);
              this.DeviceStatus.series[1].data.push(element.cpuOccupancyRate);
              this.DeviceStatus.series[2].data.push(element.ramOccupancyRate);
              this.DeviceStatus.series[3].data.push(
                element.sdCardOccupancyRate
              );
              this.DeviceStatus.series[4].data.push(element.hddOccupancyRate);
            }
          );
        } else {
          for (let i = 0; i < 5; i++) {
            this.DeviceStatus.xAxis.data.push(
              Response.data.recordTime.replace("T", " ")
            );
            this.DeviceStatus.series[0].data.push(Response.data.cpuTemperature);
            this.DeviceStatus.series[1].data.push(
              Response.data.cpuOccupancyRate
            );
            this.DeviceStatus.series[2].data.push(
              Response.data.ramOccupancyRate
            );
            this.DeviceStatus.series[3].data.push(
              Response.data.sdCardOccupancyRate
            );
            this.DeviceStatus.series[4].data.push(
              Response.data.hddOccupancyRate
            );
          }
        }
      })
      .catch(Error => {
        this.alertType = "error";
        this.alertMsg = Error;
        this.alert = true;
      });
  }
}
</script>
