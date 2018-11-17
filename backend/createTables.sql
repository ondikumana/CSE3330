CREATE TABLE Account (
account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
creation_date DATETIME DEFAULT(getdate()),
account_type VARCHAR(7) NOT NULL
);

ALTER TABLE Account AUTO_INCREMENT = 1;

CREATE TABLE Category (
category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
category_description VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE Category AUTO_INCREMENT = 20;

CREATE TABLE Page (
page_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
page_name VARCHAR(100) NOT NULL,
logo_url VARCHAR(300),
header_image_url VARCHAR(300),
description VARCHAR(2000),
category INT,
account_id INT NOT NULL,
FOREIGN KEY (category) REFERENCES Category(category_id),
FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

ALTER TABLE Page AUTO_INCREMENT = 2000;

CREATE TABLE Profile (
profile_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
phone VARCHAR(12) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
username VARCHAR(12) NOT NULL UNIQUE,
password VARCHAR(12) NOT NULL,
account_id INT NOT NULL,
FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

ALTER TABLE Page AUTO_INCREMENT = 1000;

CREATE TABLE Member (
page_id INT NOT NULL,
profile_id INT NOT NULL ,
join_date DATETIME DEFAULT(getdate()),
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE PageView (
page_id INT NOT NULL,
profile_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE Admin (
page_id INT NOT NULL ,
profile_id INT NOT NULL,
admin_since_date DATETIME DEFAULT(getdate()),
FOREIGN KEY (page_id) REFERENCES Page(page_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

CREATE TABLE Message (
recipient_id INT NOT NULL,
sender_id INT NOT NULL,
sent_time DATETIME DEFAULT(getdate()),
sent BIT,
delivered BIT,
message_read BIT,
body VARCHAR(2000) NOT NULL,
FOREIGN KEY (recipient_id) REFERENCES Account(account_id),
FOREIGN KEY (sender_id) REFERENCES Account(account_id)
);

CREATE TABLE Post (
post_id INT NOT NULL PRIMARY KEY,
time DATETIME DEFAULT(getdate()),
author_id INT NOT NULL,
attachment_url VARCHAR(200),
body VARCHAR(2000) NOT NULL,
FOREIGN KEY (author_id) REFERENCES Account(account_id)
);

CREATE TABLE PostLike (
post_id INT NOT NULL,
liked_by_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
FOREIGN KEY (post_id) REFERENCES Post(post_id),
FOREIGN KEY (liked_by_id) REFERENCES Account(account_id)
);

CREATE TABLE PostView (
post_id INT NOT NULL,
viewed_by_id INT NOT NULL,
time DATETIME DEFAULT(getdate()),
FOREIGN KEY (post_id) REFERENCES Post(post_id),
FOREIGN KEY (viewed_by_id) REFERENCES Account(account_id)
);
