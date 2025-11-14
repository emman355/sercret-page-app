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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/secret-message`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch messages.');
    }

    return NextResponse.json({
      success: true,
      status: 'fetched',
      message: 'All secret messages retrieved successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object'
        ? JSON.stringify(error)
        : String(error);

    console.error('Fetch error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to retrieve messages. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
  }

  let content: string;

  try {
    const body = await req.json();
    content = typeof body.content === 'string' ? body.content.trim() : '';

    if (!content) {
      return NextResponse.json(
        { success: false, status: 'invalid_input', message: 'Secret message content is required.' },
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/secret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify({ content }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to save secret message.');
    }

    return NextResponse.json({
      success: true,
      status: 'created',
      message: 'Secret message saved successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object'
        ? JSON.stringify(error)
        : String(error);

    console.error('Secret message error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to save secret message. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, status: 'unauthorized', message: 'User not authenticated.' },
      { status: 401 }
    );
  }

  let id: string;
  let content: string;

  try {
    const body = await req.json();
    id = typeof body.id === 'string' ? body.id : '';
    content = typeof body.content === 'string' ? body.content.trim() : '';

    if (!id || !content) {
      return NextResponse.json(
        { success: false, status: 'invalid_input', message: 'Message ID and content are required.' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, status: 'bad_request', message: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/secret/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify({ content }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update message.');
    }

    return NextResponse.json({
      success: true,
      status: 'updated',
      message: 'Secret message updated successfully.',
      data: result.data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : typeof error === 'object' ? JSON.stringify(error) : String(error);

    console.error('Update error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        status: 'server_error',
        message: `Failed to update message. ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
