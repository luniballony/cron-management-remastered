// file responsible for storing the map object scheduledJobs 
// contains all the active cron jobs
import type { Response } from "express";

export const scheduledJobs = new Map();


export type LogEntry = {
    jobId: number;
    message: string;
    timestamp: Date;
};

// tracks cron logs
export const logList = new Set<Response>();