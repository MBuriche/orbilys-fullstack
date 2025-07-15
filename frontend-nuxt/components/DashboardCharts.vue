<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- GGR Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">GGR por Mês</h3>
      <div style="height: 300px;">
        <canvas ref="ggrChart"></canvas>
      </div>
    </div>

    <!-- Status Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Operadores por Status</h3>
      <div style="height: 300px;">
        <canvas ref="statusChart"></canvas>
      </div>
    </div>

    <!-- Volume Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Volume de Apostas</h3>
      <div style="height: 300px;">
        <canvas ref="volumeChart"></canvas>
      </div>
    </div>

    <!-- Risk Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Distribuição de Risco</h3>
      <div style="height: 300px;">
        <canvas ref="riskChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const ggrChart = ref(null)
const statusChart = ref(null)
const volumeChart = ref(null)
const riskChart = ref(null)

onMounted(() => {
  if (process.client) {
    initCharts()
  }
})

const initCharts = async () => {
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)

  // GGR Chart
  new Chart(ggrChart.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'GGR (R$)',
        data: [200000, 210000, 225000, 240000, 250000, 255000, 260450],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString()
            }
          }
        }
      }
    }
  })

  // Status Chart
  new Chart(statusChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Ativo', 'Em Implantação', 'Suspenso', 'Devendo'],
      datasets: [{
        data: [8, 2, 1, 1],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })

  // Volume Chart
  new Chart(volumeChart.value, {
    type: 'bar',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Volume (R$)',
        data: [350000, 420000, 380000, 450000, 480000, 520000, 400000],
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString()
            }
          }
        }
      }
    }
  })

  // Risk Chart
  new Chart(riskChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Baixo Risco', 'Médio Risco', 'Alto Risco'],
      datasets: [{
        data: [6, 4, 2],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
}
</script>
