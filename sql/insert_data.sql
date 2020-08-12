USE picd;

INSERT INTO `clearance` (clearance_id, clearance)
VALUES (1, 'user');

INSERT INTO `clearance` (clearance_id, clearance)
VALUES (2, 'admin');

INSERT INTO `user` (user_id, fname, lname, clearance_id, email, password)

VALUES 
(1, '30f01a870297f1aea190f3fccd1bb453', '6e9c4e78d78acc707b2048e705594b14', 1, '2bc33731776fa6f54ed7c489f621a00d', '808bf2f0e1c687b5b95eb29ba4a6e1b1'),
(2, '90f0e281c7b7852e784a8ead9ef8f7cf', '6e9c4e78d78acc707b2048e705594b14', 1, 'b0f9d646cdf0e73731ce96d77fdf8e7b', '808bf2f0e1c687b5b95eb29ba4a6e1b1'),
(3, '30f01a870297f1aea190f3fccd1bb453', '116ba6486a4c316a315ff80733a3aedc', 2, '14bd6bea0e013bf8535a7809c3542a71', '8b74293c9767b02f266acc20eb31629a'),
(4, '90f0e281c7b7852e784a8ead9ef8f7cf', '116ba6486a4c316a315ff80733a3aedc', 2, '8715e94c14f0dd96cab2175d72eaf299', '8b74293c9767b02f266acc20eb31629a');
/* 
(1, 'Jane', 'Doe', 1, 'Jane@Doe.com', 'user'),
(2, 'John', 'Doe', 1, 'John@Doe.com', 'user'),
(3, 'John', 'Smith', 2, 'Jane@Smith.com', 'admin'),
(4, 'Jane', 'Smith', 2, 'John@Smith.com', 'admin'); */

INSERT INTO `project` (project_id, title, description)
VALUES
(1, 'Project 1', 'First Project'),
(2, 'Project 2', 'Second Project'),
(3, 'Project 3', 'Third Project');

INSERT INTO `stage` (stage_id, project_id, name)
VALUES
(1, 1, 'Design'), (2, 1, 'Simulation'), (3, 1, 'Layout'), (4, 1, 'Test'),
(5, 2, 'Design'), (6, 2, 'Simulation'), (7, 2, 'Layout'), (8, 2, 'Test'),
(9, 3, 'Design'), (10, 3, 'Simulation'), (11, 3, 'Layout'), (12, 3, 'Test');

INSERT INTO `version` (stage_id, project_id, version, description)
VALUES
(1, 1, 'init', 'init'), (2, 1, 'init', 'init'), (3, 1, 'init', 'init'), (4, 1, 'init', 'init'),
(5, 2, 'init', 'init'), (6, 2, 'init', 'init'), (7, 2, 'init', 'init'), (8, 2, 'init', 'init'),
(9, 3, 'init', 'init'), (10, 3, 'init', 'init'), (11, 3, 'init', 'init'), (12, 3, 'init', 'init');

INSERT INTO `user_has_project` (user_id, project_id)
VALUES
(1, 1), (1, 3),
(2, 2), (2, 3);