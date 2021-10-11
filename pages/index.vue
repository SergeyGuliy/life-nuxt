<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
  }
})
</script>

<style lang="scss">
  * {
    background-color: $base-color;

    @include md {
      background-color: blue;
    }
  }
</style>
