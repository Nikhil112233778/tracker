import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jobs, conversations, reminders } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/jobs/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const jobId = parseInt(id)

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      )
    }

    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId))

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    const allConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.job_id, jobId))
      .orderBy(desc(conversations.date))

    const [reminder] = await db
      .select()
      .from(reminders)
      .where(and(eq(reminders.job_id, jobId), eq(reminders.is_done, false)))
      .orderBy(desc(reminders.reminder_date))
      .limit(1)

    return NextResponse.json({
      success: true,
      data: {
        job,
        conversations: allConversations,
        reminder: reminder || null,
      },
    })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    )
  }
}

// PUT /api/jobs/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const jobId = parseInt(id)
    const body = await request.json()

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
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

    const [updatedJob] = await db
      .update(jobs)
      .set({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .where(eq(jobs.id, jobId))
      .returning()

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedJob })
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    )
  }
}

// DELETE /api/jobs/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const jobId = parseInt(id)

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      )
    }

    // Delete job (cascade deletes conversations and reminders via schema)
    const deleted = await db.delete(jobs).where(eq(jobs.id, jobId)).returning()

    if (!deleted.length) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Job deleted successfully' },
    })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    )
  }
}
