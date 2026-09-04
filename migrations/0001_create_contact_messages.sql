CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (length(email) BETWEEN 3 AND 254),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 10 AND 4000),
  created_at TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0, 1))
) STRICT;

CREATE INDEX contact_messages_unread_created_at
ON contact_messages (is_read, created_at DESC);
