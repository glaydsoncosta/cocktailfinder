import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import AppRoutes from "./src/screens/Index";

AppRegistry.registerComponent(appName, () => AppRoutes);