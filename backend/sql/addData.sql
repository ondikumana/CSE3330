INSERT INTO Category (category_description) VALUES('Computer Science');
INSERT INTO Category (category_description) VALUES('School');
INSERT INTO Category (category_description) VALUES('Electrical Engineering');
INSERT INTO Category (category_description) VALUES('News');
INSERT INTO Category (category_description) VALUES('Sports');

INSERT INTO Account (account_type) VALUES ('page');

INSERT INTO Page (page_name, description, category, account_id)
VALUES('Electricians on Strike', 'We are tired of the low salaries given to electricians. We risk our lives to install sophisticated devices like light bulbs and microwaves. We deserve to be treated better than this. Stand with us!', 20, 1);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Joshua', 'Abuto', '435-987-0971', 'abuto@bleh.com', 'jabuto', 'password', 2);


INSERT INTO Account (account_type) VALUES ('page');

INSERT INTO Page (page_name, description, category, account_id)
VALUES('The British Broadcasting Corporation', 'Breaking news, sport, TV, radio and a whole lot more. The BBC informs, educates and entertains - wherever you are, whatever your age.', 20, 3);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Ali', 'Sharifara', '435-555-0971', 'sharifara@bleh.com', 'asharifara', 'password', 4);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Olateju', 'Ojeyinka', '435-555-0971', 'ojeyinka@bleh.com', 'oojeyinka', 'password', 5);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Sam', 'Smith', '435-909-0971', 'smith@bleh.com', 'ssmith', 'password', 6);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Jon', 'Doe', '435-999-9821', 'doe@bleh.com', 'jdoe', 'password', 7);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('Jesus', 'Christ', '345-309-0971', 'christ@bleh.com', 'jchrist', 'password', 8);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('West', 'Hall', '873-111-0971', 'hall@bleh.com', 'whall', 'password', 9);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('West', 'Mitchell', '435-909-0971', 'mitchell@bleh.com', 'wmitchell', 'password', 10);


INSERT INTO Account (account_type) VALUES ('profile');

INSERT INTO Profile (fname, lname, phone, email, username, password, account_id)
VALUES('South', 'Cooper', '356-909-0971', 'cooper@bleh.com', 'scooper', 'password', 11);


INSERT INTO Account (account_type) VALUES ('page');

INSERT INTO Page (page_name, description, category, account_id)
VALUES('Tennis at UTA', 'Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each. Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponents court', 24, 12);


INSERT INTO Member (page_id, profile_id, join_date) VALUES(2000, 1002, DEFAULT);

INSERT INTO Member (page_id, profile_id, join_date) VALUES(2000, 1004, DEFAULT);

INSERT INTO Member (page_id, profile_id, join_date) VALUES(2000, 1005, DEFAULT);

INSERT INTO Member (page_id, profile_id, join_date) VALUES(2002, 1006, DEFAULT);

INSERT INTO Member (page_id, profile_id, join_date) VALUES(2002, 1007, DEFAULT);


INSERT INTO Admin (page_id, profile_id, admin_since_date) VALUES(2000, 1002, DEFAULT);

INSERT INTO Admin (page_id, profile_id, admin_since_date) VALUES(2002, 1007, DEFAULT);


INSERT INTO PageView (page_id, profile_id, time) VALUES (2002, 1005, DEFAULT);

INSERT INTO PageView (page_id, profile_id, time) VALUES (2002, 1004, DEFAULT);

INSERT INTO PageView (page_id, profile_id, time) VALUES (2000, 1002, DEFAULT);

INSERT INTO PageView (page_id, profile_id, time) VALUES (2000, 1003, DEFAULT);


INSERT INTO Message (recipient_id, sender_id, sent_time, was_sent, was_delivered, was_read, body) VALUES(5, 2, DEFAULT, 1, 0, 0, 'Hi Olateju, I heard you were on strike. It is a bit ridiculous dont you think. You should think about going back to fixing light bulbs. Some people are stuck in the dark. Be considerate');

INSERT INTO Message (recipient_id, sender_id, sent_time, was_sent, was_delivered, was_read, body) VALUES(5, 3, DEFAULT, 1, 0, 0, 'Hi West, You are now admin of our page.');


INSERT INTO Post (time, author_id, destination_id, body) VALUES(DEFAULT, 1, 1, 'We want to welcome Olateju as our leader and admin of this page.');

INSERT INTO Post (time, author_id, destination_id, body) VALUES(DEFAULT, 4, 4, 'I am a teacher in the Computer Science and Engineering Department at UTA');

INSERT INTO Post (time, author_id, destination_id, body) VALUES(DEFAULT, 8, 8, 'Above all, love each other deeply, because love covers over a multitude of sins." John 15:12: “My command is this: Love each other as I have loved you." 1 Corinthians 13:13: “And now these three remain: faith, hope and love. But the greatest of these is love');

INSERT INTO Post (time, author_id, destination_id, body) VALUES(DEFAULT, 6, 6, 'Check out my latest song, Promises');


INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3000, 5, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3000, 6, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3000, 7, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3000, 8, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3002, 5, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3002, 2, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3002, 6, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3002, 10, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3003, 9, DEFAULT);

INSERT INTO PostLike (post_id, liked_by_id, time) VALUES(3003, 11, DEFAULT);


INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3000, 5, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3000, 6, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3000, 7, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3000, 8, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3002, 5, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3002, 2, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3002, 6, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3002, 10, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3003, 9, DEFAULT);

INSERT INTO PostView (post_id, viewed_by_id, time) VALUES(3003, 11, DEFAULT);


INSERT INTO Comment (time, author_id, post_id, body) VALUES(DEFAULT, 5, 3000, 'Thank you. It is great to be here and to support the movement.');

INSERT INTO Comment (time, author_id, post_id, body) VALUES(DEFAULT, 1, 3000, 'I find it weird that you like your own comment');

INSERT INTO Comment (time, author_id, post_id, body) VALUES(DEFAULT, 7, 3000, 'Go Olateju!');

INSERT INTO Comment (time, author_id, post_id, body) VALUES(DEFAULT, 1, 3002, 'Amen');

INSERT INTO Comment (time, author_id, post_id, body) VALUES(DEFAULT, 11, 3003, 'You are not that good of a singer');


INSERT INTO CommentLike (comment_id, liked_by_id, time) VALUES(4000, 5, DEFAULT);

INSERT INTO CommentLike (comment_id, liked_by_id, time) VALUES(4002, 5, DEFAULT);

INSERT INTO CommentLike (comment_id, liked_by_id, time) VALUES(4003, 8, DEFAULT);
