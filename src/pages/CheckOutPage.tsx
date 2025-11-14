// src/pages/CheckoutPage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout-sidemenu";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow/CartItemRow";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import CheckoutForm from "../components/forms/CheckoutForm";
import { Toast } from "../components/ui/Toast";
import type { CartItem } from "../context/CartContext";
import type { Order, OrderItem } from "../types/orderTypes";
import { FaArrowLeft } from "react-icons/fa";

const TAX_RATE = 0.05;
const SHIPPING_FLAT = 4.99;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, updateQty, removeItem, clear } = useCart();

  // form state
  // form state (extended for new CheckoutForm)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [contact, setContact] = useState("");
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [country, setCountry] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // toast
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const subtotal = useMemo(() => total, [total]);
  const shipping = useMemo(
    () => (subtotal > 0 ? SHIPPING_FLAT : 0),
    [subtotal]
  );
  const grandTotal = useMemo(
    () => +(subtotal + subtotal * TAX_RATE + shipping).toFixed(2),
    [subtotal, shipping]
  );

  const validate = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      return "Please enter a valid email address.";
    if (!contact.trim() || !/^\d+$/.test(contact))
      return "Please enter a contact number.";
    if (delivery === "delivery" && !address.trim())
      return "Please enter your delivery address.";
    if (!country) return "Please select a country.";
    if (!stateVal) return "Please select a state/province.";
    if (!zip.trim() || !/^\d+$/.test(zip))
      return "Please enter a ZIP / postal code.";
    if (items.length === 0) return "Your cart is empty.";
    return null;
  };

  const scrollToTopOfLayout = () => {
    const container = document.querySelector(
      ".layout-content-scroll"
    ) as HTMLElement | null;
    if (container && typeof container.scrollTo === "function") {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = async () => {
    const err = validate();
    if (err) {
      setToast({ message: err, type: "error" });
      scrollToTopOfLayout();
      return;
    }

    setLoading(true);
    try {
      const orderItems: OrderItem[] = items.map((it: CartItem) => ({
        productId: it.productId,
        quantity: it.quantity,
        price: it.price,
      }));

      const order: Order = {
        id: `o-${Date.now()}`,
        customerId: email,
        items: orderItems,
        createdAt: new Date().toISOString(),
        status: "pending",
        meta: { customerName: name, contact, address, notes },
      };

      // TODO: replace with API call
      console.log("Order payload:", order);

      setToast({
        message: `Order ${order.id} placed successfully.`,
        type: "success",
      });

      // reset cart + form
      clear();
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
      setNotes("");

      // ensure toast visible
      scrollToTopOfLayout();
    } catch (e) {
      console.error(e);
      setToast({
        message: "Failed to place order. Please try again.",
        type: "error",
      });
      scrollToTopOfLayout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            duration={3200}
          />
        )}

        {/* Back + header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex tooltip items-center gap-2 text-sm text-gray-700 hover:text-indigo-600"
            aria-label="Go back"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review items, shipping details and place your order.
          </p>
        </header>

        {/* GRID: RIGHT column = products (2 rows + summary), LEFT column = checkout (row-span-3) */}
        <div
          className="grid grid-cols-1 gap-6
                     lg:grid-cols-[420px_1fr] lg:grid-rows-[1fr_1fr_auto]"
        >
          {/** LEFT: checkout (spans 3 rows) */}
          <aside
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:row-span-3 lg:col-start-1 min-h-0 flex flex-col"
            aria-label="Checkout"
          >
            <div className="mb-3 text-lg font-semibold text-black flex justify-center">
              Customer Details
            </div>

            <div className="flex-1 overflow-auto min-h-0">
              <CheckoutForm
                name={name}
                email={email}
                countryCode={countryCode}
                contact={contact}
                delivery={delivery}
                country={country}
                state={stateVal}
                zip={zip}
                address={address}
                notes={notes}
                loading={loading}
                disabled={items.length === 0}
                submitLabel={`Pay ${grandTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}`}
                onName={setName}
                onEmail={setEmail}
                onCountryCode={setCountryCode}
                onContact={setContact}
                onDelivery={setDelivery}
                onCountry={setCountry}
                onState={setStateVal}
                onZip={setZip}
                onAddress={setAddress}
                onNotes={setNotes}
                onSubmit={handlePlaceOrder}
              />
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">
                Need help? Contact support at support@example.com
              </div>
            </div>
          </aside>

          {/** RIGHT / ROW 1 (2.1) - products chunk A */}
          <section
            className="bg-white row-span-2 border border-gray-200 rounded-xl p-5 shadow-sm min-h-0 overflow-hidden"
            aria-label="Products top"
          >
            <div className="flex items-center justify-between mb-3 mx-4">
              <h2 className="text-md font-semibold text-black lg:text-lg">
                Review your Cart
              </h2>
              <span className="text-sm text-gray-900 md:text-md">
                Total Items: {items.length}
              </span>
            </div>

            <div className="overflow-auto max-h-[55vh] pr-1 min-h-0">
              {items.length === 0 ? (
                <div className="py-8 text-center text-gray-500">No items.</div>
              ) : (
                <ul className="space-y-4 pb-2">
                  {items.map((it: CartItem) => (
                    <CartItemRow
                      key={it.productId}
                      item={it}
                      onChangeQty={updateQty}
                      onRemove={removeItem}
                    />
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/** RIGHT / ROW 3 (2.3) - order summary */}
          <section>
            <OrderDetails
              subtotal={subtotal}
              taxRate={TAX_RATE}
              shipping={shipping}
              loading={loading}
              disabled={items.length === 0}
              submitLabel={`Pay ${grandTotal.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}`}
              onSubmit={handlePlaceOrder}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
