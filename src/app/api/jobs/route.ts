import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jobs, conversations } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET /api/jobs?status=Applied
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')

    let query = db.select().from(jobs)

    if (statusFilter && statusFilter !== 'All') {
      query = query.where(eq(jobs.status, statusFilter)) as any
    }

    const allJobs = await query.orderBy(desc(jobs.updated_at))

    // Attach latest conversation to each job
    const jobsWithLastConversation = await Promise.all(
      allJobs.map(async (job) => {
        const [lastConv] = await db
          .select()
          .from(conversations)
          .where(eq(conversations.job_id, job.id))
          .orderBy(desc(conversations.date))
          .limit(1)

        return { ...job, lastConversation: lastConv || null }
      })
    )

    return NextResponse.json({
      success: true,
      data: jobsWithLastConversation,
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

// POST /api/jobs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.company || !body.role || !body.hr_name || !body.status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: company, role, hr_name, status',
        },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (body.hr_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.hr_email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const [newJob] = await db
      .insert(jobs)
      .values({
        ...body,
        created_at: now,
        updated_at: now,
      })
      .returning()

    return NextResponse.json(
      { success: true, data: newJob },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
