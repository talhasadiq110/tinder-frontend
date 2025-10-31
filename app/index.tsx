import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';

import { LikedListScreen } from './screens/LikedListScreen';
import { MainScreen } from './screens/MainScreen';
import { SplashScreen } from './screens/SplashScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="LikedList" component={LikedListScreen} />
          </Stack.Navigator>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
