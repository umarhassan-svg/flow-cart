import React from "react";
import { FaUser, FaRegEnvelope, FaTruck, FaStore } from "react-icons/fa";
import {
  DEFAULT_COUNTRIES,
  DEFAULT_STATES,
  COUNTRY_CODES,
} from "../../utils/getCheckoutData";
import { InputWrapper } from "./InputWrapper";
import type { Props } from "./Props-checkout";

const CheckoutForm: React.FC<Props> = ({
  name,
  email,
  countryCode,
  contact,
  delivery,
  country,
  state,
  zip,
  address,
  notes,
  className,
  countryOptions = DEFAULT_COUNTRIES,
  stateOptions = DEFAULT_STATES,
  onName,
  onEmail,
  onCountryCode,
  onContact,
  onDelivery,
  onCountry,
  onState,
  onZip,
  onAddress,
  onNotes,
}) => {
  return (
    <form
      className={`grid grid-cols-1 gap-3 ${className ?? ""}`}
      aria-label="Checkout form"
    >
      {/* Name / Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputWrapper label="Full name">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaUser />
            </div>
            <input
              value={name}
              onChange={(e) => onName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              placeholder="Jane Doe"
              required
            />
          </div>
        </InputWrapper>

        <InputWrapper label="Email">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaRegEnvelope />
            </div>
            <input
              value={email}
              onChange={(e) => onEmail(e.target.value)}
              type="email"
              className="w-full pl-10 pr-3 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              placeholder="you@company.com"
              required
            />
          </div>
        </InputWrapper>
      </div>

      {/* Delivery / Pickup segmented control */}
      <div className="pt-1">
        <div className="text-xs text-gray-500 mb-2">Fulfillment</div>
        <div
          role="radiogroup"
          aria-label="Delivery or pickup"
          className="inline-flex gap-2 bg-gray-50 p-1 rounded-lg"
        >
          <label
            className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              delivery === "delivery"
                ? "bg-white shadow-sm border border-indigo-200 text-indigo-700"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <input
              type="radio"
              name="fulfillment"
              value="delivery"
              checked={delivery === "delivery"}
              onChange={() => onDelivery("delivery")}
              className="sr-only"
            />
            <FaTruck className="w-4 h-4" />
            <span>Delivery</span>
          </label>

          <label
            className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              delivery === "pickup"
                ? "bg-white shadow-sm border border-indigo-200 text-indigo-700"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <input
              type="radio"
              name="fulfillment"
              value="pickup"
              checked={delivery === "pickup"}
              onChange={() => onDelivery("pickup")}
              className="sr-only"
            />
            <FaStore className="w-4 h-4" />
            <span>Pickup</span>
          </label>
        </div>
      </div>

      {/* Phone / Country Code */}
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 items-center">
        <InputWrapper label="Country code">
          <select
            value={countryCode}
            onChange={(e) => onCountryCode(e.target.value)}
            className="w-full tooltip rounded-md border px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-indigo-200"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </InputWrapper>

        <InputWrapper label="Phone number">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400">
              e.g. 345 678 9012
            </div>
            <div className="relative">
              <input
                value={contact}
                onChange={(e) => onContact(e.target.value)}
                type="tel"
                className="w-full pl-3 pr-28 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-indigo-200"
                placeholder="234 567 890"
                required
              />
            </div>
          </div>
        </InputWrapper>
      </div>

      {/* Country / State / Zip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputWrapper label="Country">
          <select
            value={country}
            onChange={(e) => onCountry(e.target.value)}
            className="w-full tooltip rounded-md border px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-indigo-200"
            required
          >
            <option value="">Select country</option>
            {countryOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </InputWrapper>

        <div className="grid grid-cols-1 gap-3">
          <InputWrapper label="State / Province" className="col-span-1">
            <select
              value={state}
              onChange={(e) => onState(e.target.value)}
              className="w-full tooltip rounded-md border px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-indigo-200"
              required
            >
              {stateOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </InputWrapper>

          <InputWrapper label="Zip code" className="col-span-1">
            <input
              value={zip}
              onChange={(e) => onZip(e.target.value)}
              className="w-full rounded-md border px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-indigo-200"
              placeholder="12345"
              required
            />
          </InputWrapper>
        </div>
      </div>

      {/* Address */}
      <InputWrapper label="Delivery address">
        <textarea
          value={address}
          onChange={(e) => onAddress(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-indigo-200"
          placeholder="Street address, apartment, suite..."
          required={delivery === "delivery"}
          disabled={delivery === "pickup"}
        />
      </InputWrapper>

      {/* Notes */}
      <InputWrapper label="Notes (optional)">
        <textarea
          value={notes}
          onChange={(e) => onNotes(e.target.value)}
          rows={3}
          className="w-full rounded-md border px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-200"
          placeholder="Any delivery notes or instructions..."
        />
      </InputWrapper>
    </form>
  );
};

export default CheckoutForm;
