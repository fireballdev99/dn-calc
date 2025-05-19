'use client';

import { Button } from '@heroui/react';

export default function BuyMeBeerButton() {
    const handleClick = () => {
        window.open(
            'https://www.buymeacoffee.com/yodyxyz',
            '_blank',
            'noopener,noreferrer'
        );
    };

    return (
        <Button
            onClick={handleClick}
            variant="light"
            radius="md"
            className="p-0 bg-transparent"
            aria-label="Buy me a beer"
        >
            <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=yodyxyz&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                alt="Buy me a beer"
                width={220}
                height={60}
                style={{ display: 'block' }}
            />
        </Button>
    );
}
