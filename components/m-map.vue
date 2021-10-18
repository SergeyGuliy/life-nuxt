<template>
  <div>
    <pre style="color: white">{{ activeCords }}</pre>
    <pre style="color: white">{{ zoom }}</pre>
    <client-only>
      <GmapMap
        ref="mapRef"
        class="v-map"
        map-type-id="terrain"
        :center="basicCords"
        :zoom="zoom"
        :options="DEFAULT_MAP_OPTIONS"
        :heading="22"
        style="height: 80vh;"
        @zoom_changed="zoomChanged"
        @center_changed="centerChanged"
        @click="addMarket"
      >
        <div style="border: 1px solid black; position: absolute; background-color: white; text-align: center; width: 5em; cursor: pointer; right: 15.3em;" title="Show street map">
          <div style="border-style: solid; border-color: rgb(52, 86, 132) rgb(108, 157, 223) rgb(108, 157, 223) rgb(52, 86, 132); border-width: 1px; font-size: 12px; font-weight: bold;">
            Map
          </div>
        </div>
        <GmapCluster @click="clusterClick">
          <template v-for="(m, index) in markers">
            <GmapInfoWindow
              v-if="activeMarker === index"
              :key="index"
              :position="m.position"
              :clickable="true"
              :draggable="false"
              @closeclick="activeMarker = null"
            >
              <template #default="">
                <h1 style="width: 50px">
                  {{ m }}
                </h1>
              </template>
            </GmapInfoWindow>
            <GmapMarker
              v-else
              :key="index"
              :position="m.position"
              :clickable="true"
              :draggable="false"
              @click="activateMarker(index)"
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
  </div>
</template>

<script>
const DEFAULT_POINTS_COUNT = 15
const DEFAULT_ZOOM = 5

function createPoint (lat = (+Math.random()) * 100, lng = (+Math.random()) * 100) {
  return { position: { lat, lng } }
}

function createDefaultPoints (count = DEFAULT_POINTS_COUNT) {
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
  disableDefaultUi: false,
  zoomControlOptions: {
    position: 6
  },
  streetViewControlOptions: {
    position: 6
  },
  mapTypeControlOptions: {
    position: 6
  }
}

export default {
  name: 'MMap',
  components: {},
  data () {
    return {
      activeMarker: null,
      zoom: null,
      basicCords: null,
      activeCords: null,
      DEFAULT_MAP_OPTIONS,
      markers: createDefaultPoints()
    }
  },
  mounted () {
    this.zoom = +localStorage.getItem('zoom') || DEFAULT_ZOOM
    this.basicCords = JSON.parse(localStorage.getItem('basicCords')) || createPoint().position
    this.activeCords = JSON.parse(localStorage.getItem('basicCords')) || createPoint().position
    setTimeout(() => {
      this.$refs.mapRef.$mapPromise
        .then((map) => {
          console.log(map.controls)
          // map.panTo({ lat: 1.38, lng: 103.80 })
          console.log(google.maps.ControlPosition)

          const controlMarkerUI = document.createElement('DIV')
          const url = 'http://localhost:3000/images/marker.png'
          controlMarkerUI.style.cursor = 'pointer'
          controlMarkerUI.style.backgroundImage = `url(${url})`
          controlMarkerUI.style.backgroundSize = 'contain'
          controlMarkerUI.style.height = '28px'
          controlMarkerUI.style.width = '25px'
          controlMarkerUI.style.top = '11px'
          controlMarkerUI.style.left = '120px'
          controlMarkerUI.title = 'Click to set the map to Home'
          map.controls[6].push(controlMarkerUI)

          controlMarkerUI.addEventListener('click', this.controlMarkerUI)
          const controlTrashUI = document.createElement('DIV')
          controlTrashUI.style.cursor = 'pointer'
          controlTrashUI.style.backgroundImage = `url(${url})`
          controlTrashUI.style.backgroundSize = 'contain'
          controlTrashUI.style.height = '28px'
          controlTrashUI.style.width = '25px'
          controlTrashUI.style.top = '53px'
          controlTrashUI.style.left = '150px'
          controlTrashUI.title = 'Click to set the map to Home'
          controlTrashUI.addEventListener('click', this.controlTrashUI)

          map.controls[6].push(controlTrashUI)
        })
        .catch((e) => {
          console.error(e)
        })
    }, 0)
  },
  methods: {
    controlMarkerUI () {
      console.warn('controlMarkerUI')
    },
    controlTrashUI () {
      console.warn('controlMarkerUI')
    },

    setBasicCoords (coords) {
      this.activeCords = coords
      localStorage.setItem('basicCords', JSON.stringify(coords))
    },
    setZoom (zoom) {
      this.zoom = zoom
      localStorage.setItem('zoom', zoom)
    },
    activateMarker (index) {
      this.activeMarker = index
      this.setBasicCoords(this.markers[index].position)
    },
    clusterClick ({ center_ }) {
      this.setBasicCoords({ lat: center_.lat(), lng: center_.lng() })
    },
    addMarket (click) {
      this.markers.push(createPoint(click.latLng.lat(), click.latLng.lng()))
    },
    zoomChanged (zoom) {
      this.setZoom(zoom)
    },
    centerChanged (val) {
      this.setBasicCoords({ lat: val.lat(), lng: val.lng() })
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
