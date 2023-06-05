create table resort (id serial primary key, name varchar(25), city varchar(25), location varchar(255),  price float ,availlablity boolean, rating numeric(3,2),description varchar(255) , photo varchar(255));

create table users (id serial primary key , name varchar(25) , password varchar(25) , email varchar(50) , role varchar(25) )  ;

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    userID_FK integer,
    resortID_FK integer,
    checkIN DATE,
    checkOUT DATE,
    price FLOAT,
    FOREIGN KEY (userID_FK) REFERENCES users(id),
    FOREIGN KEY (resortID_FK) REFERENCES resort(id),
);