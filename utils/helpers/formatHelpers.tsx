export function getUsernameFromEmail(email: string | undefined): string | null | undefined {
  const parts = email?.split("@");
  if (parts?.length === 2) {
    return parts[0];
  }
  return null; // invalid email
}

export function getUsernameInitialFromEmail(email: string | undefined): string | null | undefined {
  const parts = email?.split("@");
  if (parts?.length === 2 && parts[0].length > 0) {
    return parts[0][0].toUpperCase(); // returns the first character, capitalized
  }
  return null; // invalid email or empty username
}

