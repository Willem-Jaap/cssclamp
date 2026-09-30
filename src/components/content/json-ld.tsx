interface Props {
    data: Record<string, unknown>;
}

// Structured data for search engines. JSON.stringify output is safe inside a script tag
// once "<" is escaped, which prevents a value from closing the tag early.
const JsonLd = ({ data }: Props) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(
                    /</g,
                    '\\u003c',
                ),
            }}
        />
    );
};

export default JsonLd;
