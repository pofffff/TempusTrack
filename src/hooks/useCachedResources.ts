// import { FontAwesome } from 'react-native-vector-icons'
// import * as Font from 'expo-font'
// import * as SplashScreen from 'expo-splash-screen'
// import { useEffect, useState } from 'react'

// export default function useCachedResources() {
//     const [isLoadingComplete, setLoadingComplete] = useState(false)

//     // Load any resources or data that we need prior to rendering the app
//     useEffect(() => {
//         async function loadResourcesAndDataAsync() {
//             try {
//                 SplashScreen.preventAutoHideAsync()

//                 // Load fonts, for IOS gotta render with -
//                 await Font.loadAsync({
//                     ...FontAwesome.font,
//                     spaceMonoRegular: require('../assets/fonts/SpaceMonoRegular.ttf'),
//                     spaceMonoBold: require('../assets/fonts/SpaceMonoBold.ttf'),
//                     robotoLight: require('../assets/fonts/RobotoLight.ttf'),
//                     robotoRegular: require('../assets/fonts/RobotoRegular.ttf'),
//                     robotoMedium: require('../assets/fonts/RobotoMedium.ttf'),
//                     robotoBold: require('../assets/fonts/RobotoBold.ttf')
//                 })
//             } catch (e) {
//                 // We might want to provide this error information to an error reporting service
//                 console.warn(e)
//             } finally {
//                 setLoadingComplete(true)
//                 SplashScreen.hideAsync()
//             }
//         }

//         loadResourcesAndDataAsync()
//     }, [])

//     return isLoadingComplete
// }
