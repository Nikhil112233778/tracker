import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { conversations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// DELETE /api/conversations/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const conversationId = parseInt(id)

    if (isNaN(conversationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid conversation ID' },
        { status: 400 }
      )
    }

    const deleted = await db
      .delete(conversations)
      .where(eq(conversations.id, conversationId))
      .returning()

    if (!deleted.length) {
      return NextResponse.json(
        { success: false, error: 'Conversation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Conversation deleted successfully' },
    })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete conversation' },
      { status: 500 }
    )
  }
}
