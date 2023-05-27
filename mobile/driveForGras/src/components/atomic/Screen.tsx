import { SafeAreaView } from 'react-native-safe-area-context'

function Screen (Component: any) {
  return () => {
    return (
      <SafeAreaView className="bg-primary p-2 h-full">
        <Component />
      </SafeAreaView>
    )
  }
}
export default Screen