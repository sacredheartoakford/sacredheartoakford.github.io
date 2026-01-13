import { useEffect } from 'react';

interface EducationalInstitutionSchemaProps {
    pageType?: string;
    additionalData?: any;
}

const EducationalInstitutionSchema: React.FC<EducationalInstitutionSchemaProps> = ({ pageType = 'home', additionalData = {} }) => {
    useEffect(() => {
        let schemaData;

        // Base schema data
        const baseData = {
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

        // Add page-specific schema
        switch(pageType) {
            case 'home':
                schemaData = {
                    ...baseData,
                    "@type": ["EducationalOrganization", "LocalBusiness"],
                    "hasMap": "https://goo.gl/maps/...",
                    "openingHours": [
                        "Mo-Fr 07:30-14:30"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+27 78 629 9152",
                        "contactType": "Admissions",
                        "areaServed": "ZA",
                        "availableLanguage": ["English", "Zulu"]
                    }
                };
                break;
            case 'academics':
                schemaData = {
                    ...baseData,
                    "@type": "EducationalOrganization",
                    "educationalProgramMode": "full-time",
                    "educationalCredentialAwarded": "National Senior Certificate (Matric)",
                    "offers": {
                        "@type": "OfferCatalog",
                        "name": "Academic Programs",
                        "itemListElement": [
                            {
                                "@type": "Course",
                                "name": "Mathematics",
                                "description": "Mathematics curriculum for grades 8-12"
                            },
                            {
                                "@type": "Course",
                                "name": "Physical Science",
                                "description": "Physical Science curriculum for grades 8-12"
                            },
                            {
                                "@type": "Course",
                                "name": "Computer Application Technology",
                                "description": "Computer Application Technology curriculum for grades 8-12"
                            }
                        ]
                    }
                };
                break;
            case 'admissions':
                schemaData = {
                    ...baseData,
                    "@type": "EducationalOrganization",
                    "applicationDeadline": "2025-09-30",
                    "applicationProcess": "https://sacredheartoakford.co.za/apply",
                    "admissionRequirements": [
                        "Academic transcripts from previous school",
                        "Completed application form",
                        "Two recent passport-sized photographs"
                    ]
                };
                break;
            case 'fees':
            case 'boarding-fees':
                schemaData = {
                    ...baseData,
                    "@type": "EducationalOrganization",
                    "makesOffer": {
                        "@type": "Offer",
                        "priceSpecification": {
                            "@type": "PriceSpecification",
                            "priceCurrency": "ZAR",
                            "valueAddedTaxIncluded": true
                        },
                        "businessFunction": "Provides",
                        "name": "Boarding Fee Structure"
                    }
                };
                break;
            case 'contact':
                schemaData = {
                    ...baseData,
                    "@type": "EducationalOrganization",
                    "contactPoint": [
                        {
                            "@type": "ContactPoint",
                            "telephone": "+27 78 629 9152",
                            "contactType": "school office",
                            "areaServed": "ZA",
                            "availableLanguage": ["English", "Zulu"]
                        },
                        {
                            "@type": "ContactPoint",
                            "email": "sacredhearthostel01@gmail.com",
                            "contactType": "attendance office",
                            "areaServed": "ZA",
                            "availableLanguage": ["English", "Zulu"]
                        }
                    ],
                    "areaServed": {
                        "@type": "AdministrativeArea",
                        "name": "KwaZulu-Natal"
                    }
                };
                break;
            case 'staff':
            case 'teachers':
                schemaData = {
                    ...baseData,
                    "@type": "EducationalOrganization",
                    "employee": [
                        {
                            "@type": "Person",
                            "name": "Mrs SP Hlongwa",
                            "jobTitle": "Principal"
                        },
                        {
                            "@type": "Person",
                            "name": "Mrs NS Goba",
                            "jobTitle": "Deputy Principal"
                        }
                    ]
                };
                break;
            default:
                schemaData = baseData;
        }

        // Add any additional data provided
        schemaData = { ...schemaData, ...additionalData };

        // Create and add schema script tag
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        script.id = 'schema-org';
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            const existingSchema = document.getElementById('schema-org');
            if (existingSchema) {
                existingSchema.remove();
            }
        };
    }, [pageType, additionalData]);

    return null; // Since we're adding the script via useEffect
};

export default EducationalInstitutionSchema;
