"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            className="px-3"
        >
            {theme === "dark" ? (
                <Moon className="size-4" />
            ) : (
                <Sun className="size-4" />
            )}
        </Button>
    );
}