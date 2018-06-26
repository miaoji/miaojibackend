export function filterStoreSelect(payload) {
  if (payload.name) {
    payload.name = payload.name.split('///')[1]
  }
}
