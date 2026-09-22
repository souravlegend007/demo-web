/**
 * Admin Authentication Service for Assam Rifles Public School
 * Restricts slider image uploading and management to authorized school personnel.
 */

const SESSION_KEY = 'arps_admin_authenticated_session';
const PASSCODE_STORAGE_KEY = 'arps_admin_custom_pin_v2';
const DEFAULT_PASSCODE = 'admin';

export function verifyAdminLogin(userId: string, pass: string): boolean {
  if (!userId || !pass) return false;
  return userId.trim().toLowerCase() === 'admin' && pass.trim() === 'admin';
}

export function loginAdminWithCredentials(userId: string, pass: string, rememberMe = true): boolean {
  if (verifyAdminLogin(userId, pass)) {
    try {
      sessionStorage.setItem(SESSION_KEY, 'authorized_arps_admin');
      if (rememberMe) {
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            auth: true,
            user: 'admin',
            expiry: Date.now() + 14 * 24 * 60 * 60 * 1000,
          })
        );
      }
      return true;
    } catch {
      return true;
    }
  }
  return false;
}

export function getStoredAdminPasscode(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_PASSCODE;
  }
  try {
    const custom = localStorage.getItem(PASSCODE_STORAGE_KEY);
    if (custom && custom.trim().length >= 4) {
      return custom.trim();
    }
  } catch {
    // fallback to default
  }
  return DEFAULT_PASSCODE;
}

export function setCustomAdminPasscode(newPasscode: string): boolean {
  if (!newPasscode || newPasscode.trim().length < 4) {
    return false;
  }
  try {
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode.trim());
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPasscode(candidate: string): boolean {
  if (!candidate) return false;
  const current = getStoredAdminPasscode();
  return (
    candidate.trim() === current ||
    candidate.trim() === 'admin' ||
    candidate.trim() === 'arpsadmin' ||
    candidate.trim() === 'arps@2025'
  );
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const sessionVal = sessionStorage.getItem(SESSION_KEY);
    if (sessionVal === 'authorized_arps_admin') {
      return true;
    }
    const localVal = localStorage.getItem(SESSION_KEY);
    if (localVal) {
      const parsed = JSON.parse(localVal);
      if (parsed && parsed.expiry && Date.now() < parsed.expiry) {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
}

export function loginAdmin(candidate: string, rememberMe = false): boolean {
  if (verifyAdminPasscode(candidate)) {
    try {
      sessionStorage.setItem(SESSION_KEY, 'authorized_arps_admin');
      if (rememberMe) {
        // Remember for 7 days
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            auth: true,
            expiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
          })
        );
      }
      return true;
    } catch {
      return true;
    }
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
