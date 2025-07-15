<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
              🎯 Orbylis Dashboard
            </div>
            <span class="ml-4 text-sm text-green-600 flex items-center">
              🟢 Sistema Online
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm">
              🔔 Alertas (4)
            </button>
            <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
              ⚙️ Configurações
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <button class="border-b-2 border-orange-500 text-orange-600 py-4 px-1 text-sm font-medium">
            👑 Visão Geral (CEO)
          </button>
          <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1 text-sm font-medium">
            👥 Operadores
          </button>
          <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1 text-sm font-medium">
            🎮 Provedores
          </button>
          <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1 text-sm font-medium">
            💳 Pagamentos
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Visão Geral (CEO)</h1>
        
        <!-- Filters -->
        <div class="bg-white p-6 rounded-lg shadow mb-6">
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select v-model="filters.period" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="today">Hoje</option>
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <select v-model="filters.brand" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">Todas</option>
                <option value="casino-royal">Casino Royal</option>
                <option value="lucky-stars">Lucky Stars</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="owing">Devendo</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Revendedor</label>
              <select v-model="filters.reseller" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">Todos</option>
                <option value="joao">João Silva</option>
                <option value="maria">Maria Santos</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Risco</label>
              <select v-model="filters.risk" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">Todos</option>
                <option value="high">Alto</option>
                <option value="medium">Médio</option>
                <option value="low">Baixo</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Busca</label>
              <div class="flex">
                <input v-model="filters.search" type="text" placeholder="Nome, domínio..." class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm">
                <button @click="applyFilters" class="bg-orange-500 text-white px-4 py-2 rounded-r-md text-sm">🔍</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">Operadores Ativos</div>
            <div class="text-3xl font-bold text-gray-900">{{ stats.activeOperators }}</div>
            <div class="text-sm text-gray-500">de {{ stats.totalOperators }} total</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">GGR Total Mês</div>
            <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(stats.totalGGR) }}</div>
            <div class="text-sm text-green-600">+{{ stats.ggrGrowth }}% vs mês anterior</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">NGR Total Mês</div>
            <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(stats.totalNGR) }}</div>
            <div class="text-sm text-gray-500">{{ stats.ngrPercentage }}% do GGR</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">Comissões Pagas</div>
            <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(stats.totalCommissions) }}</div>
            <div class="text-sm text-gray-500">{{ stats.commissionPercentage }}% do GGR médio</div>
          </div>
        </div>

        <!-- Second Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">Volume Apostado</div>
            <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(stats.totalVolume) }}</div>
            <div class="text-sm text-gray-500">Últimos 30 dias</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">Jogadores Únicos</div>
            <div class="text-3xl font-bold text-gray-900">{{ stats.uniquePlayers.toLocaleString() }}</div>
            <div class="text-sm text-green-600">+{{ stats.playersGrowth }}% vs semana passada</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">GGR Médio/Operador</div>
            <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(stats.avgGGR) }}</div>
            <div class="text-sm text-gray-500">Por operador ativo</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-sm font-medium text-gray-500">Operadores em Risco</div>
            <div class="text-3xl font-bold text-red-600">{{ stats.riskOperators }}</div>
            <div class="text-sm text-red-600">Requer atenção</div>
          </div>
        </div>

        <!-- Charts -->
        <DashboardCharts />

        <!-- Table -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Tabela Comparativa de Operadores</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GGR Mês</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGR</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jogadores</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risco</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="operator in filteredOperators" :key="operator.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ operator.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(operator.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ operator.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(operator.ggr) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(operator.ngr) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ operator.commission }}%</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm" :class="operator.balance >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ formatCurrency(operator.balance) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ operator.players.toLocaleString() }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getRiskClass(operator.risk)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ getRiskIcon(operator.risk) }} {{ operator.risk }}%
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewOperator(operator)" class="text-orange-600 hover:text-orange-900">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Configuração do Nuxt
useHead({
  title: 'Orbylis Dashboard - Whitelabel Casino Analytics',
  meta: [
    { name: 'description', content: 'Dashboard completo para análise de casinos whitelabel' }
  ]
})

// Estados reativos
const filters = ref({
  period: '30days',
  brand: 'all',
  status: 'all',
  reseller: 'all',
  risk: 'all',
  search: ''
})

const stats = ref({
  activeOperators: 8,
  totalOperators: 12,
  totalGGR: 260450,
  ggrGrowth: 12.5,
  totalNGR: 182315,
  ngrPercentage: 70,
  totalCommissions: 39067,
  commissionPercentage: 15,
  totalVolume: 2741578,
  uniquePlayers: 6017,
  playersGrowth: 8.2,
  avgGGR: 32556,
  riskOperators: 2
})

const operators = ref([
  {
    id: 1,
    name: 'Casino Royal',
    status: 'Ativo',
    ggr: 125430,
    ngr: 87801,
    commission: 15,
    balance: -3000,
    players: 2847,
    risk: 80
  },
  {
    id: 2,
    name: 'Lucky Stars',
    status: 'Ativo',
    ggr: 89650,
    ngr: 62755,
    commission: 12,
    balance: 0,
    players: 1923,
    risk: 60
  },
  {
    id: 3,
    name: 'Golden Palace',
    status: 'Em implantação',
    ggr: 45230,
    ngr: 31661,
    commission: 10,
    balance: 0,
    players: 1247,
    risk: 20
  }
])

// Computed
const filteredOperators = computed(() => {
  return operators.value.filter(operator => {
    if (filters.value.search && !operator.name.toLowerCase().includes(filters.value.search.toLowerCase())) {
      return false
    }
    if (filters.value.status !== 'all' && operator.status !== filters.value.status) {
      return false
    }
    return true
  })
})

// Métodos
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const getStatusClass = (status) => {
  const classes = {
    'Ativo': 'bg-green-100 text-green-800',
    'Em implantação': 'bg-blue-100 text-blue-800',
    'Suspenso': 'bg-yellow-100 text-yellow-800',
    'Devendo': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getRiskClass = (risk) => {
  if (risk >= 70) return 'bg-red-100 text-red-800'
  if (risk >= 40) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getRiskIcon = (risk) => {
  if (risk >= 70) return '🔴'
  if (risk >= 40) return '🟡'
  return '🟢'
}

const applyFilters = () => {
  // Lógica para aplicar filtros
  console.log('Filtros aplicados:', filters.value)
}

const viewOperator = (operator) => {
  // Lógica para visualizar operador
  console.log('Visualizar operador:', operator.name)
}
</script>
