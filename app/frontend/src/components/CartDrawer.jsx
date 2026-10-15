import { useState } from 'react';
import { Minus, Plus, Trash2, X, ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react'
import { createOrder } from '../api'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function CartDrawer({ isOpen, items, onClose, onRemove, onUpdateQuantity, onClearCart }) {
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutResult, setCheckoutResult] = useState(null)

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const shipping = subtotal > 0 ? 99 : 0
  const total = subtotal + shipping

  const handleCheckout = async () => {
    setCheckingOut(true)
    setCheckoutResult(null)
    try {
      const result = await createOrder({
        bike_name: items.map(i => i.name).join(', '),
        quantity: items.reduce((sum, i) => sum + i.quantity, 0),
        price: total,
        user_name: 'Guest User',
        user_email: 'guest@pedalcraft.test',
        message: `Order with ${items.length} item(s)`,
      })
      setCheckoutResult({ success: true, data: result })
      onClearCart()
    } catch (err) {
      setCheckoutResult({ success: false, error: err.message })
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-40 transition ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-[#0A0908]/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-label="Close cart overlay"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F7F5F1] shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 p-4 md:p-6">
          <div>
            <h2 className="font-display text-2xl font-light italic tracking-[-0.02em] md:text-3xl">
              Your cart
            </h2>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#5C5550] md:text-[11px]">
              {items.length} selected {items.length === 1 ? 'model' : 'models'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center border border-[#1A1A1A]/15 transition duration-300 hover:border-[#C8522C] md:h-11 md:w-11"
            aria-label="Close cart"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center">
              <div className="border border-dashed border-[#1A1A1A]/20 p-8 text-center md:p-10">
                <ShoppingBag size={32} className="mx-auto text-[#5C5550]/40" />
                <h3 className="font-display mt-4 text-lg font-light italic text-[#1A1A1A] md:text-xl">
                  Cart is empty
                </h3>
                <p className="mt-2 text-sm font-light text-[#5C5550]">
                  Add a bike from the shop to start building your order.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="grid grid-cols-[80px_1fr] gap-3 border border-[#1A1A1A]/10 bg-white p-2.5 md:grid-cols-[96px_1fr] md:gap-4 md:p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-full object-cover md:h-24"
                  />
                  <div>
                    <div className="flex items-start justify-between gap-2 md:gap-3">
                      <div>
                        <h3 className="font-display text-base font-light tracking-[-0.01em] text-[#1A1A1A] md:text-lg">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-[#5C5550]">
                          {currency.format(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center text-[#5C5550] transition hover:bg-[#C8522C]/10 hover:text-[#C8522C]"
                        aria-label={`Remove ${item.name}`}
                        title="Remove"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="mt-3 inline-flex items-center overflow-hidden border border-[#1A1A1A]/15 md:mt-4">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="grid h-8 w-8 place-items-center transition hover:bg-[#1A1A1A]/5 md:h-9 md:w-9"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={15} />
                      </button>
                      <span className="grid h-8 min-w-8 place-items-center border-x border-[#1A1A1A]/15 text-sm font-medium text-[#1A1A1A] md:h-9 md:min-w-10">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="grid h-8 w-8 place-items-center transition hover:bg-[#1A1A1A]/5 md:h-9 md:w-9"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {checkoutResult && (
          <div className={`border-b px-4 py-3 md:px-6 ${checkoutResult.success ? 'border-green-600/20 bg-green-50' : 'border-red-600/20 bg-red-50'}`}>
            <div className="flex items-center gap-2">
              {checkoutResult.success ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <AlertCircle size={18} className="text-red-600" />
              )}
              <p className={`text-sm font-medium ${checkoutResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {checkoutResult.success
                  ? `Order #${checkoutResult.data.id} — ${checkoutResult.data.status}`
                  : `Checkout failed: ${checkoutResult.error}`}
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-[#1A1A1A]/10 p-4 md:p-6">
          <div className="space-y-2.5 text-sm md:space-y-3">
            <div className="flex justify-between">
              <span className="text-[#5C5550]">Subtotal</span>
              <span className="font-medium text-[#1A1A1A]">{currency.format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C5550]">Delivery setup</span>
              <span className="font-medium text-[#1A1A1A]">{currency.format(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-[#1A1A1A]/10 pt-2.5 md:pt-3">
              <span className="font-display text-lg font-light italic text-[#1A1A1A] md:text-xl">Total</span>
              <span className="font-display text-lg font-light italic text-[#1A1A1A] md:text-xl">{currency.format(total)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0 || checkingOut}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-[#1A1A1A] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F5F1] transition duration-500 hover:bg-[#C8522C] disabled:cursor-not-allowed disabled:bg-[#1A1A1A]/20 disabled:text-[#F7F5F1]/40 md:mt-5"
          >
            {checkingOut ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#F7F5F1]/30 border-t-[#F7F5F1]" />
                Processing...
              </>
            ) : (
              'Checkout'
            )}
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
