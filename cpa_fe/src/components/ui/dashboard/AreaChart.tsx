import React from "react";
import Chart from "react-apexcharts";
import { Props } from "react-apexcharts";
import ParentCard from "@ui/shared/ParentCard";
import { StatisticsReport } from "@api/user/user";
import { useTranslation } from "react-i18next";

export interface AreaChartProp {
  values?: StatisticsReport[];
  labelName?: string;
  color: string;
}

export interface AreaChartProps {
  props: AreaChartProp[];
}

const AreaChart = ({ props }: AreaChartProps) => {
  // chart color
  const { t } = useTranslation();

  const [xvalues, seriesareacharts, colors] = React.useMemo(() => {
    const xvalues = [
      ...new Set(
        props.reduce((acc: string[], d) => {
          return acc.concat(d.values?.map((v) => v.xvalue) ?? []);
        }, [])
      ),
    ];
    const seriesareacharts = props?.map((d, i) => ({
      name: props[i].labelName ?? "",
      data: d.values?.map((v) => v.yvalue) ?? [],
    }));
    const colors = props?.map((d) => d.color);
    return [xvalues, seriesareacharts, colors];
  }, [props]);
  
  const optionsareachart: Props = {
    chart: {
      id: "area-chart",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          // selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          // pan: true,
          // reset: true | '<img src="/static/icons/reset.png" width="20">',
          // customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "Date",
            headerValue: "value",
            // dateFormatter() {
            //   return new Date().toDateString();
            // },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: "3",
      curve: "smooth",
    },
    colors: [...colors],
    xaxis: {
      type: "datetime",
      categories: [...xvalues],
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  const seriesareachart = [...seriesareacharts];

  return (
    <ParentCard title={t("statistics.statistics")}>
      <Chart
        options={optionsareachart}
        series={seriesareachart}
        type="area"
        height="300px"
      />
    </ParentCard>
  );
};

export default AreaChart;
