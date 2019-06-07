create table books (
    id serial primary key,
    title varchar(200),
    title_long varchar(400),
    isbn varchar(400),
    publisher varchar(200),
    date_published varchar(200),
    picture varchar(500)
);

create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    book_id integer references books(id),
    user_id integer references users(id)
);