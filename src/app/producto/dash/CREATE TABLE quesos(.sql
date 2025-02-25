CREATE TABLE quesos(
    id NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL
);


DESC quesos;

INSERT INTO quesos(id, nombre)
VALUES (1, 'Gouda');


SELECT * from quesos;