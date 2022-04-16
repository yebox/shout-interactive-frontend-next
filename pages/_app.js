import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/mui.scss";
import "../styles/style.css";
import "../styles/animation.css";
import AppStoreProvider from "../store";
import ClientOnly from "../components/ClientOnly";

function MyApp({ Component, pageProps }) {
  if (Component.clientOnly) {
    return (
      <AppStoreProvider>
        <ClientOnly>
          <Component {...pageProps} />
        </ClientOnly>
      </AppStoreProvider>
    );
  } else {
    return (
      <AppStoreProvider>
        <Component {...pageProps} />
      </AppStoreProvider>
    );
  }
}

export default MyApp;
