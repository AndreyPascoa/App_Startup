import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { rootStack } from './src/types/rootStack';

import { Login } from './src/screens/login/page';
import Home from './src/home/page';
import Dashboard from './src/screens/dashboard/page';
import CadastroProduto from './src/screens/produto/page';

import { ProtectedLayout } from './src/layout/ProtectedLayout';
import NovaAnotacao from './src/screens/anotacao/page';
import NovaReceita from './src/screens/novareceita/page';

export default function App() {
  const Stack = createNativeStackNavigator<rootStack>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Home" children={() =>
          <ProtectedLayout><Home /></ProtectedLayout>
        } />

        <Stack.Screen name="Dashboard" children={() =>
          <ProtectedLayout><Dashboard /></ProtectedLayout>
        } />

        <Stack.Screen name="CadastroProduto" children={() =>
          <ProtectedLayout><CadastroProduto /></ProtectedLayout>
        } />

        <Stack.Screen name="NovaAnotacao" children={() =>
          <ProtectedLayout><NovaAnotacao /></ProtectedLayout>
        } />

        <Stack.Screen name="NovaReceita" children={() =>
          <ProtectedLayout><NovaReceita /></ProtectedLayout>
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
