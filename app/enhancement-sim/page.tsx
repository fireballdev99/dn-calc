import type { Metadata } from 'next'
import EnhancementSimulator from '@/components/EnhancementSimulator'

export const metadata: Metadata = {
    title: 'Item Enhancement Simulator',
    description: 'Simulate item enhancement with different success rates',
}

export default function Page() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <main className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-amber-500 text-center mb-8">
                    Item Enhancement Simulator
                </h1>
                <EnhancementSimulator />
            </main>

            <footer className="py-4 text-center text-gray-400 mt-8">
                <p>
                    Item Enhancement Simulator - Based on enhancement game mechanics
                </p>
            </footer>
        </div>
    )
}