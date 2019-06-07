insert into users
    (first_name, last_name, email, password)
VALUES
    ('jack', 'maddox', 'jack@email.com', 'password');

insert into books
    (title, title_long, isbn, publisher, date_published, picture)
Values
    ('The Bible For Everyone', 'The Bible For Everyone', '0281074011', 'Spck Publishing', '2018', '/images/bible_for_everyone.jpg');

insert into reviews
    (score, content, book_id, user_id)
values
    (3, 'Questionable plot at times... Writing style seems a bit old and dated. Some nice ideas and life lessons though... #badromans', 1,1);