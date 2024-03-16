create TABLE code( 
    code VARCHAR(20)
);

create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    nickname VARCHAR(30),
    pass VARCHAR(100),
    roole VARCHAR(10)
);

create TABLE person_token(
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    token VARCHAR(250)
);