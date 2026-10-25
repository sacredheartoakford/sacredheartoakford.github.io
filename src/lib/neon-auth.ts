// Neon Auth wrapper — wraps @neondatabase/auth for the app's needs
import { createAuthClient } from '@neondatabase/auth';

const NEON_AUTH_BASE_URL = import.meta.env.VITE_NEON_AUTH_BASE_URL as string | undefined;

let _auth: ReturnType<typeof createAuthClient> | null = null;

function createAuth() {
  if (!NEON_AUTH_BASE_URL) {
    throw new Error('VITE_NEON_AUTH_BASE_URL is not set');
  }
  // Default adapter is BetterAuthVanillaAdapter
  return createAuthClient(NEON_AUTH_BASE_URL);
}

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}

export { createAuth };
export type NeonAuth = ReturnType<typeof createAuthClient>;
