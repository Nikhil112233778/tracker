// Mock in-memory database - simulates real database behavior
// This will be replaced with actual Turso queries once database is set up

import type { Job, Conversation, Reminder } from './types'

interface MockDatabase {
  jobs: Map<number, Job>
  conversations: Map<number, Conversation>
  reminders: Map<number, Reminder>
  nextJobId: number
  nextConversationId: number
  nextReminderId: number
}

const mockDb: MockDatabase = {
  jobs: new Map(),
  conversations: new Map(),
  reminders: new Map(),
  nextJobId: 1,
  nextConversationId: 1,
  nextReminderId: 1,
}

// Seed with initial data
const seedData = () => {
  const now = new Date().toISOString()

  const job1: Job = {
    id: 1,
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    hr_name: 'Priya Sharma',
    hr_email: 'priya@stripe.com',
    hr_phone: '+91 98765 43210',
    status: 'Interview',
    source: 'LinkedIn',
    notes: 'Great culture, remote-first company',
    salary_info: '₹35-40L',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  }

  const job2: Job = {
    id: 2,
    company: 'Vercel',
    role: 'Full Stack Developer',
    hr_name: 'Alex Chen',
    hr_email: 'alex@vercel.com',
    hr_phone: null,
    status: 'In Touch',
    source: 'Referral',
    notes: 'Referred by John from previous company',
    salary_info: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }

  const job3: Job = {
    id: 3,
    company: 'Razorpay',
    role: 'Product Engineer',
    hr_name: 'Neha Gupta',
    hr_email: 'neha.gupta@razorpay.com',
    hr_phone: '+91 99887 76543',
    status: 'Follow Up',
    source: 'Naukri',
    notes: 'Need to follow up on panel interview results',
    salary_info: '₹28-32L',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }

  const job4: Job = {
    id: 4,
    company: 'Zomato',
    role: 'Frontend Developer',
    hr_name: 'Rahul Mehta',
    hr_email: null,
    hr_phone: '+91 88776 65432',
    status: 'Applied',
    source: 'Company Site',
    notes: null,
    salary_info: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }

  mockDb.jobs.set(1, job1)
  mockDb.jobs.set(2, job2)
  mockDb.jobs.set(3, job3)
  mockDb.jobs.set(4, job4)
  mockDb.nextJobId = 5

  // Add conversations
  const conv1: Conversation = {
    id: 1,
    job_id: 1,
    type: 'Call',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    summary: 'Discussed technical round - React, TypeScript, and system design focus',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  }

  const conv2: Conversation = {
    id: 2,
    job_id: 1,
    type: 'Email',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Received interview invitation for technical round',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }

  const conv3: Conversation = {
    id: 3,
    job_id: 2,
    type: 'Email',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Sent resume and portfolio link, awaiting response',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }

  const conv4: Conversation = {
    id: 4,
    job_id: 3,
    type: 'WhatsApp',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Panel interview completed, waiting for feedback',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }

  mockDb.conversations.set(1, conv1)
  mockDb.conversations.set(2, conv2)
  mockDb.conversations.set(3, conv3)
  mockDb.conversations.set(4, conv4)
  mockDb.nextConversationId = 5

  // Add a reminder
  const reminder1: Reminder = {
    id: 1,
    job_id: 3,
    reminder_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    note: 'Call Neha about panel interview results',
    is_done: false,
    snoozed_to: null,
    created_at: now,
  }

  mockDb.reminders.set(1, reminder1)
  mockDb.nextReminderId = 2
}

// Initialize seed data
if (mockDb.jobs.size === 0) {
  seedData()
}

// Mock Database Operations
export const mockDbOperations = {
  // Jobs
  getAllJobs: (statusFilter?: string) => {
    let jobs = Array.from(mockDb.jobs.values())
    if (statusFilter && statusFilter !== 'All') {
      jobs = jobs.filter(job => job.status === statusFilter)
    }
    return jobs.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  },

  getJobById: (id: number) => {
    return mockDb.jobs.get(id) || null
  },

  createJob: (data: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString()
    const newJob: Job = {
      ...data,
      id: mockDb.nextJobId++,
      created_at: now,
      updated_at: now,
    }
    mockDb.jobs.set(newJob.id, newJob)
    return newJob
  },

  updateJob: (id: number, data: Partial<Omit<Job, 'id' | 'created_at'>>) => {
    const job = mockDb.jobs.get(id)
    if (!job) return null

    const updatedJob: Job = {
      ...job,
      ...data,
      id,
      created_at: job.created_at,
      updated_at: new Date().toISOString(),
    }
    mockDb.jobs.set(id, updatedJob)
    return updatedJob
  },

  deleteJob: (id: number) => {
    const deleted = mockDb.jobs.delete(id)
    if (deleted) {
      // Cascade delete conversations and reminders
      for (const [convId, conv] of mockDb.conversations.entries()) {
        if (conv.job_id === id) mockDb.conversations.delete(convId)
      }
      for (const [remId, rem] of mockDb.reminders.entries()) {
        if (rem.job_id === id) mockDb.reminders.delete(remId)
      }
    }
    return deleted
  },

  // Conversations
  getConversationsByJobId: (jobId: number) => {
    return Array.from(mockDb.conversations.values())
      .filter(conv => conv.job_id === jobId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  getLatestConversationByJobId: (jobId: number) => {
    const conversations = Array.from(mockDb.conversations.values())
      .filter(conv => conv.job_id === jobId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return conversations[0] || null
  },

  createConversation: (data: Omit<Conversation, 'id' | 'created_at'>) => {
    const now = new Date().toISOString()
    const newConv: Conversation = {
      ...data,
      id: mockDb.nextConversationId++,
      created_at: now,
    }
    mockDb.conversations.set(newConv.id, newConv)

    // Update job's updated_at
    const job = mockDb.jobs.get(data.job_id)
    if (job) {
      job.updated_at = now
      mockDb.jobs.set(job.id, job)
    }

    return newConv
  },

  deleteConversation: (id: number) => {
    return mockDb.conversations.delete(id)
  },

  // Reminders
  getAllReminders: (dueOnly = false) => {
    let reminders = Array.from(mockDb.reminders.values())
      .filter(rem => !rem.is_done)

    if (dueOnly) {
      const now = new Date().getTime()
      reminders = reminders.filter(rem =>
        new Date(rem.reminder_date).getTime() <= now
      )
    }

    return reminders.sort((a, b) =>
      new Date(a.reminder_date).getTime() - new Date(b.reminder_date).getTime()
    )
  },

  getReminderByJobId: (jobId: number) => {
    return Array.from(mockDb.reminders.values())
      .filter(rem => rem.job_id === jobId && !rem.is_done)
      .sort((a, b) => new Date(a.reminder_date).getTime() - new Date(b.reminder_date).getTime())[0] || null
  },

  createReminder: (data: Omit<Reminder, 'id' | 'created_at'>) => {
    const newReminder: Reminder = {
      ...data,
      id: mockDb.nextReminderId++,
      created_at: new Date().toISOString(),
    }
    mockDb.reminders.set(newReminder.id, newReminder)
    return newReminder
  },

  updateReminder: (id: number, data: Partial<Omit<Reminder, 'id' | 'created_at' | 'job_id'>>) => {
    const reminder = mockDb.reminders.get(id)
    if (!reminder) return null

    const updatedReminder: Reminder = {
      ...reminder,
      ...data,
      id,
      created_at: reminder.created_at,
      job_id: reminder.job_id,
    }
    mockDb.reminders.set(id, updatedReminder)
    return updatedReminder
  },

  deleteReminder: (id: number) => {
    return mockDb.reminders.delete(id)
  },
}
