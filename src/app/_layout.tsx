import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#242329" } }}>
      <Stack.Screen name="launch" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="burger/[id]/page" options={{ headerShown: false }} />
    </Stack>
  )
}
