import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const dbPath = path.join(dataDir, 'app.sqlite');

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  collection_type TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_value TEXT,
  images_json TEXT,
  source TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'active'
);
`);

// Add status columns if they don't exist (for existing databases)
try { db.exec('ALTER TABLE leads ADD COLUMN status TEXT DEFAULT \'active\''); } catch (e) {}
try { db.exec('ALTER TABLE contacts ADD COLUMN status TEXT DEFAULT \'active\''); } catch (e) {}

export function insertLead(lead: {
  name: string;
  email: string;
  phone?: string;
  collection_type: string;
  description: string;
  estimated_value?: string;
  images?: string[];
  source?: string;
}) {
  const stmt = db.prepare(`INSERT INTO leads (name, email, phone, collection_type, description, estimated_value, images_json, source)
    VALUES (@name, @email, @phone, @collection_type, @description, @estimated_value, @images_json, @source)`);
  const info = stmt.run({
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    collection_type: lead.collection_type,
    description: lead.description,
    estimated_value: lead.estimated_value ?? null,
    images_json: JSON.stringify(lead.images ?? []),
    source: lead.source ?? 'sell_form'
  });
  return info.lastInsertRowid as number;
}

export function listLeads(status: string = 'active') {
  const where = status === 'all' ? '' : `WHERE status = ?`;
  const params = status === 'all' ? [] : [status];
  const rows = db.prepare(`SELECT * FROM leads ${where} ORDER BY datetime(created_at) DESC`).all(params);
  return rows.map((r: any) => ({
    ...r,
    images: (() => { try { return JSON.parse(r.images_json || '[]'); } catch { return []; } })(),
  }));
}

export function deleteLead(id: number) {
  const info = db.prepare('DELETE FROM leads WHERE id = ?').run(id);
  return info.changes > 0;
}

export function updateLeadStatus(id: number, status: 'active' | 'archived') {
  const info = db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, id);
  return info.changes > 0;
}

export function insertContact(msg: { name: string; email: string; message: string; }) {
  const stmt = db.prepare(`INSERT INTO contacts (name, email, message) VALUES (@name, @email, @message)`);
  const info = stmt.run(msg);
  return info.lastInsertRowid as number;
}

export function listContacts(status: string = 'active') {
  const where = status === 'all' ? '' : `WHERE status = ?`;
  const params = status === 'all' ? [] : [status];
  const rows = db.prepare(`SELECT * FROM contacts ${where} ORDER BY datetime(created_at) DESC`).all(params);
  return rows;
}

export function deleteContact(id: number) {
  const info = db.prepare('DELETE FROM contacts WHERE id = ?').run(id);
  return info.changes > 0;
}

export function updateContactStatus(id: number, status: 'active' | 'archived') {
  const info = db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
  return info.changes > 0;
}

export default db;
