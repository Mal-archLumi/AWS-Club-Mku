import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title = "AWS Student Builder Community MKU | Build Real-World Projects",
  description = "A structured student developer ecosystem at Mount Kenya University where builders collaborate, build real-world systems, and ship production-ready projects.",
  image = "/images/logo.jpeg",
  url = "https://awsmku.live",
  type = "website"
}) {
  const fullTitle = title.includes('AWS Student Builder Community MKU') 
    ? title 
    : `${title} | AWS Student Builder Community MKU`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AWS Student Builder Community MKU",
    "alternateName": "AWS Cloud Club MKU",
    "url": "https://awsmku.live",
    "logo": "https://awsmku.live/images/logo.jpeg",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thika",
      "addressRegion": "Kiambu County",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "awscloudclub.mku@gmail.com",
      "contactType": "General Inquiries"
    },
    "sameAs": [
      "https://x.com/AWSMku",
      "https://www.linkedin.com/company/aws-cloud-club-mku/",
      "https://github.com/Mal-archLumi/AWS-Club-Mku"
    ],
    "memberOf": {
      "@type": "EducationalOrganization",
      "name": "Mount Kenya University"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content="AWS Student Builder Community MKU, student developer community Kenya, cloud computing students MKU, build real-world projects Kenya, Mount Kenya University tech club, AWS cloud students, software development Kenya, student builders MKU" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AWS Student Builder Community MKU" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@AWSMku" />
      <meta name="twitter:creator" content="@AWSMku" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="AWS Student Builder Community MKU" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

export default SEO;
