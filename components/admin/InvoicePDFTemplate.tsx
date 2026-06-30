import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { InvoiceData } from "@/types/invoice";

// ─── Colors ──────────────────────────────────────────────────────────────────
const BRAND     = "#171717";
const SECONDARY = "rgba(23,23,23,0.5)";
const ORANGE    = "#ea580c";
const WHITE     = "#ffffff";
const ZINC_50   = "#fafafa";
const ZINC_100  = "#f4f4f5";
const ZINC_200  = "#e4e4e7";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 44,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: BRAND,
    backgroundColor: WHITE,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  brandName: { fontSize: 16, fontFamily: "Helvetica-Bold", color: BRAND },
  brandTagline: { fontSize: 8, color: SECONDARY, marginTop: 3 },
  metaRight: { alignItems: "flex-end" },
  invoiceLabel: { fontSize: 8, color: SECONDARY, textTransform: "uppercase", letterSpacing: 1 },
  invoiceNumber: { fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 2 },
  invoiceDate: { fontSize: 8, color: SECONDARY, marginTop: 2 },

  // ── Divider ─────────────────────────────────────────────────────────────────
  divider: { height: 1, backgroundColor: ZINC_200, marginVertical: 14 },

  // ── Bill To ─────────────────────────────────────────────────────────────────
  sectionEyebrow: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: SECONDARY,
    marginBottom: 5,
  },
  clientName: { fontSize: 14, fontFamily: "Helvetica-Bold", color: BRAND },
  projectName: { fontSize: 9, color: SECONDARY, marginTop: 3 },

  // ── Package info ─────────────────────────────────────────────────────────────
  packageInfoRow: { flexDirection: "row", gap: 32, marginTop: 12 },
  packageInfoItem: {},
  packageInfoLabel: { fontSize: 7, color: SECONDARY },
  packageInfoValue: { fontSize: 9, fontFamily: "Helvetica-Bold", marginTop: 1, color: BRAND },

  // ── Table ────────────────────────────────────────────────────────────────────
  tableWrapper: { marginTop: 14 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: BRAND,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  thCell: { color: WHITE, fontSize: 8, fontFamily: "Helvetica-Bold" },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: ZINC_200,
    alignItems: "center",
  },
  tableRowAlt: { backgroundColor: ZINC_50 },
  tdCell: { fontSize: 8.5, color: BRAND },
  tdCellMuted: { fontSize: 8, color: SECONDARY },

  // column widths – bundle mode (total 100%)
  colNo:          { width: "5%" },
  colName:        { width: "30%" },
  colJumlah:      { width: "8%", textAlign: "center" },
  colDesignType:  { width: "20%" },
  colKet:         { width: "20%" },
  colStatus:      { width: "17%", alignItems: "flex-end" },

  // column widths – satuan mode
  colNoS:    { width: "5%" },
  colNameS:  { width: "32%" },
  colKetS:   { width: "28%" },
  colQty:    { width: "8%", textAlign: "right" },
  colPrice:  { width: "14%", textAlign: "right" },
  colTotal:  { width: "13%", textAlign: "right" },

  // ── Status badge ─────────────────────────────────────────────────────────────
  statusBadgeDelivered: {
    backgroundColor: "rgba(22,163,74,0.2)",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  statusBadgeExpired: {
    backgroundColor: "rgba(234,88,12,0.2)",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  statusTextDelivered: { color: "#16a34a", fontSize: 7.5, fontFamily: "Helvetica-Bold" },
  statusTextExpired:   { color: ORANGE, fontSize: 7.5 },

  // ── Package note ────────────────────────────────────────────────────────────
  packageNote: {
    backgroundColor: ZINC_100,
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    color: "rgba(23,23,23,0.65)",
    fontSize: 8,
    lineHeight: 1.5,
  },

  // ── Summary ─────────────────────────────────────────────────────────────────
  summaryWrapper: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
  summaryTable: { width: "45%" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: ZINC_200,
  },
  summaryLabel: { fontSize: 8, color: SECONDARY },
  summaryValue: { fontSize: 8, fontFamily: "Helvetica-Bold", color: BRAND },
  remainingBox: {
    backgroundColor: BRAND,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remainingLabel: { color: WHITE, fontSize: 8, fontFamily: "Helvetica-Bold" },
  remainingValue: { color: WHITE, fontSize: 14, fontFamily: "Helvetica-Bold" },

  // ── Payment info ─────────────────────────────────────────────────────────────
  paymentSection: {
    marginTop: 18,
    padding: 12,
    backgroundColor: ZINC_100,
    borderRadius: 4,
  },
  paymentTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 6, color: BRAND },
  paymentRow: { flexDirection: "row", marginTop: 3 },
  paymentLabel: { fontSize: 8, color: SECONDARY, width: 80 },
  paymentValue: { fontSize: 8, fontFamily: "Helvetica-Bold", color: BRAND },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerNote: { fontSize: 7.5, color: SECONDARY, maxWidth: "55%", lineHeight: 1.5 },
  thankYou: { fontSize: 10, fontFamily: "Helvetica-Bold", color: BRAND },

  // ── Page number ─────────────────────────────────────────────────────────────
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 44,
    fontSize: 7,
    color: SECONDARY,
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRupiah(amount: number) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function formatDate(iso: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// ─── Bundle table ────────────────────────────────────────────────────────────

function BundleTable({ data }: { data: InvoiceData }) {
  return (
    <View style={styles.tableWrapper}>
      <View style={styles.tableHeader}>
        <Text style={[styles.thCell, styles.colNo]}>No</Text>
        <Text style={[styles.thCell, styles.colName]}>Deliverable</Text>
        <Text style={[styles.thCell, styles.colJumlah]}>Count</Text>
        <Text style={[styles.thCell, styles.colDesignType]}>Design Type</Text>
        <Text style={[styles.thCell, styles.colKet]}>Notes</Text>
        <Text style={[styles.thCell, { width: "17%", textAlign: "right" }]}>Status</Text>
      </View>

      {data.deliverables.map((item, i) => (
        <View key={item.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
          <Text style={[styles.tdCellMuted, styles.colNo]}>{i + 1}</Text>
          <Text style={[styles.tdCell, styles.colName]}>{item.name}</Text>
          <Text style={[styles.tdCellMuted, styles.colJumlah]}>{item.slideCount ?? 1}</Text>
          <Text style={[styles.tdCellMuted, styles.colDesignType]}>{item.designType ?? "-"}</Text>
          <Text style={[styles.tdCellMuted, styles.colKet]}>{item.keterangan}</Text>
          <View style={styles.colStatus}>
            <View
              style={
                item.status === "Delivered"
                  ? styles.statusBadgeDelivered
                  : styles.statusBadgeExpired
              }
            >
              <Text
                style={
                  item.status === "Delivered"
                    ? styles.statusTextDelivered
                    : styles.statusTextExpired
                }
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── Satuan table ────────────────────────────────────────────────────────────

function SatuanTable({ data }: { data: InvoiceData }) {
  return (
    <View style={styles.tableWrapper}>
      <View style={styles.tableHeader}>
        <Text style={[styles.thCell, styles.colNoS]}>No</Text>
        <Text style={[styles.thCell, styles.colNameS]}>Item</Text>
        <Text style={[styles.thCell, styles.colKetS]}>Notes</Text>
        <Text style={[styles.thCell, styles.colQty]}>Qty</Text>
        <Text style={[styles.thCell, styles.colPrice]}>Unit Price</Text>
        <Text style={[styles.thCell, styles.colTotal]}>Total</Text>
      </View>

      {data.lineItems.map((item, i) => (
        <View key={item.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
          <Text style={[styles.tdCellMuted, styles.colNoS]}>{i + 1}</Text>
          <Text style={[styles.tdCell, styles.colNameS]}>{item.name}</Text>
          <Text style={[styles.tdCellMuted, styles.colKetS]}>{item.keterangan}</Text>
          <Text style={[styles.tdCellMuted, styles.colQty]}>{item.qty}</Text>
          <Text style={[styles.tdCellMuted, styles.colPrice]}>{formatRupiah(item.unitPrice)}</Text>
          <Text style={[styles.tdCell, styles.colTotal]}>{formatRupiah(item.qty * item.unitPrice)}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Summary ─────────────────────────────────────────────────────────────────

function Summary({ data, total, remaining }: { data: InvoiceData; total: number; remaining: number }) {
  const isBundle = data.mode === "bundle";
  const extraRevisiAmount = data.extraRevisiCount * 75_000;

  return (
    <View style={styles.summaryWrapper}>
      <View style={styles.summaryTable}>
        {isBundle ? (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Paket ({data.packageName})</Text>
            <Text style={styles.summaryValue}>{formatRupiah(data.packagePrice)}</Text>
          </View>
        ) : (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatRupiah(total - extraRevisiAmount)}</Text>
          </View>
        )}

        {extraRevisiAmount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Revisi di luar kuota ({data.extraRevisiCount}× Rp 75.000)
            </Text>
            <Text style={styles.summaryValue}>{formatRupiah(extraRevisiAmount)}</Text>
          </View>
        )}

        {data.dp > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              DP{data.dpDate ? ` (${formatDate(data.dpDate)})` : ""}
            </Text>
            <Text style={styles.summaryValue}>- {formatRupiah(data.dp)}</Text>
          </View>
        )}

        <View style={styles.remainingBox}>
          <Text style={styles.remainingLabel}>SISA TAGIHAN</Text>
          <Text style={styles.remainingValue}>{formatRupiah(remaining)}</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main Document ───────────────────────────────────────────────────────────

interface InvoiceDocumentProps {
  data: InvoiceData;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
}

export function InvoiceDocument({ data, bankName, bankAccount, bankHolder }: InvoiceDocumentProps) {
  const extraRevisiAmount = data.extraRevisiCount * 75_000;

  const total =
    data.mode === "bundle"
      ? data.packagePrice + extraRevisiAmount
      : data.lineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0) + extraRevisiAmount;

  const remaining = Math.max(0, total - (data.dp ?? 0));

  const footerNote =
    data.notes ||
    "Invoice ini merupakan dokumen resmi tagihan jasa desain & konten kreatif. Pembayaran di luar tenggat waktu dapat dikenakan biaya tambahan.";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>Maulana Bayu</Text>
            <Text style={styles.brandTagline}>Design & Content Creative Services</Text>
          </View>
          <View style={styles.metaRight}>
            <Text style={styles.invoiceLabel}>Invoice</Text>
            <Text style={styles.invoiceNumber}>{data.invoiceNumber}</Text>
            <Text style={styles.invoiceDate}>{formatDate(data.date)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ── Bill To ── */}
        <Text style={styles.sectionEyebrow}>Bill To</Text>
        <Text style={styles.clientName}>{data.clientName}</Text>
        {data.projectName ? <Text style={styles.projectName}>{data.projectName}</Text> : null}

        {/* ── Package info (bundle mode) ── */}
        {data.mode === "bundle" && (
          <View style={styles.packageInfoRow}>
            <View style={styles.packageInfoItem}>
              <Text style={styles.packageInfoLabel}>Paket</Text>
              <Text style={styles.packageInfoValue}>{data.packageName}</Text>
            </View>
            {(data.periodStart || data.periodEnd) && (
              <View style={styles.packageInfoItem}>
                <Text style={styles.packageInfoLabel}>Periode</Text>
                <Text style={styles.packageInfoValue}>
                  {data.periodStart ? formatDate(data.periodStart) : ""}
                  {data.periodStart && data.periodEnd ? " – " : ""}
                  {data.periodEnd ? formatDate(data.periodEnd) : ""}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.divider} />

        {/* ── Deliverable / Line Item table ── */}
        <Text style={styles.sectionEyebrow}>
          {data.mode === "bundle" ? "Deliverable" : "Item Pekerjaan"}
        </Text>

        {data.mode === "bundle" ? (
          <BundleTable data={data} />
        ) : (
          <SatuanTable data={data} />
        )}

        {/* ── Package note ── */}
        {data.mode === "bundle" && data.packageNote ? (
          <View style={styles.packageNote}>
            <Text>{data.packageNote}</Text>
          </View>
        ) : null}

        {/* ── Summary ── */}
        <Summary data={data} total={total} remaining={remaining} />

        <View style={styles.divider} />

        {/* ── Payment info ── */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Informasi Pembayaran</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Bank</Text>
            <Text style={styles.paymentValue}>{bankName}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>No. Rekening</Text>
            <Text style={styles.paymentValue}>{bankAccount}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Atas Nama</Text>
            <Text style={styles.paymentValue}>{bankHolder}</Text>
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerNote}>{footerNote}</Text>
          <Text style={styles.thankYou}>Terima kasih:)</Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
