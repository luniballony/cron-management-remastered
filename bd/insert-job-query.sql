INSERT INTO cron_job (
    uri,
    http_method,
    schedule,
    timezone
) VALUES 
    ('http://www.stardoll.com', 'GET', '* * * * *', 'NULL-TEST');

    INSERT INTO cron_job (
    uri,
    http_method,
    schedule,
    timezone
) VALUES 
    ('https://bazaar-genie.netlify.app/', 'GET', '* * * * *', 'NULL-TEST');
