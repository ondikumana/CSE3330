/*
 Navicat SQL Server Data Transfer

 Source Server         : CSE3330
 Source Server Type    : SQL Server
 Source Server Version : 14003045
 Source Host           : localhost:1433
 Source Catalog        : master
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 14003045
 File Encoding         : 65001

 Date: 24/11/2018 20:08:21
*/


-- ----------------------------
-- Records of Account
-- ----------------------------


INSERT INTO Account (account_id, creation_date, account_type) VALUES (1, '2018-11-22 19:59:53.813', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (2, '2018-11-22 19:59:53.830', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (3, '2018-11-22 19:59:53.840', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (4, '2018-11-22 19:59:53.843', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (5, '2018-11-22 19:59:53.850', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (6, '2018-11-22 19:59:53.860', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (7, '2018-11-22 19:59:53.860', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (8, '2018-11-22 19:59:53.870', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (9, '2018-11-22 19:59:53.880', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (10, '2018-11-22 19:59:53.883', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (11, '2018-11-22 19:59:53.886', 'profile');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (12, '2018-11-22 19:59:53.893', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (15, '2018-11-22 20:13:23.766', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (16, '2018-11-22 20:20:03.203', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (18, '2018-11-22 20:45:16.953', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (19, '2018-11-22 20:45:25.456', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (20, '2018-11-22 20:50:09.473', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (22, '2018-11-22 20:51:14.446', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (23, '2018-11-22 20:51:23.126', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (25, '2018-11-22 20:53:48.706', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (27, '2018-11-22 20:54:50.393', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (29, '2018-11-22 20:55:44.453', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (31, '2018-11-22 20:57:01.613', 'page');


INSERT INTO Account (account_id, creation_date, account_type) VALUES (37, '2018-11-24 16:15:03.503', 'profile');


-- ----------------------------
-- Records of Profile
-- ----------------------------

INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1000, 'Joshua', 'Abuto', '435-987-0971', 'abuto@bleh.com', 'jabuto', 'password', 2);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1001, 'Ali', 'Sharifara', '435-555-0971', 'sharifara@bleh.com', 'asharifara', 'password', 4);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1002, 'Olateju', 'Ojeyinka', '435-555-0971', 'ojeyinka@bleh.com', 'oojeyinka', 'password', 5);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1003, 'Sam', 'Smith', '435-909-0971', 'smith@bleh.com', 'ssmith', 'password', 6);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1004, 'Jo', 'Doe', '435-999-9821', 'doe@bleh.com', 'jdoe', 'password', 7);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1005, 'Jesus', 'Christ', '345-309-0971', 'christ@bleh.com', 'jchrist', 'password', 8);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1006, 'West', 'Hall', '873-111-0971', 'hall@bleh.com', 'whall', 'password', 9);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1007, 'West', 'Mitchell', '435-909-0971', 'mitchell@bleh.com', 'wmitchell', 'password', 10);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1008, 'South', 'Cooper', '356-909-0971', 'cooper@bleh.com', 'scooper', 'password', 11);


INSERT INTO Profile (profile_id, fname, lname, phone, email, username, password, account_id) VALUES (1020, 'Bleh', 'Ullhhh', '093-039-3848', 'bleh@bleh.com', 'bleh', 'password', 37);


-- ----------------------------
-- Records of Category
-- ----------------------------


INSERT INTO Category (category_id, category_description) VALUES (20, 'Computer Science');


INSERT INTO Category (category_id, category_description) VALUES (22, 'Electrical Engineering');


INSERT INTO Category (category_id, category_description) VALUES (23, 'News');


INSERT INTO Category (category_id, category_description) VALUES (21, 'School');


INSERT INTO Category (category_id, category_description) VALUES (24, 'Sports');


-- ----------------------------
-- Records of Page
-- ----------------------------


INSERT INTO Page (page_id, page_name, logo_url, header_image_url, description, category, account_id) VALUES (2000, 'Electricians on Strike', NULL, NULL, 'We are tired of the low salaries given to electricians. We risk our lives to install sophisticated devices like light bulbs and microwaves. We deserve to be treated better than this. Stand with us!', 20, 1);


INSERT INTO Page (page_id, page_name, logo_url, header_image_url, description, category, account_id) VALUES (2001, 'The British Broadcasting Corporatio', NULL, NULL, 'Breaking news, sport, TV, radio and a whole lot more. The BBC informs, educates and entertains - wherever you are, whatever your age.', 20, 3);


INSERT INTO Page (page_id, page_name, logo_url, header_image_url, description, category, account_id) VALUES (2002, 'Tennis at UTD', NULL, NULL, 'Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each. Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponents court', 24, 12);


INSERT INTO Page (page_id, page_name, logo_url, header_image_url, description, category, account_id) VALUES (2003, 'THe blues', NULL, NULL, 'We dot do anything', 23, 15);


-- ----------------------------
-- Records of Admin
-- ----------------------------
INSERT INTO Admin  VALUES (2002, 1007, '2018-11-22 20:19:35.660');


INSERT INTO Admin  VALUES (2000, 1002, '2018-11-23 04:37:22.476');



-- ----------------------------
-- Records of Post
-- ----------------------------


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3000, '2018-11-22 19:59:53.953', 1, 1, NULL, 'We want to welcome Olateju as our leader and admin of this page.');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3001, '2018-11-22 19:59:53.963', 5, 4, NULL, 'I am a teacher in the Computer Science and Engineering Department at UTA');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3002, '2018-11-22 19:59:53.966', 8, 8, NULL, 'Above all, love each other deeply, because love covers over a multitude of sins." John 15:12: â??My command is this: Love each other as I have loved you." 1 Corinthians 13:13: â??And now these three remain: faith, hope and love. But the greatest of these is love');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3003, '2018-11-22 19:59:53.970', 6, 6, NULL, 'Check out my latest song, Promises');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3008, '2018-11-24 04:14:39.086', 5, 8, NULL, 'My favorite verse is "In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly."');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3009, '2018-11-24 16:19:44.163', 2, 2, NULL, 'I dot know why I procrastinate in everything that I do. I let my friends, teammates, co-workers, and family whenever I do this. But I cat seem to stop.....');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3010, '2018-11-24 16:29:05.350', 8, 2, NULL, 'Lets come together and pray out the devil that is in this child disguised in the form of procrastination.');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3011, '2018-11-24 16:32:22.013', 5, 5, NULL, 'Electrical Engineering is a broad field that includes power systems, control systems, microelectronics and nanoelectronics, microprocessors and computer networks, IoT, telecommunications (wire, wireless, satellite and fiber optic), remote sensing, signal processing, neural networks, medical devices, optics (electro-optics, optoelectronics and photonics) and other emerging technologies.');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3012, '2018-11-24 18:22:05.466', 10, 10, NULL, 'I am just a street name. I get walked on, driven on, and all sorts of degrading things. What keeps me going is the fact that I apparently make life easier for these so called humans.');


INSERT INTO Post (post_id, time, author_id, destination_id, attachment_url, body) VALUES (3013, '2018-11-24 19:18:36.806', 1, 2, NULL, 'We have decided to put our strike on hold to pray for this young man. ');

-- ----------------------------
-- Records of Comment
-- ----------------------------


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4000, 3000, '2018-11-22 19:59:54.063', 5, NULL, 'Thank you. It is great to be here and to support the movement.');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4001, 3000, '2018-11-22 19:59:54.070', 1, NULL, 'I find it weird that you like your own comment');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4002, 3000, '2018-11-22 19:59:54.073', 7, NULL, 'Go Olateju!');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4003, 3002, '2018-11-22 19:59:54.083', 1, NULL, 'Ame');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4004, 3003, '2018-11-22 19:59:54.086', 11, NULL, 'You are not that good of a singer');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4006, 3002, '2018-11-23 06:23:06.273', 8, NULL, 'I didt know Electricians were religious...');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4007, 3009, '2018-11-24 16:20:40.926', 8, NULL, 'Tis not good, my so');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4008, 3009, '2018-11-24 16:21:15.233', 4, NULL, 'Poor child...');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4009, 3009, '2018-11-24 16:22:00.306', 6, NULL, 'You need some milk');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4010, 3009, '2018-11-24 16:23:31.260', 7, NULL, 'No... You need Jesus child');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4011, 3009, '2018-11-24 16:23:52.146', 8, NULL, 'He wot listen to me');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4012, 3010, '2018-11-24 16:29:45.120', 1, NULL, 'We support this movement');


INSERT INTO Comment (comment_id, post_id, time, author_id, attachment_url, body) VALUES (4013, 3011, '2018-11-24 16:34:06.150', 11, NULL, 'I fell asleep reading this post');




-- ----------------------------
-- Records of CommentLike
-- ----------------------------
INSERT INTO CommentLike  VALUES (4000, 5, '2018-11-22 19:59:54.093');


INSERT INTO CommentLike  VALUES (4002, 5, '2018-11-22 19:59:54.096');


INSERT INTO CommentLike  VALUES (4003, 8, '2018-11-22 19:59:54.100');


INSERT INTO CommentLike  VALUES (4012, 5, '2018-11-24 16:29:51.546');



-- ----------------------------
-- Records of Member
-- ----------------------------
INSERT INTO Member  VALUES (2000, 1002, '2018-11-22 19:59:53.900');


INSERT INTO Member  VALUES (2000, 1004, '2018-11-22 19:59:53.906');


INSERT INTO Member  VALUES (2000, 1005, '2018-11-22 19:59:53.910');


INSERT INTO Member  VALUES (2002, 1006, '2018-11-22 19:59:53.916');


INSERT INTO Member  VALUES (2002, 1007, '2018-11-22 19:59:53.920');


INSERT INTO Member  VALUES (2002, 1004, '2018-11-23 06:22:03.440');


INSERT INTO Member  VALUES (2001, 1004, '2018-11-23 06:21:15.533');



-- ----------------------------
-- Records of Message
-- ----------------------------
INSERT INTO Message  VALUES (5, 2, '2018-11-22 19:59:53.950', 'true', 'false', 'false', 'Hi Olateju, I heard you were on strike. It is a bit ridiculous dont you think. You should think about going back to fixing light bulbs. Some people are stuck in the dark. Be considerate');


INSERT INTO Message  VALUES (5, 3, '2018-11-22 19:59:53.953', 'true', 'false', 'false', 'Hi West, You are now admin of our page.');


INSERT INTO Message  VALUES (5, 1, '2018-11-23 08:18:10.210', 'true', 'false', 'false', 'Bumppppp');


INSERT INTO Message  VALUES (5, 2, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'My name Josh');


INSERT INTO Message  VALUES (2, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Okay.....');


INSERT INTO Message  VALUES (3, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Wrong perso');


INSERT INTO Message  VALUES (3, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Bleh');


INSERT INTO Message  VALUES (5, 2, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'What is your name?.....');


INSERT INTO Message  VALUES (2, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Stop Being weird');


INSERT INTO Message  VALUES (6, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'I like your songs!');


INSERT INTO Message  VALUES (4, 1, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'sdfd');


INSERT INTO Message  VALUES (4, 1, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Hi');


INSERT INTO Message  VALUES (1, 5, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Hiiiiii');


INSERT INTO Message  VALUES (5, 1, '2018-11-23 18:26:14.080', 'true', 'false', 'false', 'Bleh');


INSERT INTO Message  VALUES (5, 6, '2018-11-24 06:13:55.933', 'true', 'false', 'false', 'Thank you. I take inspiration from past experiences');


INSERT INTO Message  VALUES (1, 4, '2018-11-24 06:15:32.100', 'true', 'false', 'false', 'How can I help you?');


INSERT INTO Message  VALUES (4, 1, '2018-11-24 06:16:01.720', 'true', 'false', 'false', 'Nevermind...');





-- ----------------------------
-- Records of PageView
-- ----------------------------
INSERT INTO PageView  VALUES (2002, 1005, '2018-11-22 19:59:53.933');


INSERT INTO PageView  VALUES (2002, 1004, '2018-11-22 19:59:53.940');


INSERT INTO PageView  VALUES (2000, 1002, '2018-11-22 19:59:53.940');


INSERT INTO PageView  VALUES (2000, 1003, '2018-11-22 19:59:53.943');



-- ----------------------------
-- Records of PostLike
-- ----------------------------
INSERT INTO PostLike  VALUES (3000, 5, '2018-11-22 19:59:53.970');


INSERT INTO PostLike  VALUES (3000, 6, '2018-11-22 19:59:53.976');


INSERT INTO PostLike  VALUES (3000, 7, '2018-11-22 19:59:53.980');


INSERT INTO PostLike  VALUES (3000, 8, '2018-11-22 19:59:53.986');


INSERT INTO PostLike  VALUES (3002, 5, '2018-11-22 19:59:53.993');


INSERT INTO PostLike  VALUES (3002, 2, '2018-11-22 19:59:53.993');


INSERT INTO PostLike  VALUES (3002, 6, '2018-11-22 19:59:54.000');


INSERT INTO PostLike  VALUES (3002, 10, '2018-11-22 19:59:54.003');


INSERT INTO PostLike  VALUES (3003, 9, '2018-11-22 19:59:54.003');


INSERT INTO PostLike  VALUES (3003, 11, '2018-11-22 19:59:54.006');


INSERT INTO PostLike  VALUES (3001, 11, '2018-11-24 16:37:06.653');


INSERT INTO PostLike  VALUES (3011, 1, '2018-11-24 19:17:20.030');


INSERT INTO PostLike  VALUES (3012, 12, '2018-11-24 18:30:13.940');



-- ----------------------------
-- Records of PostView
-- ----------------------------
INSERT INTO PostView  VALUES (3000, 5, '2018-11-22 19:59:54.013');


INSERT INTO PostView  VALUES (3000, 6, '2018-11-22 19:59:54.016');


INSERT INTO PostView  VALUES (3000, 7, '2018-11-22 19:59:54.020');


INSERT INTO PostView  VALUES (3000, 8, '2018-11-22 19:59:54.026');


INSERT INTO PostView  VALUES (3002, 5, '2018-11-22 19:59:54.030');


INSERT INTO PostView  VALUES (3002, 2, '2018-11-22 19:59:54.040');


INSERT INTO PostView  VALUES (3002, 6, '2018-11-22 19:59:54.046');


INSERT INTO PostView  VALUES (3002, 10, '2018-11-22 19:59:54.050');


INSERT INTO PostView  VALUES (3003, 9, '2018-11-22 19:59:54.050');


INSERT INTO PostView  VALUES (3003, 11, '2018-11-22 19:59:54.056');


INSERT INTO PostView  VALUES (3001, 5, '2018-11-22 21:34:04.540');


INSERT INTO PostView  VALUES (3001, 8, '2018-11-23 06:30:14.363');


INSERT INTO PostView  VALUES (3003, 5, '2018-11-23 18:26:14.080');


INSERT INTO PostView  VALUES (3008, 5, '2018-11-24 04:14:39.213');


INSERT INTO PostView  VALUES (3003, 6, '2018-11-24 06:13:17.440');


INSERT INTO PostView  VALUES (3009, 6, '2018-11-24 16:21:47.526');


INSERT INTO PostView  VALUES (3009, 7, '2018-11-24 16:23:07.820');


INSERT INTO PostView  VALUES (3010, 8, '2018-11-24 16:29:05.470');


INSERT INTO PostView  VALUES (3009, 5, '2018-11-24 16:29:22.860');


INSERT INTO PostView  VALUES (3010, 5, '2018-11-24 16:29:22.866');


INSERT INTO PostView  VALUES (3011, 5, '2018-11-24 16:32:22.110');


INSERT INTO PostView  VALUES (3011, 11, '2018-11-24 16:33:45.180');


INSERT INTO PostView  VALUES (3008, 2, '2018-11-24 17:46:38.356');


INSERT INTO PostView  VALUES (3011, 1, '2018-11-24 18:18:05.893');


INSERT INTO PostView  VALUES (3009, 10, '2018-11-24 18:19:23.090');


INSERT INTO PostView  VALUES (3010, 12, '2018-11-24 18:20:30.300');


INSERT INTO PostView  VALUES (3012, 1, '2018-11-24 19:04:39.540');


INSERT INTO PostView  VALUES (3010, 1, '2018-11-24 19:17:29.163');


INSERT INTO PostView  VALUES (3001, 4, '2018-11-24 20:01:15.950');


INSERT INTO PostView  VALUES (3002, 8, '2018-11-23 06:22:32.266');


INSERT INTO PostView  VALUES (3001, 6, '2018-11-24 06:14:04.780');


INSERT INTO PostView  VALUES (3000, 4, '2018-11-24 15:31:26.333');


INSERT INTO PostView  VALUES (3009, 2, '2018-11-24 16:19:44.256');


INSERT INTO PostView  VALUES (3008, 8, '2018-11-24 16:20:18.786');


INSERT INTO PostView  VALUES (3009, 8, '2018-11-24 16:20:26.750');


INSERT INTO PostView  VALUES (3009, 4, '2018-11-24 16:21:03.513');


INSERT INTO PostView  VALUES (3001, 11, '2018-11-24 16:33:45.183');


INSERT INTO PostView  VALUES (3010, 2, '2018-11-24 17:46:05.343');


INSERT INTO PostView  VALUES (3010, 10, '2018-11-24 18:19:23.090');


INSERT INTO PostView  VALUES (3009, 12, '2018-11-24 18:20:30.300');


INSERT INTO PostView  VALUES (3012, 10, '2018-11-24 18:22:05.586');


INSERT INTO PostView  VALUES (3012, 12, '2018-11-24 18:22:16.040');


INSERT INTO PostView  VALUES (3000, 10, '2018-11-24 18:31:12.440');


INSERT INTO PostView  VALUES (3009, 1, '2018-11-24 19:17:29.150');


INSERT INTO PostView  VALUES (3013, 1, '2018-11-24 19:18:36.976');


INSERT INTO PostView  VALUES (3001, 37, '2018-11-24 20:56:19.026');






