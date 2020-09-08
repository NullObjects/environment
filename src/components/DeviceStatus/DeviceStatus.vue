<template>
  <v-container fluid>
    <DataPicker
      @on-span-change="RefreshData"
      @on-start-change="RefreshData"
      @on-end-change="RefreshData"
    />
    <DataDisplay
      :data-chart="DeviceStatus"
      :data-header="tableHeader"
      :data-body="tableBody"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeviceStatusChart from "./DeviceStatusChart";
import DataPicker from "@/components/History/DataPicker.vue";
import DataDisplay from "@/components/History/DataDisplay.vue";

@Component({
  components: {
    DataPicker,
    DataDisplay
  }
})
export default class DeviceStatus extends Vue {
  /**
   * 图表
   */
  DeviceStatus = new DeviceStatusChart().LinesChart;

  /**
   * 表头
   */
  tableHeader = [
    { text: "记录时间", value: "recordTime" },
    { text: "CPU温度*C", value: "cpuTemperature" },
    { text: "CPU%", value: "cpuOccupancyRate" },

    { text: "RAM%", value: "ramOccupancyRate" },
    { text: "SD%", value: "sdCardOccupancyRate" },
    { text: "HDD%", value: "hddOccupancyRate" }
  ];
  /**
   * 数据
   */
  get tableBody() {
    const table: any[] = [];
    this.DeviceStatus.xAxis.data.forEach((val, index) => {
      table.push({
        recordTime: val,
        cpuTemperature: this.DeviceStatus.series[0].data[index],
        cpuOccupancyRate: this.DeviceStatus.series[1].data[index],
        ramOccupancyRate: this.DeviceStatus.series[2].data[index],
        sdCardOccupancyRate: this.DeviceStatus.series[3].data[index],
        hddOccupancyRate: this.DeviceStatus.series[4].data[index]
      });
    });
    return table;
  }

  /**
   * 刷新数据
   * @param value:axios参数
   * @constructor
   */
  RefreshData(value: string): void {
    this.axios
      .get("/DeviceStatus/Get/" + value)
      .then(Response => {
        this.DeviceStatus.xAxis.data = [];
        for (let i = 0; i < 5; i++) {
          this.DeviceStatus.series[i].data = [];
        }
        if (typeof Response.data.length === "number") {
          //获取多条数据
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
          //获取一条数据
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
        console.log(Error);
      });
  }
}
</script>
