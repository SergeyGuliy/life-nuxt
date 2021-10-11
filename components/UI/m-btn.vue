<template>
  <button class="v-btn" :class="localClasses" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MBtn',
  components: {},
  filters: {
    propsParser (value) {
      return typeof value === 'string' || value
    }
  },
  props: {
    primary: {},
    green: {},
    danger: {}
  },
  data () {
    return {
    }
  },
  computed: {
    localClasses () {
      return {
        'v-btn__primary': this.$options.filters.propsParser(this.primary),
        'v-btn__green': this.$options.filters.propsParser(this.green),
        'v-btn__error': this.$options.filters.propsParser(this.danger)
      }
    }
  }
})
</script>

<style lang='scss'>
  .v-btn {
    @apply rounded-xl border-2 py-1 px-2 flex justify-center content-center;
  }
  .v-btn__green{
    @apply bg-green-600;
  }
  .v-btn__primary{
    @apply bg-blue-600;
  }
  .v-btn__danger{
    @apply bg-red-600;
  }
</style>
