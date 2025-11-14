import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/friends/friend-requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id, // pass user ID so backend knows who is requesting
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch incoming requests.');
    }

    return NextResponse.json({
      success: true,
      status: 'fetched',
      message: 'Incoming friend requests retrieved successfully.',
      data: result.requests,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : typeof error === 'object' ? JSON.stringify(error) : String(error);
    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to fetch incoming requests. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
