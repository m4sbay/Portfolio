import type { Metadata } from "next";
import { InvoiceForm } from "@/components/admin/InvoiceForm";

export const metadata: Metadata = {
  title: "Invoice Generator",
  robots: { index: false, follow: false },
};

export default function AdminInvoicePage() {
  return (
    <div className="space-y-8 py-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
          Admin — Internal
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Invoice Generator
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Generate invoice PDF untuk klien. Data tersimpan di browser ini saja.
        </p>
      </header>

      <InvoiceForm />
    </div>
  );
}
