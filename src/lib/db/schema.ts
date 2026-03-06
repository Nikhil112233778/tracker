import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const jobs = sqliteTable('jobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  company: text('company').notNull(),
  role: text('role').notNull(),
  hr_name: text('hr_name').notNull(),
  hr_email: text('hr_email'),
  hr_phone: text('hr_phone'),
  status: text('status').notNull(),
  source: text('source'),
  notes: text('notes'),
  salary_info: text('salary_info'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const conversations = sqliteTable('conversations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  job_id: integer('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  date: text('date').notNull(),
  summary: text('summary').notNull(),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const reminders = sqliteTable('reminders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  job_id: integer('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  reminder_date: text('reminder_date').notNull(),
  note: text('note').notNull(),
  is_done: integer('is_done', { mode: 'boolean' }).default(false).notNull(),
  snoozed_to: text('snoozed_to'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})
