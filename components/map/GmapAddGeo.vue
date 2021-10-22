<template>
  <div class="v-map-addgeo">
    <button v-if="!isCreationMode" class="v-map-addgeo--button" @click="$emit('geoInitCreation')">
      <IconLocationMarket />
    </button>
    <template v-else>
      <button class="v-map-addgeo--button" @click="$emit('geoSubmit')">
        <IconDocumentAdd />
      </button>
      <button class="v-map-addgeo--button" @click="$emit('geoCancel')">
        <IconDocumentRemove />
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GmapAddGeo',
  components: {
    IconDocumentAdd: () => import('../../assets/svg/document-add.svg'),
    IconDocumentRemove: () => import('../../assets/svg/document-remove.svg'),
    IconLocationMarket: () => import('../../assets/svg/location-market.svg')
  },
  props: {
    isCreationMode: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang='scss'>
  .v-map-addgeo{
    @apply absolute;
    position: absolute;
    bottom: 140px;
    left: 10px;
    .v-map-addgeo--button{
      @apply cursor-pointer bg-white h-10 w-10 border-2 flex justify-center items-center;
      box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
      svg{
        @apply opacity-60 max-h-7 max-w-7;
      }
    }

    .v-map-addgeo--button:hover svg{
        @apply opacity-80;
    }
  }
</style>
