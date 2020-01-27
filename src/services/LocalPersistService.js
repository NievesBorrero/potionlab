export class LocalPersistService {
  static get (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return ''
    }
  }

  static store (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
    return data
  }

  static remove (key) {
    localStorage.removeItem(key)
  }
}

export const storeLocally = (key, data) => LocalPersistService.store(key, data)
export const getFromLocal = key => LocalPersistService.get(key)
export const removeLocally = key => LocalPersistService.remove(key)
