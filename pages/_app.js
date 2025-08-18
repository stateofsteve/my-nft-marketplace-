import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import ErrorBoundary from "../components/ErrorBoundary";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThirdwebProvider
        clientId="bfac5cd8889d8a2348997339f09b55ee"
        activeChain={Base}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ErrorBoundary>
  );
}

export default MyApp;