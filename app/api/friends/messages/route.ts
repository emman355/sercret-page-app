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
    // Call your backend GET route
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/friends/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id, // 👈 pass authenticated user ID
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch secret messages.');
    }

    return NextResponse.json({
      success: true,
      status: 'retrieved',
      message: 'Receiver secret messages retrieved successfully.',
      data: result.friendsSecrets, // 👈 contains the receiver secrets
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : typeof error === 'object' ? JSON.stringify(error) : String(error);
    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to fetch secret messages. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
