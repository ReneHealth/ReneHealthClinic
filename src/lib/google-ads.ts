let leadConversionSent = false;

export function trackLeadConversion() {
  if (leadConversionSent) {
    return;
  }

  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: "AW-18328119686/FW0JCIHT7dUcEIbTw6NE",
  });

  leadConversionSent = true;
}