/**
 * Respuesta al iniciar una sesión de Stripe Checkout.
 */
export interface CheckoutSession {
  /** ID de la sesión que devuelve Stripe */
  sessionId: string;

  /** URL a la que redirigir al usuario para completar el pago */
  url: string;
}
