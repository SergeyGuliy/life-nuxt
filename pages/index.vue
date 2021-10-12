<template>
  <div class="home">
    <m-header />
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      class="home__map"
      map-type-id="terrain"
    >
      <!--      <GmapMarker-->
      <!--              :key="index"-->
      <!--              v-for="(m, index) in markers"-->
      <!--              :position="m.position"-->
      <!--              :clickable="true"-->
      <!--              :draggable="true"-->
      <!--              @click="center=m.position"-->
      <!--      />-->
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    'm-header': () => import('../components/layouts/m-header.vue')
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
  .home__map {
    @apply flex-auto;
    height: calc(100% - 64px);
  }
  }
</style>
