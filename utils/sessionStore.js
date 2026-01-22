const crypto = require('crypto');

class SessionStore {
  constructor(ttlSeconds = 1800) {
    this.store = new Map();
    this.ttl = ttlSeconds;
    setInterval(() => this.cleanup(), Math.max(60000, this.ttl * 500));
  }

  generateId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return crypto.randomBytes(16).toString('hex');
  }

  createSession(initial = {}) {
    const sid = this.generateId();
    const expiresAt = Date.now() + this.ttl * 1000;
    this.store.set(sid, { data: initial, expiresAt });
    return { sid, session: initial };
  }

  getSession(sid) {
    if (!sid) return null;
    const rec = this.store.get(sid);
    if (!rec) return null;
    if (rec.expiresAt < Date.now()) {
      this.store.delete(sid);
      return null;
    }
    rec.expiresAt = Date.now() + this.ttl * 1000;
    return rec.data;
  }

  touchSession(sid) {
    const rec = this.store.get(sid);
    if (!rec) return;
    rec.expiresAt = Date.now() + this.ttl * 1000;
  }

  cleanup() {
    const now = Date.now();
    for (const [sid, rec] of this.store.entries()) {
      if (rec.expiresAt < now) this.store.delete(sid);
    }
  }

  setAttribute(sid, key, value) {
    const rec = this.store.get(sid);
    if (!rec) return false;
    rec.data[key] = value;
    rec.expiresAt = Date.now() + this.ttl * 1000;
    return true;
  }
}

module.exports = new SessionStore(60 * 30);