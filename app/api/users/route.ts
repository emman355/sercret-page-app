// /app/api/delete-user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function DELETE() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, message: 'User not authenticated.' }, { status: 401 });
  }

  // Delete from your own database
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': user.id,
    },
  });

  // Delete from Supabase Auth
  const adminClient = createAdminClient();
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);

  if (deleteError) {
    return NextResponse.json({ success: false, message: 'Failed to delete user.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'User deleted successfully.' });
}

export async function POST() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ success: false, message: 'User not authenticated.' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to add user');
    }

    return NextResponse.json({ success: true, message: 'User added successfully.' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object'
        ? JSON.stringify(error)
        : String(error);
    return NextResponse.json({ success: false, message: `Failed to add user. ${errorMessage}` }, { status: 500 });
  }
}

