<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import './assets/css/main.css'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    this.axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 404) {
          this.$router.push({name: 'NotFound'})
        }
        return Promise.reject(error)
      }
    )
  },
}
</script>
