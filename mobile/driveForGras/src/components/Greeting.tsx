import { selectUserState } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import Icons from "@cd/native-ui/src/icons";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { H5 } from "./Typography";

type GreetingProps = { 
  isLoading?: boolean; 
  subtitle?: string;
}
function Greeting ( props: GreetingProps ) {
  
  const 
  { user } = useSelector(selectUserState);

  return (
    <View className='flex absolute top-0 left-0 z-10 rounded-md p-1 m-1 bg-primary shadow'>
      <View className="flex-row items-center ">
        <H5 color="light">
          {' '}Good day{`, ${user.firstName}` || '!'}{" "}
        </H5>
        <Icons.Flower color="white"/>
      </View>
    </View>
  );
}

export default Greeting;