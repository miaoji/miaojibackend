export function filterStoreSelect(payload) {
  if (payload.name) {
    payload.idUser = payload.name.split('///')[0]
    delete payload.name
    // payload.name = payload.name.split('///')[1]
  }
}
