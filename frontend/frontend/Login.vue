<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login Orbylis</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Usuário" class="w-full p-2 mb-4 border rounded" />
        <input v-model="password" type="password" placeholder="Senha" class="w-full p-2 mb-4 border rounded" />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
        <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Usuário ou senha inválidos'
  }
}
</script>
