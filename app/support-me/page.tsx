'use client';

import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { Button } from '@heroui/react';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';

export default function Page() {
    // ✅ แทรก BuyMeCoffee Widget
    useEffect(() => {
        const script = document.createElement('script');
        script.setAttribute('data-name', 'BMC-Widget');
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
        script.setAttribute('data-id', 'yodyxyz');
        script.setAttribute('data-description', 'Support me on Buy me a coffee!');
        script.setAttribute('data-message', 'Thank you for support me');
        script.setAttribute('data-color', '#FF813F');
        script.setAttribute('data-position', 'Right');
        script.setAttribute('data-x_margin', '18');
        script.setAttribute('data-y_margin', '18');
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50">
            <Card className="w-[360px] p-4 shadow-xl border border-orange-200">
                <CardHeader className="flex flex-col items-center gap-2">
                    <HandThumbUpIcon className="h-8 w-8 text-orange-500" />
                    <h2 className="text-xl font-semibold">Support My Work</h2>
                </CardHeader>
                <CardBody className="text-center">
                    <p className="mb-4 text-gray-600">
                        If you like what I do, you can buy me a beer! 🍺
                    </p>

                    <Button
                        as="a"
                        href="https://www.buymeacoffee.com/yodyxyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 text-black font-bold"
                        radius="full"
                        size="lg"
                    >
                        Buy me a beer
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
