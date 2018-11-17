INSERT INTO Category (category_description) VALUES('Computer Science')
INSERT INTO Category (category_description) VALUES('School')
INSERT INTO Category (category_description) VALUES('Electrical Engineering')
INSERT INTO Category (category_description) VALUES('News')
INSERT INTO Category (category_description) VALUES('Sports')

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
VALUES('Tennis at UTA', 'Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each. Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponent\'s court', 24, 12);
