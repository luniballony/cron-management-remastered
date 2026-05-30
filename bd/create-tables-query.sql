CREATE TABLE cron_job (
    id BIGSERIAL PRIMARY KEY,

    uri TEXT NOT NULL,
    http_method VARCHAR(10) NOT NULL,

    body TEXT,

    schedule VARCHAR(100) NOT NULL,
    timezone VARCHAR(50) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);