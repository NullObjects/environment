<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-chart :options="CPUTemperature" style="width:100%" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-chart :options="CPUOccupancyRate" style="width:100%" />
      </v-col>
      <v-col>
        <v-chart :options="RAMOccupancyRate" style="width:100%" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-chart :options="SDCardOccupancyRate" style="width:100%" />
      </v-col>
      <v-col>
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

  timer = 0;
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
    this.InitData();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.RefreshData();
      }, 60000);
    }
  }

  destroyed(): void {
    clearInterval(this.timer);
  }

  /**
   * 初始化数据
   * @constructor
   */
  InitData(): void {
    this.axios
      .get("/DeviceStatus/Get/hour")
      .then(Response => {
        this.CPUTemperature.xAxis.data = [];
        this.CPUTemperature.series[0].data = [];
        if (typeof Response.data.length === "number") {
          //获取多条数据
          Response.data.forEach(
            (element: { recordTime: string; cpuTemperature: number }) => {
              this.CPUTemperature.xAxis.data.push(
                element.recordTime.replace("T", " ")
              );
              this.CPUTemperature.series[0].data.push(element.cpuTemperature);
            }
          );
        }
      })
      .catch(Error => {
        console.log("getDeviceErr:" + Error);
      });
  }

  /**
   * 刷新数据
   * @constructor
   */
  RefreshData(): void {
    this.axios
      .get("/DeviceStatus/Get/latest")
      .then(Response => {
        // 数据量大于指定数量
        if (this.CPUTemperature.xAxis.data.length >= 60) {
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
          100 - Response.data.cpuOccupancyRate;

        this.RAMOccupancyRate.series[0].data[0].value =
          Response.data.ramOccupancyRate;
        this.RAMOccupancyRate.series[0].data[1].value =
          100 - Response.data.ramOccupancyRate;

        this.SDCardOccupancyRate.series[0].data[0].value =
          Response.data.sdCardOccupancyRate;
        this.SDCardOccupancyRate.series[0].data[1].value =
          100 - Response.data.sdCardOccupancyRate;

        this.HDDOccupancyRate.series[0].data[0].value =
          Response.data.hddOccupancyRate;
        this.HDDOccupancyRate.series[0].data[1].value =
          100 - Response.data.hddOccupancyRate;
      })
      .catch(Error => {
        console.log("getDeviceErr:" + Error);
      });
  }
}
</script>
