DROP DATABASE `sql_elevators`;

CREATE DATABASE IF NOT EXISTS `sql_elevators`;
USE `sql_elevators`;


CREATE TABLE IF NOT EXISTS elevators (
    elevator_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    current_floor INT DEFAULT 0,
    current_status ENUM('idle', 'moving_up', 'moving_down', "out_of_service") DEFAULT 'idle',
    destination_floor INT DEFAULT NULL 
);

INSERT INTO elevators (current_floor, current_status) VALUES (0, 'idle');
INSERT INTO elevators (current_floor, current_status) VALUES (0, 'idle');
INSERT INTO elevators (current_floor, current_status) VALUES (0, 'idle');

 CREATE TABLE IF NOT EXISTS call_queue (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    destination_floor INT NOT NULL
);