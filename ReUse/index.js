/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src/app/App';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';

enableScreens();
AppRegistry.registerComponent(appName, () => App);
