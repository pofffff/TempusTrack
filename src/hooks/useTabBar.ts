import { useState } from 'react'

export const useTabBar = () => {
  const [tabKey, setTabKey] = useState<string>()

  const navigateTo = (key: string) => {
    setTabKey(key)
  }
  // useEffect(() => {

  // }, [])

  return { navigateTo, tabKey }
}
