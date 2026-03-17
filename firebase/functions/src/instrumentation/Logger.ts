type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  durationMs?: number;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}

function formatEntry(entry: LogEntry): string {
  const ctx = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
  const dur = entry.durationMs !== undefined ? ` [${entry.durationMs}ms]` : '';
  return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${dur}${ctx}`;
}

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function debug(message: string, context?: Record<string, unknown>): void {
  if (!shouldLog('debug')) return;
  const entry: LogEntry = { level: 'debug', message, timestamp: new Date().toISOString(), context };
  console.debug(formatEntry(entry));
}

export function info(message: string, context?: Record<string, unknown>): void {
  if (!shouldLog('info')) return;
  const entry: LogEntry = { level: 'info', message, timestamp: new Date().toISOString(), context };
  console.info(formatEntry(entry));
}

export function warn(message: string, context?: Record<string, unknown>): void {
  if (!shouldLog('warn')) return;
  const entry: LogEntry = { level: 'warn', message, timestamp: new Date().toISOString(), context };
  console.warn(formatEntry(entry));
}

export function error(message: string, context?: Record<string, unknown>): void {
  if (!shouldLog('error')) return;
  const entry: LogEntry = { level: 'error', message, timestamp: new Date().toISOString(), context };
  console.error(formatEntry(entry));
}
