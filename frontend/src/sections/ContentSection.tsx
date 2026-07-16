import React from 'react';

export interface ContentSectionProps {
    content: string;
    align?: 'left' | 'center' | 'right';
}

export function ContentSection({ content, align = 'left' }: ContentSectionProps) {
    return (
        <section className={`py-12 px-6 max-w-5xl mx-auto text-${align}`}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    );
}
