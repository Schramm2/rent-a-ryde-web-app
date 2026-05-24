<template>
  <div id="app">
    <LoadingScreen v-if="isLoading" />
    <router-view v-show="!isLoading" />
  </div>
</template>

<script>
import LoadingScreen from '@/components/LoadingScreen.vue'

export default {
  name: "App",
  components: {
    LoadingScreen
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    // Simulate app loading time and hide loading screen
    setTimeout(() => {
      this.isLoading = false
    }, 1000) // Show loading screen for 2 seconds
  }
}
</script>

<style>
/* Global styles can go here or in main.css */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: rgba(45, 55, 45, 0.95);
}
</style>
