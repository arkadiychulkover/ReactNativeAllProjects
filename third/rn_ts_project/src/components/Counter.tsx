import {View, Text, Button} from 'react-native';
import useCounterStore from '../store/counterStore';

const Counter = () => 
    {
        const {count, up, down, clear} = useCounterStore();

        return (
            <View>
                <Text>Counter: {count}</Text>
                <Button title="Increment" onPress={() => up(1)} />
                <Button title="Decrement" onPress={() => down(1)} />
                <Button title="Clear" onPress={clear} />
            </View>
        );
     }

export default Counter;