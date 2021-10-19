<template>
  <div class="className" @click="$emit('input', !value)">
    <img src="../../static/images/marker.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'GmapAddGeo',
  components: {},
  props: {
    value: {
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
  .className{
    cursor: pointer;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
    height: 40px;
    width: 40px;
    position: absolute;
    bottom: 140px;
    left: 10px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      max-height: 28px;
      max-width: 28px;
      opacity: 0.6;
    }
  }
  .className:hover{
    img{
      opacity: 0.85;
    }
  }
</style>
