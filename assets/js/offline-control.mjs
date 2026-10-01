export function ensureServiceWorkerControl(serviceWorkerContainer, registration, timeoutMs = 10000) {
  if (serviceWorkerContainer.controller) return Promise.resolve(serviceWorkerContainer.controller);

  const worker = registration.active;
  if (!worker) return Promise.reject(new Error("Não há um service worker ativo para controlar esta página."));

  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    let timeout;
    const cleanup = () => {
      clearTimeout(timeout);
      serviceWorkerContainer.removeEventListener("controllerchange", checkController);
      channel.port1.close();
    };
    const checkController = () => {
      if (!serviceWorkerContainer.controller) return;
      const controller = serviceWorkerContainer.controller;
      cleanup();
      resolve(controller);
    };

    serviceWorkerContainer.addEventListener("controllerchange", checkController);
    channel.port1.onmessage = event => {
      if (!event.data?.claimed) {
        cleanup();
        reject(new Error(event.data?.message ?? "O service worker não conseguiu assumir o controle da página."));
        return;
      }
      checkController();
    };
    timeout = setTimeout(() => {
      cleanup();
      reject(new Error("O service worker não assumiu o controle da página após solicitar clients.claim()."));
    }, timeoutMs);

    try {
      worker.postMessage({ type: "CLAIM_CLIENTS" }, [channel.port2]);
      checkController();
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}
