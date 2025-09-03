import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { insertLead, listLeads, insertContact, listContacts, deleteContact, deleteLead, updateLeadStatus, updateContactStatus, insertApplication, listApplications, updateApplicationStatus, insertSubscriber, listSubscribers } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '5mb' }));

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Simple placeholder image generator: /api/placeholder/:w/:h
app.get('/api/placeholder/:w/:h', (req, res) => {
  const w = Math.max(1, Math.min(4000, Number(req.params.w)));
  const h = Math.max(1, Math.min(4000, Number(req.params.h)));
  const isValid = Number.isFinite(w) && Number.isFinite(h);
  if (!isValid) return res.status(400).send('Invalid dimensions');
  const bg = '#1f2937'; // gray-800
  const fg = '#9ca3af'; // gray-400
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${fg}" font-family="system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="${Math.max(10, Math.min(48, Math.floor(Math.min(w, h) / 8)))}">${w}×${h}</text>
  </svg>`;
  res.setHeader('Content-Type', 'image/svg+xml');
  return res.send(svg);
});

// Leads
app.post('/api/leads', (req, res) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.email || !b.collection_type || !b.description) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const id = insertLead({
      name: b.name,
      email: b.email,
      phone: b.phone || null,
      collection_type: b.collection_type,
      description: b.description,
      estimated_value: b.estimated_value || null,
      images: Array.isArray(b.images) ? b.images.slice(0, 6) : [],
      source: b.source || 'sell_form'
    });
    return res.json({ success: true, id });
  } catch (e) {
    console.error('POST /api/leads error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/leads', (req, res) => {
  try {
    const status = (req.query.status || 'active');
    const rows = listLeads(String(status));
    return res.json({ success: true, data: rows });
  } catch (e) {
    console.error('GET /api/leads error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a lead
app.delete('/api/leads/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = deleteLead(id);
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/leads/:id error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Archive a lead (soft delete)
app.post('/api/leads/:id/archive', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateLeadStatus(id, 'archived');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/leads/:id/archive error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Restore an archived lead back to active
app.post('/api/leads/:id/restore', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateLeadStatus(id, 'active');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/leads/:id/restore error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Contacts
app.post('/api/contacts', (req, res) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.email || !b.message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const id = insertContact({ name: b.name, email: b.email, message: b.message });
    return res.json({ success: true, id });
  } catch (e) {
    console.error('POST /api/contacts error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/contacts', (req, res) => {
  try {
    const status = (req.query.status || 'active');
    const rows = listContacts(String(status));
    return res.json({ success: true, data: rows });
  } catch (e) {
    console.error('GET /api/contacts error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = deleteContact(id);
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/contacts/:id error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Archive a contact (soft delete)
app.post('/api/contacts/:id/archive', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateContactStatus(id, 'archived');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/contacts/:id/archive error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Restore a contact to active
app.post('/api/contacts/:id/restore', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateContactStatus(id, 'active');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/contacts/:id/restore error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Subscribers
app.post('/api/subscribe', (req, res) => {
  try {
    const b = req.body || {};
    if (!b.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(b.email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    const result = insertSubscriber(b.email);
    if (result.isNew) {
      return res.json({ success: true, id: result.id, message: 'Successfully subscribed!' });
    } else {
      return res.status(200).json({ success: true, id: result.id, message: 'You are already subscribed.' });
    }
  } catch (e) {
    console.error('POST /api/subscribe error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/subscribers', (req, res) => {
  try {
    const rows = listSubscribers();
    return res.json({ success: true, data: rows });
  } catch (e) {
    console.error('GET /api/subscribers error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Applications
app.post('/api/applications', (req, res) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.email) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const id = insertApplication(b);
    return res.json({ success: true, id });
  } catch (e) {
    console.error('POST /api/applications error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/applications', (req, res) => {
  try {
    const status = (req.query.status || 'active');
    const rows = listApplications(String(status));
    return res.json({ success: true, data: rows });
  } catch (e) {
    console.error('GET /api/applications error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/applications/:id/archive', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateApplicationStatus(id, 'archived');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/applications/:id/archive error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/applications/:id/restore', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const ok = updateApplicationStatus(id, 'active');
    if (!ok) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('POST /api/applications/:id/restore error', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5175;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
