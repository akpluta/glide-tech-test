import React from 'react';

export default function Layout({heading, children}) {
    return (
        <div className="min-h-full w-full">
            <header className="bg-white shadow">
                <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        {heading}
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto px-4 py-6 sm:px-6 sm:w-200">
                    {children}
                </div>
            </main>
        </div>
    )
}
