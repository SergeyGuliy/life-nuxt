<template>
  <client-only>
    <GmapMap
      class="v-map"
      map-type-id="terrain"
      :center="basicCords"
      :zoom="zoom"
      :options="options"
      :heading="22"
      style="height: 80vh;"
      @zoom_changed="resize"
      @center_changed="center_changed"
      @click="click"
    >
      <GmapCluster>
        <template v-for="(m, index) in markers">
          <GmapMarker
            :key="index"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          >
            <template #default="">
              <h1 style="width: 50px">
                {{ m }}
              </h1>
            </template>
          </GmapMarker>
        </template>
      </GmapCluster>
    </GmapMap>
  </client-only>
</template>

<script>
const DEFAULT_POINTS = 5
const DEFAULT_ZOOM = 5

function createPoint () {
  return { position: { lat: (+Math.random()) * 100, lng: (+Math.random()) * 100 } }
}

function createDefaultPoints (count = DEFAULT_POINTS) {
  if (count < 1) { return [] }
  return Array.from(Array(count).keys()).map((_) => {
    return createPoint()
  })
}
const DEFAULT_MAP_OPTIONS = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: true,
  fullscreenControl: false,
  disableDefaultUi: false
}

export default {
  name: 'MMap',
  components: {},
  data () {
    return {
      localZoom: DEFAULT_ZOOM,
      localBasicCords: createPoint(),
      options: DEFAULT_MAP_OPTIONS,
      markers: createDefaultPoints(DEFAULT_POINTS)
    }
  },
  computed: {
    basicCords: {
      get () {
        return this.localBasicCords
      },
      set (val) {
        localStorage.setItem('basicCords', JSON.stringify(val))
      }
    },
    zoom: {
      get () {
        return this.localZoom
      },
      set (val) {
        localStorage.setItem('zoom', val)
      }
    }
  },
  mounted () {
    this.localZoom = +localStorage.getItem('zoom') || DEFAULT_ZOOM
    this.localBasicCords = JSON.parse(localStorage.getItem('basicCords')) || createPoint()
  },
  methods: {
    click (val) {
      console.log(val)
    },
    resize (val) {
      this.zoom = val
    },
    center_changed (val) {
      this.basicCords = this.getCoords(val)
    },
    getCoords (val) {
      return { lat: val.lat(), lng: val.lng() }
    }
  }
}
</script>

<style lang='scss'>
  .v-map {
    @apply flex-auto;
    height: calc(100% - 64px);
  }
</style>
