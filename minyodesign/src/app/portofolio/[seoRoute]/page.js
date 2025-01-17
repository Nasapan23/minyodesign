// app/portofolio/[seoRoute]/page.jsx

export default function ProjectPage({ params }) {
    // params.seoRoute matches whatever is in the URL
    // e.g., /portofolio/piggy-branding => params.seoRoute === 'piggy-branding'
  
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Project: {params.seoRoute}</h1>
        <p>Here you can display details for the {params.seoRoute} project.</p>
      </main>
    );
  }
  