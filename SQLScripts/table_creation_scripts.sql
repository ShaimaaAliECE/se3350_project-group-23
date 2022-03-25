use 3350_proj;

CREATE TABLE game_logs(
	studentId INT NOT NULL,
    log_date datetime NOT NULL,
    game_type varchar(45),
    game_lvl int,
    log_time int,
    num_mistakes int,
    log_reason varchar(45),
    PRIMARY KEY(studentId, log_date)    
);

CREATE TABLE levels(
	studentId INT NOT NULL PRIMARY KEY, 
    merge_sort INT
);

CREATE TABLE users(
	studentId INT NOT NULL PRIMARY KEY,
    username varchar(45)
);
    

