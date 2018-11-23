CREATE TABLE Admin (
page_id INT NOT NULL,
profile_id INT NOT NULL,
admin_since_date DATETIME DEFAULT(getdate()),
-- CONSTRAINT admin_pag FOREIGN KEY (page_id) REFERENCES Page(page_id) ON DELETE CASCADE,
-- CONSTRAINT admin_pro FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE
);

ALTER TABLE Admin ADD CONSTRAINT unique_admin UNIQUE(page_id, profile_id);

ALTER TABLE Admin ADD FOREIGN KEY (page_id) REFERENCES Page(page_id);
ALTER TABLE Admin ADD FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE;

INSERT INTO Admin (page_id, profile_id, admin_since_date) VALUES(2000, 1002, DEFAULT);

INSERT INTO Admin (page_id, profile_id, admin_since_date) VALUES(2002, 1007, DEFAULT);