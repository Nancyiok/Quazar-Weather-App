<script setup lang="ts">
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import type { ForecastItem } from '../types/weather-forecast';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
);

ChartJS.defaults.font.family = 'Poppins, sans-serif';

const props = defineProps<{
  forecast: ForecastItem[];
}>();

const chartData = computed(() => ({
  labels: props.forecast.map((item) => {
    const date = new Date(item.dt * 1000);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }),
  datasets: [
    {
      label: 'Temperature °C',
      data: props.forecast.map((item) => item.main.temp),
      borderColor: 'rgba(157, 181, 248, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 7,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Temperature in °C',
      font: {
        size: 16,
        weight: '500',
      },
      color: '#000000',
      padding: { bottom: 20 },
    },
    tooltip: {
      enabled: false,
      external: (context: any) => {
        const tooltipModel = context.tooltip;

        let tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.background = 'rgba(255, 255, 255, 0.95)';
          tooltipEl.style.padding = '10px';
          tooltipEl.style.borderRadius = '10px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.fontFamily = 'Poppins, sans-serif';
          document.body.appendChild(tooltipEl);
        }

        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        const dataIndex = tooltipModel.dataPoints[0].dataIndex;
        const dataItem = props.forecast[dataIndex];
        const iconUrl = `https://openweathermap.org/img/wn/${dataItem.weather[0].icon}@2x.png`;
        tooltipEl.innerHTML = `
  <div style="max-width: 250px;">
    <div>
      <div style="font-weight: bold; font-size: 14px;">${new Date(dataItem.dt * 1000).toLocaleString()}</div>
      <div>Temp: ${Math.ceil(dataItem.main.temp)} °C</div>
      <div>Feels like: ${Math.ceil(dataItem.main.feels_like)} °C</div>
      <img src="${iconUrl}"
     style="width:40px; filter: brightness(0) saturate(100%) invert(71%) sepia(17%) saturate(1600%) hue-rotate(191deg) brightness(101%) contrast(101%);" />
      <div style="text-transform: capitalize;">${dataItem.weather[0].description}</div>
    </div>
  </div>
`;
        const canvasRect = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.left = canvasRect.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = canvasRect.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.opacity = '1';
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { display: false },
      ticks: {
        callback: (value: any) => `${value}°`,
        color: '#000000',
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#000000',
      },
    },
  },
};
</script>

<template>
  <div v-if="forecast && forecast.length" class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 450px;
  width: 100%;
  max-width: 1000px;
}
</style>
