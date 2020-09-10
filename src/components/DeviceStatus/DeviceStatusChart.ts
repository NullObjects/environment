export default class DeviceStatusChart {
  public LineChart = {
    backgroundColor: "#272935",

    title: {
      textStyle: {
        color: "#8BE9FD"
      },
      text: "CPU温度",
      subtext: "温度*C",
      x: "center"
    },

    //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
    grid: {
      top: "15%", // 等价于 y: '16%'
      left: "3%",
      right: "3%",
      bottom: "3%",
      containLabel: true
    },

    // 提示框
    tooltip: {
      trigger: "axis"
    },

    //工具框，可以选择
    toolbox: {
      feature: {
        saveAsImage: {} //下载工具
      }
    },

    xAxis: {
      name: "时间",
      type: "category",
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: "#FFFFA5"
        }
      },
      // 设置X轴数据旋转倾斜
      axisLabel: {
        rotate: 30, // 旋转角度
        interval: 10 //设置X轴数据间隔几个显示一个，为0表示都显示
      },
      // boundaryGap值为false的时候，折线第一个点在y轴上
      boundaryGap: false,
      data: [""]
    },

    yAxis: {
      name: "温度",
      type: "value",
      min: 0, // 设置y轴刻度的最小值
      //   max: 100, // 设置y轴刻度的最大值
      splitNumber: 10, // 设置y轴刻度间隔个数
      axisLine: {
        lineStyle: {
          // 设置y轴颜色
          color: "#87CEFA"
        }
      }
    },
    series: [
      {
        name: "温度*C",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: "solid" //'dotted'虚线 'solid'实线
            }
          }
        }
      }
    ],

    color: ["#FF6E6E", "#69FF94", "#D6ACFF", "#A4FFFF", "#FFFFA5"]
  };

  public LinesChart = {
    backgroundColor: "#272935",

    title: {
      textStyle: {
        color: "#8BE9FD"
      },
      text: "设备状态信息",
      subtext: "RPi",
      x: "center"
    },

    legend: {
      textStyle: {
        color: "#8BE9FD"
      },
      // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
      orient: "horizontal",
      // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
      x: "left",
      // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
      y: "top",
      data: ["CPU温度*C", "CPU%", "RAM%", "SD%", "HDD%"]
    },

    //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
    grid: {
      top: "15%", // 等价于 y: '16%'
      left: "3%",
      right: "3%",
      bottom: "3%",
      containLabel: true
    },

    // 提示框
    tooltip: {
      trigger: "axis"
    },

    //工具框，可以选择
    toolbox: {
      feature: {
        saveAsImage: {} //下载工具
      }
    },

    xAxis: {
      name: "时间",
      type: "category",
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: "#FFFFA5"
        }
      },
      // 设置X轴数据旋转倾斜
      axisLabel: {
        rotate: 30, // 旋转角度
        interval: 1440 //设置X轴数据间隔几个显示一个，为0表示都显示
      },
      // boundaryGap值为false的时候，折线第一个点在y轴上
      boundaryGap: false,
      data: [""]
    },

    yAxis: {
      name: "Value",
      type: "value",
      min: 0, // 设置y轴刻度的最小值
      //   max: 100, // 设置y轴刻度的最大值
      splitNumber: 10, // 设置y轴刻度间隔个数
      axisLine: {
        lineStyle: {
          // 设置y轴颜色
          color: "#87CEFA"
        }
      }
    },
    series: [
      {
        name: "CPU温度*C",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: "dotted" //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        name: "CPU%",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 1, // 设置线宽
              type: "solid" //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        name: "RAM%",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: "solid" //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        name: "SD%",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: "solid" //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        name: "HDD%",
        data: [0],
        type: "line",
        // 设置小圆点消失
        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
        // symbol: "none",
        // 设置折线弧度，取值：0-1之间
        smooth: 0.3,
        // 设置折线上圆点大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: "red", // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: "solid" //'dotted'虚线 'solid'实线
            }
          }
        }
      }
    ],

    color: ["#FF6E6E", "#69FF94", "#D6ACFF", "#A4FFFF", "#FFFFA5"]
  };

  public PieChart = {
    backgroundColor: "#272935",

    title: {
      textStyle: {
        color: "#8BE9FD"
      },
      text: "title",
      subtext: "subTitle",
      x: "center"
    },

    legend: {
      textStyle: {
        color: "#8BE9FD"
      },
      // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
      orient: "vertical",
      // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
      x: "left",
      // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
      y: "top",
      data: ["使用%", "空闲%"]
    },

    //工具框，可以选择
    toolbox: {
      feature: {
        saveAsImage: {} //下载工具
      }
    },

    //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
    grid: {
      top: "15%", // 等价于 y: '16%'
      left: "3%",
      right: "3%",
      bottom: "3%",
      containLabel: true
    },
    series: [
      {
        name: "seriesName",
        type: "pie",
        radius: "55%",
        data: [
          { value: 60, name: "使用%" },
          { value: 40, name: "空闲%" }
        ],
        roseType: "angle",
        itemStyle: {
          normal: {
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: {
          normal: {
            position: "inner", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
            // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  {d}%指这一部分占总数的百分比
            formatter: "{c}"
          }
        }
      }
    ],
    color: ["#FF6E6E", "#69FF94", "#D6ACFF", "#A4FFFF", "#FFFFA5"]
  };
}
