<template>
  <nav class="header">
    <div class="header--inner">
      <div class="header--inner-box">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!--  Menu open: "hidden", Menu closed: "block" -->
            <s-burger />
            <s-close />
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <m-link :to="{name: 'login'}">
                Dashboard
              </m-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <s-bell />
          </button>

          <m-dropdown />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
]

export default Vue.extend({
  name: 'Header',

  components: {
    'm-dropdown': () => import('../UI/m-dropdown.vue'),
    'm-link': () => import('./elements/m-link.vue'),

    's-burger': () => import('../../assets/svg/burger.svg'),
    's-bell': () => import('../../assets/svg/bell.svg'),
    's-close': () => import('../../assets/svg/close.svg')
  },
  props: {},
  data () {
    return {
      navigation
    }
  }
})
</script>

<style lang='scss'>
  .header {
    @apply bg-gray-800;
    .header--inner{
      @apply max-w-7xl mx-auto px-2 sm:px-6 lg:px-8;
    }
    .header--inner-box{
      @apply relative flex items-center justify-between h-16;
    }
  }
</style>
