CREATE SCHEMA IF NOT EXISTS mindbehind;
USE mindbehind;

CREATE TABLE IF NOT EXISTS User
(
    id         int auto_increment
        primary key,
    userNumber varchar(255) not null,
    name       varchar(255) not null,
    userName   varchar(255) not null,
    password   varchar(255) not null,
    roleNumber varchar(255) not null,
    createdAt  datetime     null,
    updatedAt  datetime     null,
    constraint userNumber
        unique (userNumber)
);


CREATE TABLE IF NOT EXISTS UserRole
(
    id         int auto_increment
        primary key,
    roleNumber varchar(255)                           not null,
    name       enum ('OWNER', 'EMPLOYEE', 'CUSTOMER') not null,
    constraint roleNumber
        unique (roleNumber)
);



CREATE TABLE IF NOT EXISTS Branch
(
    id           int auto_increment
        primary key,
    branchNumber varchar(255) not null,
    latitude     float(18, 9) not null,
    longitude    float(18, 9) not null,
    name         varchar(255) not null,
    fullAddress  varchar(255) not null,
    phone        varchar(255) not null,
    createdAt    datetime     null,
    updatedAt    datetime     null,
    constraint branchNumber
        unique (branchNumber)
);


CREATE TABLE IF NOT EXISTS BranchUserMap
(
    id           int auto_increment
        primary key,
    userNumber   varchar(255) not null,
    branchNumber varchar(255) not null
);


INSERT INTO Branch (branchNumber, latitude, longitude, name, fullAddress, phone, createdAt, updatedAt) VALUES ('BRC-112233441', 39.903786, 32.873863, 'TEST-1', 'TEST-1', '1234567890', '2024-04-03 02:27:51', '2024-04-03 02:27:51');
INSERT INTO Branch (branchNumber, latitude, longitude, name, fullAddress, phone, createdAt, updatedAt) VALUES ('BRC-112233442', 39.903786, 32.873863, 'TEST-2', 'TEST-2', '1234567890', '2024-04-03 02:27:51', '2024-04-03 02:27:51');
INSERT INTO Branch (branchNumber, latitude, longitude, name, fullAddress, phone, createdAt, updatedAt) VALUES ('BRC-112233443', 39.903786, 32.873863, 'TEST-3', 'TEST-3', '1234567890', '2024-04-03 02:27:51', '2024-04-03 02:27:51');
INSERT INTO Branch (branchNumber, latitude, longitude, name, fullAddress, phone, createdAt, updatedAt) VALUES ('BRC-112233444', 39.903786, 32.873863, 'TEST-4', 'TEST-4', '1234567890', '2024-04-03 02:27:51', '2024-04-03 02:27:51');


INSERT INTO BranchUserMap (userNumber, branchNumber) VALUES ('USR-112233441', 'BRC-112233441');
INSERT INTO BranchUserMap (userNumber, branchNumber) VALUES ('USR-112233442', 'BRC-112233442');
INSERT INTO BranchUserMap (userNumber, branchNumber) VALUES ('USR-112233443', 'BRC-112233443');

INSERT INTO User (userNumber, name, userName, password, roleNumber, createdAt, updatedAt) VALUES ('USR-112233441', 'USR-TEST-1', 'USR-TEST-1', '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6', 'RL-112233441', '2024-04-03 02:27:51', '2024-04-03 02:27:51');
INSERT INTO User (userNumber, name, userName, password, roleNumber, createdAt, updatedAt) VALUES ('USR-112233442', 'USR-TEST-2', 'USR-TEST-2', '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6', 'RL-112233442', '2024-04-03 02:27:51', '2024-04-03 02:27:51');
INSERT INTO User (userNumber, name, userName, password, roleNumber, createdAt, updatedAt) VALUES ('USR-112233443', 'USR-TEST-3', 'USR-TEST-3', '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6', 'RL-112233443', '2024-04-03 02:27:51', '2024-04-03 02:27:51');

INSERT INTO UserRole (roleNumber, name) VALUES ('RL-112233441', 'OWNER');
INSERT INTO UserRole (roleNumber, name) VALUES ('RL-112233442', 'EMPLOYEE');
INSERT INTO UserRole (roleNumber, name) VALUES ('RL-112233443', 'CUSTOMER');
