<template>
  <div class="home">
    <m-header />
    <m-map />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    'm-header': () => import('../components/layouts/m-header.vue'),
    'm-map': () => import('../components/m-map.vue')
  },
  layout: 'mainLayout',
  data () {
    return {}
  }
})
</script>

<style lang="scss">
  .home{
    @apply min-w-full w-auto min-h-screen h-full flex flex-col;
  }
</style>
