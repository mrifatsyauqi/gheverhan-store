import React from 'react';
import { HeroSection } from './HeroSection';
import { ContentSection } from './ContentSection';

// Map string keys from JSON to actual React Components
const sectionMap: Record<string, React.ElementType> = {
    'HeroSection': HeroSection,
    'ContentSection': ContentSection,
};

export interface DynamicPageRendererProps {
    configuration: any;
}

export function DynamicPageRenderer({ configuration }: DynamicPageRendererProps) {
    if (!configuration || !Array.isArray(configuration.sections)) {
        return null;
    }

    return (
        <div className="dynamic-page">
            {configuration.sections.map((section: any, index: number) => {
                const Component = sectionMap[section.type];
                if (!Component) {
                    console.warn(`Section type ${section.type} is not defined in sectionMap.`);
                    return null;
                }
                return <Component key={index} {...section.props} />;
            })}
        </div>
    );
}
