<template>
  <div class="m-card">
    <div v-if="$slots.header" class="m-card__header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="m-card__body">
      <slot name="default" />
    </div>
    <div v-if="$slots.footer" class="m-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MCard',
  components: {},
  props: {},
  data () {
    return {}
  }
})
</script>

<style lang='scss'>
  .m-card {
    @apply rounded-xl border-2 bg-transparent shadow-md;
    .m-card__header{
      @apply p-2 border-b-2;
    }
    .m-card__body{
      @apply p-2;
    }
    .m-card__footer{
      @apply p-2 border-t-2;
    }
  }
</style>
