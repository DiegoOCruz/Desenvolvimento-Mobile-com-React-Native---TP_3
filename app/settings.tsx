import { Topbar, Grid, Button } from "@/components";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsScreen() {
  const { toggleTheme, colorScheme } = useTheme();

  return (
    <Grid>
      <Topbar title="Configurações" back={true} menu={false} />
      <View style={{ margin: 16 }}>
        <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
          Tema: {colorScheme === "light" ? "Dark" : "Light"}
        </Button>
      </View>
    </Grid>
  );
}
