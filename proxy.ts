import { updateSession } from '@/utils/supabase/middleware';
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/', '/secret-page-1', '/secret-page-2', '/secret-page-3'],
};