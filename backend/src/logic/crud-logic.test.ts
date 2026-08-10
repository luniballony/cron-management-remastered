import { db } from '../db';
import { addJob } from './crud-logic';
import { jobCreation } from './activation-logic';


jest.mock('../db', () => ({
  db: { query: jest.fn() },
}));


jest.mock('./activation-logic', () => ({
  jobCreation: jest.fn(),
}));


describe('addJob', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('inserts a job without a body when body is not provided', async () => {
    (db.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 7 }],
    });

    await addJob('https://api.example.com', 'GET', '0 * * * *', 'UTC');

    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO cron_job (uri,http_method, schedule, timezone)'),
      ['https://api.example.com', 'GET', '0 * * * *', 'UTC']
    );
    expect(jobCreation).toHaveBeenCalledWith(7);
  });


  it('inserts a job with a body when body is provided', async () => {
    (db.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 7 }],
    });

    await addJob("https://jsonplaceholder.typicode.com/posts/1", "PUT", "*/4 * * * *", "Europe/Lisbon", "updated body");
    

    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO cron_job (uri,http_method, schedule, timezone, body)'),
      ['https://jsonplaceholder.typicode.com/posts/1', 'PUT', '*/4 * * * *', 'Europe/Lisbon', 'updated body']
    );
    expect(jobCreation).toHaveBeenCalledWith(7);
  });

});