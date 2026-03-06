import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { reminders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// PUT /api/reminders/[id] - Update (snooze/done)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reminderId = parseInt(id)
    const body = await request.json()

    if (isNaN(reminderId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reminder ID' },
        { status: 400 }
      )
    }

    const [updatedReminder] = await db
      .update(reminders)
      .set(body)
      .where(eq(reminders.id, reminderId))
      .returning()

    if (!updatedReminder) {
      return NextResponse.json(
        { success: false, error: 'Reminder not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedReminder })
  } catch (error) {
    console.error('Error updating reminder:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update reminder' },
      { status: 500 }
    )
  }
}

// DELETE /api/reminders/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reminderId = parseInt(id)

    if (isNaN(reminderId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reminder ID' },
        { status: 400 }
      )
    }

    const deleted = await db
      .delete(reminders)
      .where(eq(reminders.id, reminderId))
      .returning()

    if (!deleted.length) {
      return NextResponse.json(
        { success: false, error: 'Reminder not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Reminder deleted successfully' },
    })
  } catch (error) {
    console.error('Error deleting reminder:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete reminder' },
      { status: 500 }
    )
  }
}
