export const DEFAULT_POINTS_COUNT = 15
export const DEFAULT_ZOOM = 5

export const DEFAULT_MAP_OPTIONS = {
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

export function createPoint (lat = (+Math.random()) * 100, lng = (+Math.random()) * 100) {
  return { position: { lat, lng } }
}

export function createDefaultPoints (count = DEFAULT_POINTS_COUNT) {
  if (count < 1) { return [] }
  return Array.from(Array(count).keys()).map((_) => {
    return createPoint()
  })
}
