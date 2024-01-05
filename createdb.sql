DROP DATABASE `sql_elevators`;

CREATE DATABASE IF NOT EXISTS `sql_elevators`;
USE `sql_elevators`;


CREATE TABLE IF NOT EXISTS elevators (
    elevator_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    current_Floor INT DEFAULT 0,
    current_Status ENUM('idle', 'moving_up', 'moving_down') DEFAULT 'idle',
    destination_Floor INT DEFAULT NULL,
    callQueue JSON 
);

INSERT INTO elevators (callQueue) VALUES ('[]');
INSERT INTO elevators (callQueue) VALUES ('[]');
INSERT INTO elevators (callQueue) VALUES ('[]');