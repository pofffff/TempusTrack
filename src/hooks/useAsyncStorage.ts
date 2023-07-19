import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSecureStore = () => {
  const setValue = async (key: string, value: string) => {
    try {
      AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
      console.error(`Error storing ${key}`)
    }
  }

  const deleteValue = async (key: string) => {
    try {
      await AsyncStorage.removeItem(`@${key}`)
    } catch (e) {
      console.error(`Error deleting ${key}`)
    }
  }

  const getValue = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(`@${key}`)
      if (result) {
        return result
      } else {
        console.error(`${key} not found`)
      }
    } catch (e) {
      console.error(`Error reading ${key} `)
    }
  }

  return { setValue, deleteValue, getValue }
}
