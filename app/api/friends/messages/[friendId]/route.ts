import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, context: { params: Promise<{ friendId: string }> }) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // 🔒 Authentication check
  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
    }

    const { friendId } = await context.params;

    try {
      
    // Call backend route with friendId
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/friends/messages/${friendId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id, // 👈 pass authenticated user ID
        },
      }
    );

    const result = await response.json();

    // Handle backend 401 (not friends)
    if (response.status === 401) {
      return NextResponse.json(
        {
          success: result.success,
          statusCode: result.statusCode,
          status: result.status,
          message: result.message,
        },
        { status: 401 }
      );
    }

    // Handle other errors
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch friend secret messages.');
    }

    // ✅ Success
    return NextResponse.json({
      success: true,
      status: 'retrieved',
      message: 'Friend secret messages retrieved successfully.',
      data: result.friendsSecrets,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object'
        ? JSON.stringify(error)
        : String(error);

    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to fetch friend secret messages. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
