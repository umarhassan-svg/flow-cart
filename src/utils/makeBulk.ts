// src/utils/makeBulk.ts
import type { BulkOrder, OrderItem } from "../services/order.service";

type ParsedRow = Record<string, string | undefined>;

/**
 * Convert parsed CSV rows -> one BulkOrder.
 * - rows: array from your CSV parser (header -> value)
 * - customerIdArg: optional override (used when CSV lacks customerId column)
 *
 * Throws Error on validation failures.
 */
export function makeBulk(rows: ParsedRow[], customerIdArg?: string): BulkOrder {
  if (!rows || rows.length === 0) throw new Error("No rows provided");

  const pick = (row: ParsedRow, ...keys: string[]) => {
    for (const k of keys) {
      const found = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
      if (found) return (row[found] ?? "").toString();
    }
    return "";
  };

  // customerId: prefer explicit arg, else first non-empty customerId in rows
  const customerFromCsv = rows.map((r) => pick(r, "customerId", "customer_name", "customerId")).find(Boolean) ?? "";
  const customerId = (customerIdArg && customerIdArg.trim()) || (customerFromCsv && String(customerFromCsv).trim()) || "";

  if (!customerId) throw new Error("Customer name is required (pass as argument or include 'customerId' column).");

  const items: OrderItem[] = rows.map((r, idx) => {
    const productId = (pick(r, "productId", "product_id", "sku", "SKU") || "").trim();
    const qtyRaw = (pick(r, "quantity", "qty") || "").trim();
    const priceRaw = (pick(r, "price", "amount") || "").trim();

    if (!productId) throw new Error(`Row ${idx + 1}: missing productId`);
    const quantity = Number(qtyRaw || "0");
    if (!Number.isFinite(quantity) || quantity <= 0) throw new Error(`Row ${idx + 1}: invalid quantity "${qtyRaw}"`);

    const price = priceRaw === "" ? undefined : Number(priceRaw.replace(/,/g, ""));
    const item: OrderItem = { productId, quantity };
    if (price !== undefined && !Number.isNaN(price)) item.price = price;

    // attach extra cols as metadata on item (optional)
    for (const k of Object.keys(r)) {
      const low = k.toLowerCase();
      if (!["productid", "product_id", "sku", "quantity", "qty", "price", "amount", "customerId", "customer_name"].includes(low)) {
        // only include string values (parsed CSV yields strings)
        // @ts-expect-error allow dynamic extra fields
        item[k] = r[k];
      }
    }

    return item;
  });

  return { customerId, items };
}
