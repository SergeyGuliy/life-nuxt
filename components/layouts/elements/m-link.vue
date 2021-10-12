<template>
  <NuxtLink :to="to" class="m-link">
    <slot />
  </NuxtLink>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MLink',
  components: {},
  props: {
    to: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
})
</script>

<style lang='scss'>
  .m-link {
    @apply text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium;
  }
</style>
