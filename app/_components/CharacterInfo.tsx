import { Input } from "@heroui/input";
export default function CharacterInfo() {
    return (
        <div>
            <Input
                isClearable
                className="max-w-xs"
                defaultValue="junior@heroui.com"
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                // eslint-disable-next-line no-console
                onClear={() => console.log("input cleared")}
            />
        </div>
    );
}
