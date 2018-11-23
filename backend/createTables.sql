CREATE TABLE Account (
account_id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
creation_date DATETIME DEFAULT(getdate()),
account_type VARCHAR(7) NOT NULL
);

CREATE TABLE Category (
category_id INT NOT NULL IDENTITY(20, 1) PRIMARY KEY,
category_description VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Page (
page_id INT NOT NULL IDENTITY(2000, 1) PRIMARY KEY,
page_name VARCHAR(100) NOT NULL,
logo_url VARCHAR(300),
header_image_url VARCHAR(300),
description VARCHAR(2000),
category INT,
account_id INT NOT NULL,
-- CONSTRAINT page_cat FOREIGN KEY (category) REFERENCES Category(category_id) ON DELETE SET NULL,
-- CONSTRAINT page_acc FOREIGN KEY (account_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE Page ADD FOREIGN KEY (category) REFERENCES Category(category_id) ON DELETE SET NULL;
ALTER TABLE Page ADD FOREIGN KEY (account_id) REFERENCES Account(account_id) ON DELETE CASCADE;

CREATE TABLE Profile (
profile_id INT NOT NULL IDENTITY(1000, 1) PRIMARY KEY,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
phone VARCHAR(12) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
username VARCHAR(12) NOT NULL UNIQUE,
password VARCHAR(12) NOT NULL,
account_id INT NOT NULL,
-- CONSTRAINT profile_acc FOREIGN KEY (account_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE Profile ADD FOREIGN KEY (account_id) REFERENCES Account(account_id) ON DELETE CASCADE;

CREATE TABLE Member (
page_id INT NOT NULL,
profile_id INT NOT NULL ,
join_date DATETIME DEFAULT(getdate()),
-- CONSTRAINT member_pag FOREIGN KEY (page_id) REFERENCES Page(page_id) ON DELETE CASCADE,
-- CONSTRAINT member_pro FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE
);

ALTER TABLE Member ADD CONSTRAINT unique_member UNIQUE(page_id, profile_id);

ALTER TABLE Member ADD FOREIGN KEY (page_id) REFERENCES Page(page_id);
ALTER TABLE Member ADD FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE;

CREATE TABLE PageView (
page_id INT NOT NULL,
profile_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
-- CONSTRAINT pageview_pag FOREIGN KEY (page_id) REFERENCES Page(page_id) ON DELETE CASCADE,
-- CONSTRAINT pageview_pro FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE
);

ALTER TABLE PageView ADD CONSTRAINT unique_pageview UNIQUE(page_id, profile_id);

ALTER TABLE PageView ADD FOREIGN KEY (page_id) REFERENCES Page(page_id) ON DELETE CASCADE;
ALTER TABLE PageView ADD FOREIGN KEY (profile_id) REFERENCES Profile(profile_id);

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

CREATE TABLE Message (
recipient_id INT NOT NULL,
sender_id INT NOT NULL,
sent_time DATETIME DEFAULT(getdate()),
was_sent BIT,
was_delivered BIT,
was_read BIT,
body VARCHAR(2000) NOT NULL,
-- CONSTRAINT message_rec FOREIGN KEY (recipient_id) REFERENCES Account(account_id) ON DELETE CASCADE,
-- CONSTRAINT message_sen FOREIGN KEY (sender_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE Message ADD FOREIGN KEY (recipient_id) REFERENCES Account(account_id);
ALTER TABLE Message ADD FOREIGN KEY (sender_id) REFERENCES Account(account_id);


CREATE TABLE Post (
post_id INT NOT NULL IDENTITY(3000, 1) PRIMARY KEY,
time DATETIME DEFAULT(getdate()),
author_id INT NOT NULL,
destination_id INT NOT NULL,
attachment_url VARCHAR(200),
body VARCHAR(2000) NOT NULL,
-- CONSTRAINT post_aut FOREIGN KEY (author_id) REFERENCES Account(account_id) ON DELETE CASCADE
-- CONSTRAINT post_des FOREIGN KEY (destination_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE Post ADD FOREIGN KEY (author_id) REFERENCES Account(account_id);
ALTER TABLE Post ADD FOREIGN KEY (destination_id) REFERENCES Account(account_id);

CREATE TABLE PostLike (
post_id INT NOT NULL,
liked_by_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
-- CONSTRAINT postlike_pos FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
-- CONSTRAINT postlike_acc FOREIGN KEY (liked_by_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE PostLike ADD FOREIGN KEY (post_id) REFERENCES Post(post_id)
ALTER TABLE PostLike ADD FOREIGN KEY (liked_by_id) REFERENCES Account(account_id);

ALTER TABLE PostLike ADD CONSTRAINT unique_postlike UNIQUE(post_id, liked_by_id);

CREATE TABLE PostView (
post_id INT NOT NULL,
viewed_by_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
-- CONSTRAINT postview_pos FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
-- CONSTRAINT postview_acc FOREIGN KEY (viewed_by_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE PostView ADD FOREIGN KEY (post_id) REFERENCES Post(post_id);
ALTER TABLE PostView ADD FOREIGN KEY (viewed_by_id) REFERENCES Account(account_id);

ALTER TABLE PostView ADD CONSTRAINT unique_postview UNIQUE(post_id, viewed_by_id);

CREATE TABLE Comment (
comment_id INT NOT NULL IDENTITY(4000, 1) PRIMARY KEY,
post_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
author_id INT NOT NULL,
attachment_url VARCHAR(200),
body VARCHAR(2000) NOT NULL,
-- CONSTRAINT comment_pos FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
-- CONSTRAINT comment_acc FOREIGN KEY (author_id) REFERENCES Account(account_id) ON DELETE CASCADE
);

ALTER TABLE Comment ADD FOREIGN KEY (post_id) REFERENCES Post(post_id);
ALTER TABLE Comment ADD FOREIGN KEY (author_id) REFERENCES Account(account_id);

CREATE TABLE CommentLike (
comment_id INT NOT NULL,
liked_by_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
-- CONSTRAINT commentlike_com FOREIGN KEY (comment_id) REFERENCES Comment(comment_id),
-- CONSTRAINT commentlike_acc FOREIGN KEY (liked_by_id) REFERENCES Account(account_id)
);

ALTER TABLE CommentLike ADD FOREIGN KEY (comment_id) REFERENCES Comment(comment_id);
ALTER TABLE CommentLike ADD FOREIGN KEY (liked_by_id) REFERENCES Account(account_id);

ALTER TABLE CommentLike ADD CONSTRAINT unique_commentlike UNIQUE(comment_id, liked_by_id);