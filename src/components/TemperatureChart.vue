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

const isMobile = () => window.innerWidth < 640;

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
      borderWidth: isMobile() ? 3.5 : 3,
      pointRadius: isMobile() ? 5 : 4,
      pointHoverRadius: isMobile() ? 6 : 7,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: isMobile() ? 1.4 : 2.5,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Temperature in °C',
      font: {
        size: isMobile() ? 13 : 16,
        weight: 500,
      },
      color: '#000000',
      padding: { bottom: isMobile() ? 10 : 20 },
    },
    tooltip: {
      enabled: false,
      external: (context) => {
        const tooltipModel = context.tooltip;

        let tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.background = 'rgba(255, 255, 255, 0.95)';
          tooltipEl.style.padding = isMobile() ? '6px 8px' : '10px';
          tooltipEl.style.borderRadius = '10px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.fontFamily = 'Poppins, sans-serif';
          tooltipEl.style.fontSize = isMobile() ? '12px' : '14px';
          tooltipEl.style.zIndex = '9999';
          tooltipEl.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
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
          <div style="max-width: ${isMobile() ? '160px' : '250px'};">
            <div style="font-weight: 600; font-size: ${isMobile() ? '12px' : '14px'};">
              ${new Date(dataItem.dt * 1000).toLocaleString()}
            </div>
            <div>Temp: ${Math.ceil(dataItem.main.temp)} °C</div>
            <div>Feels like: ${Math.ceil(dataItem.main.feels_like)} °C</div>
            <img src="${iconUrl}"
              style="width:${isMobile() ? '28px' : '40px'}; filter: brightness(0) saturate(100%) invert(71%) sepia(17%) saturate(1600%) hue-rotate(191deg) brightness(101%) contrast(101%);" />
            <div style="text-transform: capitalize;">${dataItem.weather[0].description}</div>
          </div>
        `;

        const canvasRect = context.chart.canvas.getBoundingClientRect();
        const scrollX = window.scrollX ?? window.pageXOffset;
        const scrollY = window.scrollY ?? window.pageYOffset;

        let left = canvasRect.left + scrollX + tooltipModel.caretX;
        const top = canvasRect.top + scrollY + tooltipModel.caretY;

        const tooltipWidth = isMobile() ? 170 : 260;
        if (left + tooltipWidth > window.innerWidth + scrollX) {
          left = left - tooltipWidth - 10;
        }

        tooltipEl.style.left = left + 'px';
        tooltipEl.style.top = top + 'px';
        tooltipEl.style.opacity = '1';
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { display: false },
      ticks: {
        callback: (value: string) => `${value}°`,
        color: '#000000',
        font: { size: isMobile() ? 10 : 12 },
        maxTicksLimit: isMobile() ? 5 : 8,
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#000000',
        font: { size: isMobile() ? 10 : 12 },
        maxTicksLimit: isMobile() ? 6 : 16,
        maxRotation: isMobile() ? 45 : 0,
      },
    },
  },
}));
</script>

<template>
  <div v-if="forecast && forecast.length" class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 1000px;
  min-width: 200px;
  min-height: 200px;
}

@media (min-height: 400px) and (min-width: 640px) {
  .chart-container {
    min-height: 350px;
  }
}
</style>
