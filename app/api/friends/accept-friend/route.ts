import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
  }

  let requestId: string;

  try {
    const body = await req.json();
    requestId = typeof body.requestId === 'string' ? body.requestId : '';

    if (!requestId) {
      return NextResponse.json(
        { success: false, status: 'invalid_input', message: 'Valid request ID is required.' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 'bad_request', message: `Invalid JSON payload. ${error}` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/friends/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id, // 👈 pass authenticated user ID
      },
      body: JSON.stringify({ requestId }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to accept friend request.');
    }

    return NextResponse.json({
      success: true,
      status: 'accepted',
      message: 'Friend request accepted successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : typeof error === 'object' ? JSON.stringify(error) : String(error);
    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to accept friend request. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
