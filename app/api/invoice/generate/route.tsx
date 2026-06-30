import { renderToBuffer } from "@react-pdf/renderer";
import { InvoiceDocument } from "@/components/admin/InvoicePDFTemplate";
import type { InvoiceData } from "@/types/invoice";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Auth check — same token the middleware validates
  const cookieStore = await cookies();
  const token = cookieStore.get("masbay_admin")?.value;
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = (await request.json()) as InvoiceData;

  const bankName = process.env.INVOICE_BANK_NAME ?? "BCA";
  const bankAccount = process.env.INVOICE_BANK_ACCOUNT ?? "—";
  const bankHolder = process.env.INVOICE_BANK_HOLDER ?? "@m4sbay";

  const buffer = await renderToBuffer(
    <InvoiceDocument
      data={data}
      bankName={bankName}
      bankAccount={bankAccount}
      bankHolder={bankHolder}
    />
  );

  const filename = `invoice-${data.clientName.toLowerCase().replace(/\s+/g, "-")}-${data.invoiceNumber.replace(/\//g, "-")}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
