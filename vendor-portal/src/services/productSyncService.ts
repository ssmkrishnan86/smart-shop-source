export const notifyProductSync = (actionType: 'CREATED' | 'APPROVED' | 'REJECTED' | 'DELETED' | 'EDITED') => {
  try {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('smartshop_product_sync_channel');
      channel.postMessage({ type: actionType, timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    // Ignore error
  }
  try {
    localStorage.setItem('smartshop_product_sync_event', JSON.stringify({ type: actionType, timestamp: Date.now() }));
  } catch (e) {
    // Ignore error
  }
};

export const subscribeProductSync = (onSync: (actionType: string) => void) => {
  let channel: BroadcastChannel | null = null;
  try {
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel('smartshop_product_sync_channel');
      channel.onmessage = (event) => {
        if (event?.data?.type) {
          onSync(event.data.type);
        }
      };
    }
  } catch (e) {
    // Ignore
  }

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === 'smartshop_product_sync_event' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed?.type) {
          onSync(parsed.type);
        }
      } catch (err) {
        // Ignore
      }
    }
  };

  window.addEventListener('storage', handleStorageEvent);

  return () => {
    if (channel) channel.close();
    window.removeEventListener('storage', handleStorageEvent);
  };
};
