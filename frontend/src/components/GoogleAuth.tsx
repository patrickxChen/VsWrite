import { useEffect, useRef } from "react";

export type GoogleUser = {
  sub: string;
  name: string;
  email: string;
  picture?: string;
};

type GoogleAuthProps = {
  user: GoogleUser | null;
  onSignIn: (user: GoogleUser) => void;
  onSignOut: () => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (element: HTMLElement, options: Record<string, string>) => void;
        };
      };
    };
  }
}

function parseJwtPayload(token: string): GoogleUser | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as Partial<GoogleUser>;
    if (!decoded.sub || !decoded.email) {
      return null;
    }
    return {
      sub: decoded.sub,
      name: decoded.name ?? decoded.email,
      email: decoded.email,
      picture: decoded.picture
    };
  } catch {
    return null;
  }
}

export function GoogleAuth({ user, onSignIn, onSignOut }: GoogleAuthProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || user) {
      return;
    }

    const ensureGoogleScript = () =>
      new Promise<void>((resolve) => {
        if (window.google?.accounts?.id) {
          resolve();
          return;
        }

        const existing = document.getElementById("google-gsi-client") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          return;
        }

        const script = document.createElement("script");
        script.id = "google-gsi-client";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

    ensureGoogleScript().then(() => {
      if (!window.google?.accounts?.id || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const parsed = parseJwtPayload(response.credential);
          if (parsed) {
            onSignIn(parsed);
          }
        }
      });

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "medium",
        text: "signin_with",
        shape: "pill"
      });
    });
  }, [clientId, onSignIn, user]);

  if (user) {
    return (
      <div className="auth-user">
        {user.picture ? <img src={user.picture} alt={user.name} className="auth-avatar" /> : <span className="auth-avatar-fallback">{user.name[0]}</span>}
        <div className="auth-meta">
          <span className="auth-name">{user.name}</span>
          <span className="auth-email">{user.email}</span>
        </div>
        <button className="auth-signout" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  if (!clientId) {
    return <p className="auth-hint">Set `VITE_GOOGLE_CLIENT_ID` to enable Google sign-in.</p>;
  }

  return <div ref={buttonRef} className="auth-google-button" />;
}
