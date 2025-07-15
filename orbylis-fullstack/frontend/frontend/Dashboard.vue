<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Dashboard</h1>
    <p>Status da API protegida:</p>
    <p class="text-green-600 mt-2">{{ message }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const message = ref('Carregando...')

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/auth/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    message.value = 'Bem-vindo, ' + response.data.user.username
  } catch (error) {
    message.value = 'Erro ao carregar dados protegidos'
  }
})
</script>
