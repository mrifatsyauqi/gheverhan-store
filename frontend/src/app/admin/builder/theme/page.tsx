'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { Button } from '@/components/ui/button';
import { builderService } from '@/services/builder.service';

export default function ThemeEditorAdmin() {
    const { activeTheme, fetchActiveTheme, isLoading } = useThemeStore();
    const [settingsJson, setSettingsJson] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchActiveTheme();
    }, [fetchActiveTheme]);

    useEffect(() => {
        if (activeTheme) {
            setSettingsJson(JSON.stringify(activeTheme.settings, null, 2));
        }
    }, [activeTheme]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const parsedSettings = JSON.parse(settingsJson);
            await builderService.saveTheme({
                name: activeTheme?.name || 'Default Theme',
                settings: parsedSettings,
                is_active: true
            });
            alert('Theme saved successfully!');
            fetchActiveTheme();
        } catch (error) {
            alert('Invalid JSON or failed to save theme.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Theme Editor (JSON)</h1>
            
            {isLoading ? (
                <p>Loading active theme...</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    <p className="text-sm text-gray-500">Edit the global theme settings (e.g. colors, typography) in JSON format.</p>
                    <textarea 
                        className="w-full h-96 p-4 font-mono text-sm border rounded bg-gray-50"
                        value={settingsJson}
                        onChange={(e) => setSettingsJson(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Theme Settings'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
