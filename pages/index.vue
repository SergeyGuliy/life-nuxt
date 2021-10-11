<template>
  <div>
    <m-card />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    'm-card': () => import('../components/UI/m-card')
  },
  layout: 'mainLayout',
  data () {
    return {}
  }
})
</script>

<!--<style lang="scss">-->
<!--  body {-->
<!--    background-color: $base-color;-->

<!--    @include xl {-->
<!--      background-color: #7F828B;-->
<!--    }-->
<!--    @include lg {-->
<!--      background-color: orangered;-->
<!--    }-->
<!--    @include md {-->
<!--      background-color: green;-->
<!--    }-->
<!--    @include sm {-->
<!--      background-color: red;-->
<!--    }-->
<!--  }-->
<!--</style>-->
