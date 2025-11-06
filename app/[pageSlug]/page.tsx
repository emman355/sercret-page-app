import SecretPage1 from '@/modules/secret-page-1';
import SecretPage2 from '@/modules/secret-page-2';
import SecretPage3 from '@/modules/secret-page-3';
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
    <div className='space-y-6 w-full'>
      {/* Secret Page 1 & Inherited Features */}
      {validPages.includes(slug) && (
        <SecretPage1 />
      )}

      {/* Secret Page 2 & Inherited Features */}
      {(slug === 'secret-page-2' || slug === 'secret-page-3') && (
        <SecretPage2 />
      )}

      {/* Secret Page 3 & Inherited Features (Social Layer) */}
      {slug === 'secret-page-3' && (
        <SecretPage3 />
      )}
    </div>
  );
}

export default SecretPage;