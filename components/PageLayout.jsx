export default function PageLayout({ title, content, date }) {
    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <h1
                    className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                {date && (
                    <div className="text-gray-500">
                        Last Updated: {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                )}
            </div>

            <div
                className="prose prose-lg max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </article>
    );
}
