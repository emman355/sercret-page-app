import { notFound } from 'next/navigation';
// Define the interface for the parameters object
interface SecretPageProps {
  params: {
    // The key must match your dynamic folder name: [pageSlug]
    pageSlug: string; 
  };
}

const SecretPage = async ({ params }: SecretPageProps) => {
  // 1. Get the dynamic segment from the URL
  const { pageSlug } = await params;

  // 2. Validate the slug to ensure it's one of the expected pages
  const validPages = ['secret-page-1', 'secret-page-2', 'secret-page-3'];
  const slug = pageSlug
  
  if (!validPages.includes(slug)) {
    // Return a 404 page if the URL segment is invalid
    return notFound(); 
  }

  // Conditional Rendering based on the slug
  return (
    <div>
      <h1>Welcome to the Secret Page: {slug}</h1>
      
      {/* --- Conditional Features --- */}
      
      {/* Features for all pages (e.g., Logout, Delete Account) */}
      <section>
        <p>User Authentication is Active.</p>
        <button>Sign Out</button>
        <button>Delete Account</button>
      </section>

      {/* Secret Page 1 & Inherited Features */}
      { validPages.includes(slug) && (
        <section>
          <h2>Secret Message:</h2>
          <p>This is a secret message visible when logged in.</p>
        </section>
      )}
      
      {/* Secret Page 2 & Inherited Features */}
      { (slug === 'secret-page-2' || slug === 'secret-page-3') && (
        <section>
          <h2>Message Editor (Page 2+ Feature)</h2>
          <textarea placeholder="Add or Overwrite your secret message"></textarea>
          <button>Save Message</button>
        </section>
      )}

      {/* Secret Page 3 & Inherited Features (Social Layer) */}
      { slug === 'secret-page-3' && (
        <section>
          <h2>Social Access (Page 3 Feature)</h2>
          <p>This is where &quot;Add Friend&quot; and friend message viewing logic resides.</p>
          <p>Attempting to view non-friend&apos;s message will return a 401.</p>
        </section>
      )}
      
    </div>
  );
}

export default SecretPage;