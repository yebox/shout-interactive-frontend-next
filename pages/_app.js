import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/mui.scss";
import "../styles/style.css";
import "../styles/animation.css";
import AppStoreProvider from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <AppStoreProvider>
      <Component {...pageProps} />
    </AppStoreProvider>
  );
}

export default MyApp;
