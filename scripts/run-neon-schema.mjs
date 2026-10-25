// Schema migration for Neon Postgres
// Uses pg (node-postgres) with explicit IPv4 + SNI servername
// because Vodacom CGNAT blocks hostname-based TLS to Neon
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import pg from 'pg';
import { readFileSync } from 'fs';

const env = {};
for (const line of readFileSync('.env', 'utf-8').split('\n')) {
  if (line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('=');
  let val = v.join('=').trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  env[k.trim()] = val;
}

const { Client } = pg;
const u = new URL(env.DATABASE_URL);
const endpointId = u.hostname.split('.')[0];

// Resolve hostname to IPv4
const { promises: dnsPromises } = dns;
const addresses = await dnsPromises.resolve4(u.hostname);
const ip = addresses[0];
console.log('Resolved', u.hostname, '->', ip);

const client = new Client({
  host: ip,
  port: 5432,
  user: u.username,
  password: decodeURIComponent(u.password),
  database: u.pathname.slice(1),
  ssl: { rejectUnauthorized: false, servername: u.hostname },
});

const schema = readFileSync('supabase/neon-schema.sql', 'utf-8');

try {
  await client.connect();
  console.log('Connection OK');
  await client.query(schema);
  console.log('Schema applied successfully');
  const tables = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;"
  );
  console.log('Tables:', tables.rows.map(r => r.table_name).join(', '));
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
} finally {
  await client.end();
}
