import Home from './Home';
import FindCocktail from './FindCocktail';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
  
// Defining the default routemap (just two screens)
const MainStack = createStackNavigator({ Home: Home, FindCocktail: FindCocktail });

// Basic app routemap
const AppRoutes = createAppContainer(createSwitchNavigator(
  { MainStack: MainStack }
));

export default AppRoutes;
