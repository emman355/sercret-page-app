import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function DELETE(req: Request, context: { params: Promise<{ requestId: string }> }) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
  }
  
  const { requestId } = await context.params;

  if (!requestId) {
    return NextResponse.json(
      { success: false, status: 'invalid_input', message: 'Request ID is required.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/friends/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id, // 👈 pass authenticated user ID
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to decline friend request.');
    }

    return NextResponse.json({
      success: true,
      status: 'deleted',
      message: 'Friend request declined and deleted successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, status: 'server_error', message: `Failed to decline friend request. ${errorMessage}` },
      { status: 500 }
    );
  }
}
