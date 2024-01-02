'use client';

// https://github.com/vercel/next.js/discussions/53225
// https://github.com/vercel/next.js/discussions/50383
import { useEffect } from 'react'

export default function Error({
  error
}: {
  error: Error & { cause: number }
}) {
  useEffect(() => {
    // Nothing todo
  }, [error])

  const pageStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    flexDirection: 'column',
  };

  const noteStyles: React.CSSProperties = {
    margin: '1.5rem',
    textAlign: 'left'
  };

  return (
    <>
      <div style={pageStyles}>
        <h1>Something went wrong...</h1>
        <div style={noteStyles}>
          <p>This web site returns a 500 error if the backend-server returns any status code other than 404.</p>
          <h5>Reasons</h5>
          <ul>
            <li>
              <a target="_blank" rel="noopener external nofollow noreferrer" href="https://github.com/vercel/next.js/discussions/53225">Support custom HTTP Status Code for Server Components</a>
            </li>
            <li>
              <a target="_blank" rel="noopener external nofollow noreferrer" href="https://github.com/vercel/next.js/discussions/50383">Set different unsuccessful status codes on page (RSC) when fetching or something else goes wrong?</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
