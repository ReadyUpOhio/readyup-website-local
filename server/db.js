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
  source TEXT
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);
`);

// Lightweight migrations: add status and archived_at if they don't exist
try { db.exec(`ALTER TABLE leads ADD COLUMN status TEXT DEFAULT 'active'`); } catch {}
try { db.exec(`ALTER TABLE leads ADD COLUMN archived_at TEXT`); } catch {}
try { db.exec(`ALTER TABLE contacts ADD COLUMN status TEXT DEFAULT 'active'`); } catch {}
try { db.exec(`ALTER TABLE contacts ADD COLUMN archived_at TEXT`); } catch {}

db.exec(`
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  email TEXT NOT NULL UNIQUE
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  cover_letter TEXT,
  resume_name TEXT,
  resume_data_url TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  start_date TEXT,
  desired_pay TEXT,
  availability_type TEXT,
  hours_per_week TEXT,
  work_auth TEXT,
  over_18 TEXT,
  has_transport TEXT,
  website TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  experience_summary TEXT,
  last_employer TEXT,
  last_title TEXT,
  last_employment_dates TEXT,
  reference_name TEXT,
  reference_phone TEXT,
  availability_notes TEXT,
  consent INTEGER,
  status TEXT DEFAULT 'active',
  archived_at TEXT
);
`);

export function insertLead(lead) {
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
  return info.lastInsertRowid;
}

export function listLeads(status = 'active') {
  let rows;
  if (status === 'all') {
    rows = db.prepare('SELECT * FROM leads ORDER BY datetime(created_at) DESC').all();
  } else if (status === 'archived') {
    rows = db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY datetime(archived_at) DESC').all('archived');
  } else {
    rows = db.prepare('SELECT * FROM leads WHERE status IS NULL OR status = ? ORDER BY datetime(created_at) DESC').all('active');
  }
  return rows.map((r) => ({
    ...r,
    images: (() => { try { return JSON.parse(r.images_json || '[]'); } catch { return []; } })(),
  }));
}

export function deleteLead(id) {
  const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function updateLeadStatus(id, status) {
  const stmt = db.prepare('UPDATE leads SET status = ?, archived_at = CASE WHEN ? = "archived" THEN datetime("now") ELSE NULL END WHERE id = ?');
  const info = stmt.run(status, status, id);
  return info.changes > 0;
}

export function insertContact(msg) {
  const stmt = db.prepare(`INSERT INTO contacts (name, email, message) VALUES (@name, @email, @message)`);
  const info = stmt.run(msg);
  return info.lastInsertRowid;
}

export function listContacts(status = 'active') {
  let rows;
  if (status === 'all') {
    rows = db.prepare('SELECT * FROM contacts ORDER BY datetime(created_at) DESC').all();
  } else if (status === 'archived') {
    rows = db.prepare('SELECT * FROM contacts WHERE status = ? ORDER BY datetime(archived_at) DESC').all('archived');
  } else {
    rows = db.prepare('SELECT * FROM contacts WHERE status IS NULL OR status = ? ORDER BY datetime(created_at) DESC').all('active');
  }
  return rows;
}

export function updateContactStatus(id, status) {
  const stmt = db.prepare('UPDATE contacts SET status = ?, archived_at = CASE WHEN ? = "archived" THEN datetime("now") ELSE NULL END WHERE id = ?');
  const info = stmt.run(status, status, id);
  return info.changes > 0;
}

export function deleteContact(id) {
  const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function insertApplication(app) {
  const stmt = db.prepare(`INSERT INTO applications (
    name, email, phone, position, cover_letter, resume_name, resume_data_url,
    address, city, state, zip, start_date, desired_pay, availability_type, hours_per_week,
    work_auth, over_18, has_transport, website, linkedin, github, portfolio, experience_summary,
    last_employer, last_title, last_employment_dates, reference_name, reference_phone, availability_notes, consent
  ) VALUES (
    @name, @email, @phone, @position, @cover_letter, @resume_name, @resume_data_url,
    @address, @city, @state, @zip, @start_date, @desired_pay, @availability_type, @hours_per_week,
    @work_auth, @over_18, @has_transport, @website, @linkedin, @github, @portfolio, @experience_summary,
    @last_employer, @last_title, @last_employment_dates, @reference_name, @reference_phone, @availability_notes, @consent
  )`);
  const bound = {
    name: app.name,
    email: app.email,
    phone: app.phone,
    position: app.position,
    cover_letter: app.coverLetter,
    address: app.address,
    city: app.city,
    state: app.state,
    zip: app.zip,
    start_date: app.startDate,
    desired_pay: app.desiredPay,
    availability_type: app.availabilityType,
    hours_per_week: app.hoursPerWeek,
    work_auth: app.workAuth,
    over_18: app.over18 ? 1 : 0,
    has_transport: app.hasTransport ? 1 : 0,
    website: app.website,
    linkedin: app.linkedin,
    github: app.github,
    portfolio: app.portfolio,
    experience_summary: app.experienceSummary,
    last_employer: app.lastEmployer,
    last_title: app.lastTitle,
    last_employment_dates: app.lastEmploymentDates,
    reference_name: app.referenceName,
    reference_phone: app.referencePhone,
    availability_notes: app.availabilityNotes,
    consent: app.consent ? 1 : 0
  };
  try {
    bound.resume_name = app.resume.name;
    bound.resume_data_url = app.resume.dataUrl;
  } catch {
    bound.resume_name = null;
    bound.resume_data_url = null;
  }
  const info = stmt.run(bound);
  return info.lastInsertRowid;
}

export function listApplications(status = 'active') {
  let rows;
  if (status === 'all') {
    rows = db.prepare('SELECT * FROM applications ORDER BY datetime(created_at) DESC').all();
  } else if (status === 'archived') {
    rows = db.prepare('SELECT * FROM applications WHERE status = ? ORDER BY datetime(archived_at) DESC').all('archived');
  } else {
    rows = db.prepare('SELECT * FROM applications WHERE status IS NULL OR status = ? ORDER BY datetime(created_at) DESC').all('active');
  }
  return rows;
}

export function insertSubscriber(email) {
  const existing = db.prepare('SELECT id FROM subscribers WHERE email = ?').get(email);
  if (existing) {
    return { id: existing.id, isNew: false };
  }
  const stmt = db.prepare(`INSERT INTO subscribers (email) VALUES (?)`);
  const info = stmt.run(email);
  return { id: info.lastInsertRowid, isNew: true };
}

export function listSubscribers() {
  const rows = db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all();
  return rows;
}

export function updateApplicationStatus(id, status) {
  const stmt = db.prepare('UPDATE applications SET status = ?, archived_at = CASE WHEN ? = "archived" THEN datetime("now") ELSE NULL END WHERE id = ?');
  const info = stmt.run(status, status, id);
  return info.changes > 0;
}

export default db;
