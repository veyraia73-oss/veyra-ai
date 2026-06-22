(() => {
  const PLAN_LABELS = {
    starter: 'Starter',
    growth: 'Growth',
    pro: 'Pro'
  };

  const PLAN_PRICES = {
    starter: '497 €/mes',
    growth: '997 €/mes',
    pro: '1.997 €/mes'
  };

  // Cuando publiques el frontend separado del backend, puedes definirlo antes de cargar este archivo:
  // <script>window.VEYRA_PAYMENT_API = 'https://tu-backend.com';</script>
  const isLocalFrontend = ['localhost', '127.0.0.1'].includes(window.location.hostname) && window.location.port !== '8787';
  const defaultLocalBackend = isLocalFrontend ? 'http://127.0.0.1:8787' : '';
  const PAYMENT_API_BASE = (window.VEYRA_PAYMENT_API || defaultLocalBackend || '').replace(/\/$/, '');

  const getApiUrl = (path) => {
    if (PAYMENT_API_BASE) return `${PAYMENT_API_BASE}${path}`;
    return path;
  };

  const waLink = (plan) => {
    const label = PLAN_LABELS[plan] || plan;
    return `https://wa.me/34617022859?text=${encodeURIComponent(`Hola Veyra AI, quiero contratar el plan ${label}.`)}`;
  };

  const showPaymentError = (plan, detail) => {
    const label = PLAN_LABELS[plan] || 'este plan';
    const price = PLAN_PRICES[plan] || '';
    const message = [
      `Todavía no puedo abrir la pasarela de pago para ${label} ${price}.`,
      'Para activar compras reales hay que levantar el backend de pagos y configurar las claves de Stripe.',
      detail ? `Detalle técnico: ${detail}` : '',
      'Mientras tanto puedes pedir activación por WhatsApp.'
    ].filter(Boolean).join('\n\n');

    const goWhatsapp = window.confirm(`${message}\n\n¿Abrir WhatsApp para contratar este plan?`);
    if (goWhatsapp) window.open(waLink(plan), '_blank', 'noopener');
  };

  const createCheckoutSession = async (plan) => {
    const response = await fetch(getApiUrl('/api/create-checkout-session'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });

    let payload = {};
    try { payload = await response.json(); } catch (_) {}

    if (!response.ok) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }
    if (!payload.url) {
      throw new Error('La API no devolvió una URL de pago.');
    }
    return payload.url;
  };

  const setLoading = (button, loading) => {
    if (!button) return;
    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = 'Abriendo pago seguro...';
      button.disabled = true;
      button.classList.add('is-loading');
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
      button.classList.remove('is-loading');
    }
  };

  const handleBuyClick = async (event) => {
    const button = event.currentTarget;
    const plan = button.dataset.buyPlan;
    if (!plan) return;

    setLoading(button, true);
    try {
      const checkoutUrl = await createCheckoutSession(plan);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error al crear sesión de pago:', error);
      showPaymentError(plan, error.message);
    } finally {
      setLoading(button, false);
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-buy-plan]').forEach((button) => {
      button.addEventListener('click', handleBuyClick);
    });
  });
})();
