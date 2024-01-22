import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Props } from 'react-apexcharts';
import { AreaChartProps } from '../../../pages/statistic/StatisticPage';
import ParentCard from '@ui/shared/ParentCard';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const AreaChart = ({ title, labelName, data, color }: AreaChartProps) => {
  // chart color

  const [xvalues, yvalues] = React.useMemo(() => {
    const xvalues = data?.map((report) => report.xvalue);
    const yvalues = data?.map((report) => report.yvalue.toFixed(2));
    return [xvalues, yvalues];
  }, [data]);

  const optionsareachart: Props = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
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
            columnDelimiter: ',',
            headerCategory: 'Date',
            headerValue: 'value',
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
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '3',
      curve: 'smooth',
    },
    colors: [color],
    xaxis: {
      type: 'datetime',
      categories: xvalues,
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesareachart = [
    {
      name: labelName,
      data: yvalues,
    },
  ];

  return (
    <ParentCard title={title}>
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
