import { SafeAreaView } from 'react-native-safe-area-context'
const Screen = (View: any) => () => {
  return (
    <SafeAreaView className="bg-primary-light h-full">
      <View />
    </SafeAreaView>
  )
}
export default Screen