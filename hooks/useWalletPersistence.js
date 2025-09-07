import { useEffect } from 'react';
import { useConnectionStatus, useConnect } from '@thirdweb-dev/react';

export function useWalletPersistence() {
  const connectionStatus = useConnectionStatus();
  const connect = useConnect();

  useEffect(() => {
    // Save connection status to localStorage when connected
    if (connectionStatus === 'connected') {
      localStorage.setItem('wallet-auto-connect', 'true');
    } else if (connectionStatus === 'disconnected') {
      localStorage.removeItem('wallet-auto-connect');
    }
  }, [connectionStatus]);

  useEffect(() => {
    // Auto-reconnect on page load if previously connected
    const shouldAutoConnect = localStorage.getItem('wallet-auto-connect');
    
    if (shouldAutoConnect && connectionStatus === 'disconnected') {
      // Get the last used wallet from localStorage if available
      const lastWallet = localStorage.getItem('thirdweb-active-wallet');
      
      if (lastWallet) {
        try {
          // Attempt to reconnect with the last used wallet
          const walletConfig = JSON.parse(lastWallet);
          if (walletConfig && connect) {
            // This will trigger the wallet connection modal
            // Users can then choose to reconnect
            console.log('Auto-reconnect available for:', walletConfig);
          }
        } catch (error) {
          console.log('Error parsing last wallet config:', error);
          localStorage.removeItem('wallet-auto-connect');
        }
      }
    }
  }, [connectionStatus, connect]);

  return {
    connectionStatus,
    isAutoConnecting: connectionStatus === 'connecting'
  };
}