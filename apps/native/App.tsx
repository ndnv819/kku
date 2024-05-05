import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Native() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://meongkkuk.vercel.app/' }} />
    </SafeAreaView>
  )
}

