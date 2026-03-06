import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { reminders, jobs } from '@/lib/db/schema'
import { eq, and, lte } from 'drizzle-orm'

// GET /api/reminders?due=true
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dueOnly = searchParams.get('due') === 'true'

    const now = new Date().toISOString()

    const whereConditions = dueOnly
      ? and(eq(reminders.is_done, false), lte(reminders.reminder_date, now))
      : eq(reminders.is_done, false)

    const results = await db
      .select({
        reminder: reminders,
        company: jobs.company,
        hr_name: jobs.hr_name,
        role: jobs.role,
      })
      .from(reminders)
      .innerJoin(jobs, eq(reminders.job_id, jobs.id))
      .where(whereConditions)

    const remindersWithJobs = results.map((r) => ({
      ...r.reminder,
      company: r.company,
      hr_name: r.hr_name,
      role: r.role,
    }))

    return NextResponse.json({
      success: true,
      data: remindersWithJobs,
    })
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reminders' },
      { status: 500 }
    )
  }
}

// POST /api/reminders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.job_id || !body.reminder_date || !body.note) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: job_id, reminder_date, note',
        },
        { status: 400 }
      )
    }

    // Verify job exists
    const [job] = await db.select().from(jobs).where(eq(jobs.id, body.job_id))
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    // Validate reminder date is in the future
    const reminderDate = new Date(body.reminder_date)
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    if (reminderDate < now) {
      return NextResponse.json(
        { success: false, error: 'Reminder date must be today or in the future' },
        { status: 400 }
      )
    }

    const [newReminder] = await db
      .insert(reminders)
      .values({
        job_id: body.job_id,
        reminder_date: body.reminder_date,
        note: body.note,
        is_done: false,
        snoozed_to: null,
        created_at: new Date().toISOString(),
      })
      .returning()

    return NextResponse.json(
      { success: true, data: newReminder },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating reminder:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create reminder' },
      { status: 500 }
    )
  }
}
