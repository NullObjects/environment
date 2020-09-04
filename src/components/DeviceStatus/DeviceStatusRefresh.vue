<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-chart :options="CPUOccupancyRate" style="width:100%" />
      </v-col>
      <v-col cols="4">
        <v-chart :options="CPUTemperature" style="width:100%" />
      </v-col>
      <v-col cols="4">
        <v-chart :options="RAMOccupancyRate" style="width:100%" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-chart :options="SDCardOccupancyRate" style="width:100%" />
      </v-col>
      <v-col cols="6">
        <v-chart :options="HDDOccupancyRate" style="width:100%" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeviceStatusChart from "./DeviceStatusChart";

@Component
export default class DeviceStatusRefresh extends Vue {
  CPUTemperature = new DeviceStatusChart().LineChart;
  CPUOccupancyRate = new DeviceStatusChart().PieChart;
  RAMOccupancyRate = new DeviceStatusChart().PieChart;
  SDCardOccupancyRate = new DeviceStatusChart().PieChart;
  HDDOccupancyRate = new DeviceStatusChart().PieChart;

  timer: any;

  mounted(): void {
    this.CPUOccupancyRate.title.text = "CPU占用";
    this.CPUOccupancyRate.title.subtext = "CPU%";
    this.CPUOccupancyRate.series[0].name = "CPU%";

    this.RAMOccupancyRate.title.text = "内存占用";
    this.RAMOccupancyRate.title.subtext = "RAM%";
    this.RAMOccupancyRate.series[0].name = "RAM%";

    this.SDCardOccupancyRate.title.text = "SD卡占用";
    this.SDCardOccupancyRate.title.subtext = "SD%";
    this.SDCardOccupancyRate.series[0].name = "SD%";

    this.HDDOccupancyRate.title.text = "硬盘占用";
    this.HDDOccupancyRate.title.subtext = "HDD%";
    this.HDDOccupancyRate.series[0].name = "HDD%";
    this.RefreshData();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.RefreshData();
      }, 30000);
    }
  }

  destroyed(): void {
    clearInterval(this.timer);
  }

  RefreshData(): void {
    this.axios
      .get("/DeviceStatus/Get/latest")
      .then(Response => {
        console.log(Response.data);
        if (this.CPUTemperature.xAxis.data.length >= 30) {
          this.CPUTemperature.xAxis.data.shift();
          this.CPUTemperature.series[0].data.shift();
        }
        this.CPUTemperature.xAxis.data.push(
          Response.data.recordTime.replace("T", " ")
        );
        this.CPUTemperature.series[0].data.push(Response.data.cpuTemperature);

        this.CPUOccupancyRate.series[0].data[0].value =
          Response.data.cpuOccupancyRate;
        this.CPUOccupancyRate.series[0].data[1].value =
          (10000 - Response.data.cpuOccupancyRate * 100) / 100;

        this.RAMOccupancyRate.series[0].data[0].value =
          Response.data.ramOccupancyRate;
        this.RAMOccupancyRate.series[0].data[1].value =
          (10000 - Response.data.ramOccupancyRate * 100) / 100;

        this.SDCardOccupancyRate.series[0].data[0].value =
          Response.data.sdCardOccupancyRate;
        this.SDCardOccupancyRate.series[0].data[1].value =
          (10000 - Response.data.sdCardOccupancyRate * 100) / 100;

        this.HDDOccupancyRate.series[0].data[0].value =
          Response.data.hddOccupancyRate;
        this.HDDOccupancyRate.series[0].data[1].value =
          (10000 - Response.data.hddOccupancyRate * 100) / 100;
      })
      .catch(Error => {
        console.log("Err:" + Error);
      });
  }
}
</script>