import { NativeTabs } from "expo-router/native-tabs";

export default function AppTabs() {
  return (
    <NativeTabs hidden>
      <NativeTabs.Trigger name="index" />
      <NativeTabs.Trigger name="explore" />
    </NativeTabs>
  );
}
