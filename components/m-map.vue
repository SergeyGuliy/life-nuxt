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
          <GmapAddGeo v-model="isEditMode"/>
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
import { createDefaultPoints, createPoint, DEFAULT_MAP_OPTIONS, DEFAULT_ZOOM } from '../helpers/map'
export default {
  name: 'MMap',
  components: {
    GmapAddGeo: () => import('./map/GmapAddGeo')
  },
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
</style>
