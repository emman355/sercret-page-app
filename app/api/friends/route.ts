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

  let receiver_id: string;

  try {
    const body = await req.json();
    receiver_id = typeof body.receiver_id === 'string' ? body.receiver_id : '';

    if (!receiver_id || receiver_id === user.id) {
      return NextResponse.json(
        { success: false, status: 'invalid_input', message: 'Valid receiver ID is required.' },
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/add-friend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify({ receiver_id }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to send friend request.');
    }

    return NextResponse.json({
      success: true,
      status: 'sent',
      message: 'Friend request sent successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : typeof error === 'object' ? JSON.stringify(error) : String(error);
    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to send friend request. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
