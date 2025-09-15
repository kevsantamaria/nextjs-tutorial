import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

interface Invoice {
  amount: number;
  name: string;
}

async function listInvoices(): Promise<Invoice[]> {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}