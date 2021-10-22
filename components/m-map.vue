<template>
  <div>
    <pre style="color: white">{{ activeCords }}</pre>
    <pre style="color: white">{{ isCreationMode }}</pre>
    <client-only>
      <GmapMap
        ref="mapRef"
        class="v-map"
        :class="{'v-map--cell': isCreationMode}"
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
          <GmapAddGeo
            :is-creation-mode="isCreationMode"
            @geoInitCreation="isCreationMode = true"
            @geoSubmit="geoSubmit"
            @geoCancel="geoCancel"
          />
        </template>
        <GmapCluster v-if="!isCreationMode" @click="clusterClick">
          <template v-for="(m, index) in visibleMarkers">
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
        <GmapCluster v-else @click="clusterClick">
          <template v-for="(m, index) in createdMarkers">
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
      visibleMarkers: createDefaultPoints(),
      map: null,
      isCreationMode: false,
      createdMarkers: []
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
    geoSubmit () {
      console.log('geoSubmit')
      this.isCreationMode = false
    },
    geoCancel () {
      console.log('geoCancel')
      this.isCreationMode = false
    },
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
      this.setBasicCoords(this.visibleMarkers[index].position)
    },
    clusterClick ({ center_ }) {
      this.setBasicCoords({ lat: center_.lat(), lng: center_.lng() })
    },
    addMarket (click) {
      if (!this.isCreationMode) { return }
      this.createdMarkers.push(createPoint(click.latLng.lat(), click.latLng.lng()))
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
  .v-map--cell{
    div[aria-roledescription="map"]{
      cursor: cell !important;
    }
  }
</style>
