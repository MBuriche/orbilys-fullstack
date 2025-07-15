<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <div class="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-xl inline-block mb-6">
          🎯 Orbylis Dashboard
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900">
          Acesso ao Sistema
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Entre com suas credenciais para acessar a dashboard
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Lembrar de mim
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-orange-600 hover:text-orange-500">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              <span v-if="loading" class="mr-2">⏳</span>
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>

          <div v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Credenciais de teste</span>
            </div>
          </div>

          <div class="mt-3 text-xs text-gray-500 text-center">
            <p><strong>Email:</strong> admin@orbilys.com</p>
            <p><strong>Senha:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const form = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simular autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Verificar credenciais
    if (form.value.email === 'admin@orbilys.com' && form.value.password === 'admin123') {
      // Salvar token de autenticação
      const token = 'orbilys_auth_token_' + Date.now()
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_email', form.value.email)
      
      // Redirecionar para dashboard
      await navigateTo('/')
    } else {
      error.value = 'Email ou senha incorretos'
    }
  } catch (err) {
    error.value = 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
