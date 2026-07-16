'use client';

import React, { useEffect, useState } from 'react';
import { cmsService, CMSPage } from '@/services/cms.service';
import { Button } from '@/components/ui/button';

export default function CMSPagesAdmin() {
    const [pages, setPages] = useState<CMSPage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const data = await cmsService.getPages();
                setPages(data);
            } catch (error) {
                console.error("Failed to fetch pages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">CMS Pages</h1>
                <Button>Create Page</Button>
            </div>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="border rounded">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4">Title</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((page) => (
                                <tr key={page.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{page.title}</td>
                                    <td className="p-4">{page.slug}</td>
                                    <td className="p-4">{page.status}</td>
                                    <td className="p-4">
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                            {pages.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">No pages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
