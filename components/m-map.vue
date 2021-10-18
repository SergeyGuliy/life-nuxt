<template>
  <div>
    <pre style="color: white">{{ activeCords }}</pre>
    <pre style="color: white">{{ isEditMode }}</pre>
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
        @click="addMarket"
      >
        <template #visible="">
          <div class="className" @click="isEditMode = !isEditMode">
            <img src="../static/images/marker.png" alt="">
          </div>
        </template>
        <GmapCluster v-if="isEditMode" @click="clusterClick">
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
            />
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
      markers: createDefaultPoints(),
      map: null,
      isEditMode: false
    }
  },
  mounted () {
    this.zoom = +localStorage.getItem('zoom') || DEFAULT_ZOOM
    this.basicCords = JSON.parse(localStorage.getItem('basicCords')) || createPoint().position
    this.activeCords = JSON.parse(localStorage.getItem('basicCords')) || createPoint().position
    setTimeout(() => {
      this.$refs.mapRef.$mapPromise
        .then((map) => {
          this.map = map
        })
        .catch((e) => {
          console.error(e)
        })
    }, 0)
  },
  methods: {
    setBasicCoords (coords) {
      this.activeCords = coords
      this.map.panTo(coords)
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
    }
  }
}
</script>

<style lang='scss'>
  .v-map {
    @apply flex-auto;
    height: calc(100% - 64px);
  }
  .className{
    cursor: pointer;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
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
