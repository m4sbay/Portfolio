"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { bundlePackages, perItemRates, revisiLuarPaket } from "@/data/rate-card";
import type { InvoiceData, Deliverable, LineItem, StoredInvoice } from "@/types/invoice";

// ─── Constants ───────────────────────────────────────────────────────────────

const LS_KEY = "masbay_invoices";

const DELIVERABLE_OPTIONS = [
  "Single Post",
  "Carousel",
  "Multiple Post",
  "Expired",
] as const;

const DESIGN_TYPE_OPTIONS = [
  "Feed Instagram",
  "Poster",
  "Banner",
  "Flyer",
  "Story",
] as const;

function isSingleDesign(name: string): boolean {
  return name === "Single Post";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function calcTotal(data: InvoiceData): number {
  const extraRevisi = data.extraRevisiCount * revisiLuarPaket;
  if (data.mode === "bundle") {
    return data.packagePrice + extraRevisi;
  }
  return (
    data.lineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0) + extraRevisi
  );
}

function calcRemaining(data: InvoiceData): number {
  return Math.max(0, calcTotal(data) - (data.dp ?? 0));
}

function generateInvoiceNumber(count: number): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const seq = String(count + 1).padStart(3, "0");
  return `INV/${yyyy}/${mm}/${seq}`;
}

function loadHistory(): StoredInvoice[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as StoredInvoice[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(list: StoredInvoice[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function emptyData(invoiceCount: number): InvoiceData {
  const pkg = bundlePackages[1]; // GasBay sebagai default
  return {
    invoiceNumber: generateInvoiceNumber(invoiceCount),
    date: todayIso(),
    clientName: "",
    projectName: "",
    mode: "bundle",
    packageName: pkg.name,
    packagePrice: pkg.price,
    periodStart: "",
    periodEnd: "",
    deliverables: [],
    packageNote: "",
    dp: 0,
    dpDate: "",
    lineItems: [],
    extraRevisiCount: 0,
    notes: "",
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0.5 focus:ring-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-white/20 ${className}`}
    />
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="number"
      value={value === 0 ? "" : value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      placeholder={placeholder ?? "0"}
      min={0}
      className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0.5 focus:ring-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:focus:border-white/20 ${className}`}
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
      {children}
    </p>
  );
}

// ─── Deliverable table (bundle mode) ─────────────────────────────────────────

function DeliverableTable({
  items,
  onChange,
}: {
  items: Deliverable[];
  onChange: (items: Deliverable[]) => void;
}) {
  function addRow() {
    onChange([
      ...items,
      {
        id: uid(),
        name: DELIVERABLE_OPTIONS[0],
        slideCount: 1,
        designType: DESIGN_TYPE_OPTIONS[0],
        keterangan: "-",
        status: "Delivered",
      },
    ]);
  }

  function updateRow(id: string, patch: Partial<Deliverable>) {
    onChange(items.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function handleNameChange(id: string, name: string) {
    const slideCount = isSingleDesign(name) ? 1 : (items.find((r) => r.id === id)?.slideCount ?? 1);
    updateRow(id, { name, slideCount });
  }

  function removeRow(id: string) {
    onChange(items.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      {items.length > 0 && (
        <div className="grid grid-cols-[20px_1.5fr_70px_140px_1fr_90px_20px] gap-2 px-1">
          {["No", "Deliverable", "Count", "Design Type", "Notes", "Status", ""].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {h}
            </span>
          ))}
        </div>
      )}

      {items.map((item, i) => {
        const single = isSingleDesign(item.name);
        const isDelivered = item.status === "Delivered";
        return (
          <div key={item.id} className="grid grid-cols-[20px_1.5fr_70px_140px_1fr_90px_20px] items-center gap-2">
            <span className="text-center text-xs text-zinc-400">{i + 1}</span>

            {/* Dropdown nama deliverable */}
            <select
              value={item.name}
              onChange={(e) => handleNameChange(item.id, e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
            >
              {DELIVERABLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {/* Count */}
            <input
              type="number"
              value={item.slideCount ?? 1}
              min={1}
              disabled={single}
              onChange={(e) => updateRow(item.id, { slideCount: Number(e.target.value) || 1 })}
              className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-center text-sm text-zinc-950 outline-none focus:border-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:disabled:bg-white/5"
            />

            {/* Design Type */}
            <select
              value={item.designType ?? DESIGN_TYPE_OPTIONS[0]}
              onChange={(e) => updateRow(item.id, { designType: e.target.value })}
              className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
            >
              {DESIGN_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <TextInput
              value={item.keterangan}
              onChange={(v) => updateRow(item.id, { keterangan: v })}
              placeholder="-"
            />

            {/* Status badge toggle */}
            <button
              type="button"
              onClick={() =>
                updateRow(item.id, {
                  status: isDelivered ? "Expired" : "Delivered",
                })
              }
              style={{
                backgroundColor: isDelivered
                  ? "rgba(22,163,74,0.15)"
                  : "rgba(234,88,12,0.15)",
                color: isDelivered ? "#16a34a" : "#ea580c",
              }}
              className="w-full rounded-full py-1.5 text-xs font-semibold transition"
            >
              {item.status}
            </button>

            <button
              type="button"
              onClick={() => removeRow(item.id)}
              className="text-zinc-400 transition hover:text-red-500"
              aria-label="Hapus baris"
            >
              ×
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addRow}
        className="mt-1 rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-700 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20"
      >
        + Tambah deliverable
      </button>
    </div>
  );
}

// ─── Line item table (satuan mode) ───────────────────────────────────────────

function LineItemTable({
  items,
  onChange,
}: {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
}) {
  const [showRateCard, setShowRateCard] = useState(false);

  function addEmpty() {
    onChange([...items, { id: uid(), name: "", keterangan: "", qty: 1, unitPrice: 0 }]);
  }

  function addFromRate(rate: (typeof perItemRates)[number]) {
    onChange([
      ...items,
      {
        id: uid(),
        name: rate.name,
        keterangan: rate.description,
        qty: 1,
        unitPrice: rate.priceMin,
      },
    ]);
    setShowRateCard(false);
  }

  function updateRow(id: string, patch: Partial<LineItem>) {
    onChange(items.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function removeRow(id: string) {
    onChange(items.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-2">
      {items.length > 0 && (
        <div className="grid grid-cols-[24px_1fr_1fr_64px_120px_28px] gap-2 px-1">
          {["No", "Item", "Keterangan", "Qty", "Harga Satuan", ""].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {h}
            </span>
          ))}
        </div>
      )}

      {items.map((item, i) => (
        <div
          key={item.id}
          className="grid grid-cols-[24px_1fr_1fr_64px_120px_28px] items-center gap-2"
        >
          <span className="text-center text-xs text-zinc-400">{i + 1}</span>
          <TextInput
            value={item.name}
            onChange={(v) => updateRow(item.id, { name: v })}
            placeholder="Nama item"
          />
          <TextInput
            value={item.keterangan}
            onChange={(v) => updateRow(item.id, { keterangan: v })}
            placeholder="Keterangan"
          />
          <NumberInput
            value={item.qty}
            onChange={(v) => updateRow(item.id, { qty: v })}
            placeholder="1"
          />
          <NumberInput
            value={item.unitPrice}
            onChange={(v) => updateRow(item.id, { unitPrice: v })}
            placeholder="0"
          />
          <button
            type="button"
            onClick={() => removeRow(item.id)}
            className="text-zinc-400 transition hover:text-red-500"
            aria-label="Hapus baris"
          >
            ×
          </button>
        </div>
      ))}

      {/* Subtotal preview */}
      {items.length > 0 && (
        <div className="flex justify-end pr-8">
          <span className="text-xs text-zinc-500">
            Subtotal:{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {formatRupiah(items.reduce((s, r) => s + r.qty * r.unitPrice, 0))}
            </span>
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addEmpty}
          className="rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-700 dark:border-white/10 dark:text-zinc-400"
        >
          + Baris kosong
        </button>
        <button
          type="button"
          onClick={() => setShowRateCard((p) => !p)}
          className="rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-700 dark:border-white/10 dark:text-zinc-400"
        >
          {showRateCard ? "↑ Tutup rate card" : "+ Tambah dari rate card"}
        </button>
      </div>

      {showRateCard && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-semibold text-zinc-500">Rate card — klik untuk tambah</p>
          <div className="space-y-1">
            {perItemRates.map((rate) => (
              <button
                key={rate.name}
                type="button"
                onClick={() => addFromRate(rate)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition hover:bg-zinc-200 dark:hover:bg-white/10"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{rate.name}</span>
                <span className="text-zinc-500">
                  {formatRupiah(rate.priceMin)} – {formatRupiah(rate.priceMax)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── History sidebar ──────────────────────────────────────────────────────────

function InvoiceHistory({
  history,
  onLoad,
  onDelete,
}: {
  history: StoredInvoice[];
  onLoad: (inv: StoredInvoice) => void;
  onDelete: (id: string) => void;
}) {
  if (history.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
        Riwayat Invoice
      </p>
      <div className="space-y-2">
        {history.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {inv.invoiceNumber}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {inv.clientName} · {inv.projectName}
              </p>
              <p className="text-xs text-zinc-400">
                Sisa {formatRupiah(inv.remainingAmount)} ·{" "}
                {new Date(inv.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onLoad(inv)}
                className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/10"
              >
                Buka
              </button>
              <button
                type="button"
                onClick={() => onDelete(inv.id)}
                className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-red-300 hover:text-red-500 dark:border-white/10"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function InvoiceForm() {
  const [history, setHistory] = useState<StoredInvoice[]>([]);
  const [data, setData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; msg: string } | null>(null);
  const formId = useId();

  // Load history from localStorage on mount (client only)
  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    setData(emptyData(stored.length));
  }, []);

  const patch = useCallback(
    <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
      setData((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    []
  );

  function handlePackageChange(name: string) {
    const pkg = bundlePackages.find((p) => p.name === name);
    if (!pkg) return;
    setData((prev) =>
      prev
        ? {
            ...prev,
            packageName: pkg.name,
            packagePrice: pkg.price,
          }
        : prev
    );
  }

  function handleModeChange(mode: InvoiceData["mode"]) {
    setData((prev) => (prev ? { ...prev, mode } : prev));
  }

  function handleLoadHistory(inv: StoredInvoice) {
    setData(inv.data);
    setStatus(null);
  }

  function handleDeleteHistory(id: string) {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    saveHistory(next);
  }

  function handleNewInvoice() {
    const stored = loadHistory();
    setData(emptyData(stored.length));
    setStatus(null);
  }

  async function handleGenerate() {
    if (!data) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setStatus({ type: "error", msg: "Gagal generate PDF. Coba lagi." });
        return;
      }

      // Download PDF
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const filename =
        res.headers.get("Content-Disposition")?.match(/filename="(.+)"/)?.[1] ??
        `invoice-${data.invoiceNumber}.pdf`;
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      // Save to localStorage
      const total = calcTotal(data);
      const remaining = calcRemaining(data);
      const newEntry: StoredInvoice = {
        id: uid(),
        invoiceNumber: data.invoiceNumber,
        clientName: data.clientName,
        projectName: data.projectName,
        totalAmount: total,
        remainingAmount: remaining,
        createdAt: new Date().toISOString(),
        data,
      };
      // Update or append (match by invoice number)
      const stored = loadHistory();
      const existingIdx = stored.findIndex((h) => h.invoiceNumber === data.invoiceNumber);
      let next: StoredInvoice[];
      if (existingIdx >= 0) {
        next = stored.map((h, i) => (i === existingIdx ? newEntry : h));
      } else {
        next = [newEntry, ...stored];
      }
      saveHistory(next);
      setHistory(next);

      setStatus({ type: "ok", msg: `PDF berhasil didownload: ${filename}` });
    } catch {
      setStatus({ type: "error", msg: "Terjadi kesalahan jaringan." });
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-400">
        Memuat...
      </div>
    );
  }

  const total = calcTotal(data);
  const remaining = calcRemaining(data);

  return (
    <div className="space-y-8">
      {/* History */}
      <InvoiceHistory history={history} onLoad={handleLoadHistory} onDelete={handleDeleteHistory} />

      {/* Form card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            {history.some((h) => h.invoiceNumber === data.invoiceNumber)
              ? "Edit Invoice"
              : "Invoice Baru"}
          </h2>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleNewInvoice}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5"
            >
              + Invoice baru
            </button>
          )}
        </div>

        <form id={formId} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* ── Meta ── */}
          <div className="space-y-3">
            <SectionTitle>Meta</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel>Nomor Invoice</FieldLabel>
                <TextInput
                  value={data.invoiceNumber}
                  onChange={(v) => patch("invoiceNumber", v)}
                  placeholder="INV/2026/06/001"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Tanggal Invoice</FieldLabel>
                <TextInput
                  type="date"
                  value={data.date}
                  onChange={(v) => patch("date", v)}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-white/10" />

          {/* ── Client ── */}
          <div className="space-y-3">
            <SectionTitle>Bill To</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel>Nama Klien</FieldLabel>
                <TextInput
                  value={data.clientName}
                  onChange={(v) => patch("clientName", v)}
                  placeholder="Nama organisasi / klien"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Nama Project / Event</FieldLabel>
                <TextInput
                  value={data.projectName}
                  onChange={(v) => patch("projectName", v)}
                  placeholder="Nama project atau event"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-white/10" />

          {/* ── Mode toggle ── */}
          <div className="space-y-3">
            <SectionTitle>Mode Invoice</SectionTitle>
            <div className="flex gap-2">
              {(["bundle", "satuan"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModeChange(m)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    data.mode === m
                      ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                      : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5"
                  }`}
                >
                  {m === "bundle" ? "Paket / Retainer" : "Per Satuan"}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-white/10" />

          {/* ── Bundle mode ── */}
          {data.mode === "bundle" && (
            <div className="space-y-5">
              <SectionTitle>Detail Paket</SectionTitle>

              {/* Package picker */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>Paket</FieldLabel>
                  <select
                    value={data.packageName}
                    onChange={(e) => handlePackageChange(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                  >
                    {bundlePackages.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {formatRupiah(p.price)}/bulan
                      </option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Harga Paket (Rp)</FieldLabel>
                  <NumberInput
                    value={data.packagePrice}
                    onChange={(v) => patch("packagePrice", v)}
                    placeholder="2500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>Periode Mulai</FieldLabel>
                  <TextInput
                    type="date"
                    value={data.periodStart}
                    onChange={(v) => patch("periodStart", v)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Periode Selesai</FieldLabel>
                  <TextInput
                    type="date"
                    value={data.periodEnd}
                    onChange={(v) => patch("periodEnd", v)}
                  />
                </div>
              </div>

              {/* Deliverable table */}
              <div className="space-y-2">
                <FieldLabel>Deliverable</FieldLabel>
                <DeliverableTable
                  items={data.deliverables}
                  onChange={(v) => patch("deliverables", v)}
                />
              </div>

              {/* Package note */}
              <div className="space-y-1.5">
                <FieldLabel>Catatan Paket (opsional)</FieldLabel>
                <textarea
                  value={data.packageNote}
                  onChange={(e) => patch("packageNote", e.target.value)}
                  rows={2}
                  placeholder="Mis: 1 carousel = 1 unit konten, terlepas jumlah slide"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0.5
                  focus:ring-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:placeholder:text-zinc-600"
                />
              </div>

              {/* DP */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>DP yang Sudah Diterima (Rp)</FieldLabel>
                  <NumberInput
                    value={data.dp}
                    onChange={(v) => patch("dp", v)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Tanggal DP</FieldLabel>
                  <TextInput
                    type="date"
                    value={data.dpDate}
                    onChange={(v) => patch("dpDate", v)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Satuan mode ── */}
          {data.mode === "satuan" && (
            <div className="space-y-5">
              <SectionTitle>Item Pekerjaan</SectionTitle>
              <LineItemTable
                items={data.lineItems}
                onChange={(v) => patch("lineItems", v)}
              />

              {/* DP for satuan mode */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>DP yang Sudah Diterima (Rp, opsional)</FieldLabel>
                  <NumberInput
                    value={data.dp}
                    onChange={(v) => patch("dp", v)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Tanggal DP</FieldLabel>
                  <TextInput
                    type="date"
                    value={data.dpDate}
                    onChange={(v) => patch("dpDate", v)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-zinc-100 dark:border-white/10" />

          {/* ── Extra revisi (common) ── */}
          <div className="space-y-2">
            <SectionTitle>Revisi di Luar Kuota</SectionTitle>
            <div className="flex items-center gap-3">
              <div className="w-28">
                <NumberInput
                  value={data.extraRevisiCount}
                  onChange={(v) => patch("extraRevisiCount", v)}
                  placeholder="0"
                />
              </div>
              <span className="text-sm text-zinc-500">
                konten × {formatRupiah(revisiLuarPaket)} ={" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatRupiah(data.extraRevisiCount * revisiLuarPaket)}
                </span>
              </span>
            </div>
          </div>

          {/* ── Notes ── */}
          <div className="space-y-1.5">
            <FieldLabel>Catatan Tambahan / Footer PDF (opsional)</FieldLabel>
            <textarea
              value={data.notes}
              onChange={(e) => patch("notes", e.target.value)}
              rows={2}
              placeholder="Catatan yang muncul di footer PDF. Kosongkan untuk teks default."
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0.5 focus:ring-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:placeholder:text-zinc-600"
            />
          </div>
        </form>
      </div>

      {/* ── Summary ── */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
        <SectionTitle>Ringkasan</SectionTitle>
        <div className="mt-3 space-y-2 text-sm">
          {data.mode === "bundle" ? (
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Total paket ({data.packageName})</span>
              <span className="font-semibold">{formatRupiah(data.packagePrice)}</span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Subtotal item</span>
              <span className="font-semibold">
                {formatRupiah(
                  data.lineItems.reduce((s, r) => s + r.qty * r.unitPrice, 0)
                )}
              </span>
            </div>
          )}

          {data.extraRevisiCount > 0 && (
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Revisi di luar kuota ({data.extraRevisiCount}×)
              </span>
              <span className="font-semibold">
                {formatRupiah(data.extraRevisiCount * revisiLuarPaket)}
              </span>
            </div>
          )}

          {data.dp > 0 && (
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>DP sudah diterima</span>
              <span>− {formatRupiah(data.dp)}</span>
            </div>
          )}

          <div className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 dark:bg-white/10">
            <span className="text-sm font-semibold text-zinc-100">Sisa Tagihan</span>
            <span className="text-xl font-bold text-white">{formatRupiah(remaining)}</span>
          </div>

          <p className="text-xs text-zinc-400">
            Total invoice: {formatRupiah(total)}
          </p>
        </div>
      </div>

      {/* ── Action ── */}
      <div className="space-y-3">
        {status && (
          <p
            className={`text-sm ${
              status.type === "ok"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {status.msg}
          </p>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !data.clientName || (data.mode === "bundle" ? !data.packageName : data.lineItems.length === 0)}
          className="w-full rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {loading ? "Generating PDF..." : "Generate & Download PDF"}
        </button>
        <p className="text-center text-xs text-zinc-400">
          Invoice akan otomatis tersimpan di riwayat browser setelah berhasil didownload.
        </p>
      </div>
    </div>
  );
}
