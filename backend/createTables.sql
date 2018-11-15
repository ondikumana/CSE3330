CREATE TABLE Account (
account_id INT NOT NULL PRIMARY KEY,
creation_date DATE,
account_type VARCHAR(7) NOT NULL
);

CREATE TABLE Category (
category_id INT NOT NULL PRIMARY KEY,
category_description VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Page (
page_id INT NOT NULL PRIMARY KEY,
page_name VARCHAR(100) NOT NULL,
logo_url VARCHAR(300),
header_image_url VARCHAR(300),
description VARCHAR(2000),
category INT,
account_id INT NOT NULL,
FOREIGN KEY (category) REFERENCES Category(category_id),
FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

CREATE TABLE Profile (
profile_id INT NOT NULL PRIMARY KEY,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
phone VARCHAR(12) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
username VARCHAR(12) NOT NULL UNIQUE,
password VARCHAR(12) NOT NULL,
account_id INT NOT NULL,
FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

CREATE TABLE Member (
page_id INT NOT NULL,
profile_id INT NOT NULL ,
join_date DATE,
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE PageView (
page_id INT NOT NULL,
profile_id INT NOT NULL,
time TIMESTAMP,
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE Admin (
page_id INT NOT NULL ,
profile_id INT NOT NULL,
admin_since_date DATE,
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE Message (
message_id INT NOT NULL PRIMARY KEY,
recipient_id INT NOT NULL,
sender_id INT NOT NULL,
sent BIT,
delivered BIT,
message_read BIT,
body VARCHAR(2000) NOT NULL,
FOREIGN KEY (recipient_id) REFERENCES Account(account_id),
FOREIGN KEY (sender_id) REFERENCES Account(account_id)
);

CREATE TABLE Post (
post_id INT NOT NULL PRIMARY KEY,
time TIMESTAMP,
author_id INT NOT NULL,
attachment_url VARCHAR(200),
body VARCHAR(2000) NOT NULL,
FOREIGN KEY (author_id) REFERENCES Account(account_id)
);

CREATE TABLE PostLike (
post_id INT NOT NULL,
liked_by_id INT NOT NULL,
time TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES Post(post_id),
FOREIGN KEY (liked_by_id) REFERENCES Account(account_id)
);

CREATE TABLE PostView (
post_id INT NOT NULL,
viewed_by_id INT NOT NULL,
time TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES Post(post_id),
FOREIGN KEY (viewed_by_id) REFERENCES Account(account_id)
);
