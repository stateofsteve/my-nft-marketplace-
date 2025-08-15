import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId="bfac5cd8889d8a2348997339f09b55ee"
      activeChain={Base}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;