import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { conversations, jobs } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// POST /api/conversations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.job_id || !body.type || !body.date || !body.summary) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: job_id, type, date, summary',
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

    const now = new Date().toISOString()
    const [newConversation] = await db
      .insert(conversations)
      .values({
        ...body,
        created_at: now,
      })
      .returning()

    // Update job's updated_at timestamp
    await db
      .update(jobs)
      .set({ updated_at: now })
      .where(eq(jobs.id, body.job_id))

    return NextResponse.json(
      { success: true, data: newConversation },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating conversation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
}
