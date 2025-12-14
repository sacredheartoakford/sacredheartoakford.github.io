const EducationalInstitutionSchema = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Sacred Heart Secondary School",
        "url": "https://sacredheartoakford.co.za/",
        "logo": "/images/logo.jpg",
        "description": "Sacred Heart Secondary School provides quality education with a focus on academic excellence, character development, and holistic growth for students.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Oakford Road",
            "addressLocality": "Redcliffe",
            "addressRegion": "Verulam",
            "postalCode": "4340",
            "addressCountry": "ZA"
        },
        "telephone": "+27 78 629 9152",
        "email": "sacredhearthostel01@gmail.com",
        "sameAs": [
            "https://www.facebook.com/sacredheartoakford/",
            "https://twitter.com/SacredHeartOa1",
            "https://www.instagram.com/sacredheartoakford/"
        ],
        "foundingDate": "2005"
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(schemaData)}
        </script>
    );
};

export default EducationalInstitutionSchema;
