/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/Redux/store';
import messaging from '@react-native-firebase/messaging';

import { register } from '@videosdk.live/react-native-sdk';

const Main = () => {

    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

register()
AppRegistry.registerComponent(appName, () => Main);
