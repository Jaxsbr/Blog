import { useEffect, useRef } from 'react';

const CANVAS_W = 800;
const CANVAS_H = { card: 80, banner: 200 } as const;

// 6 palettes harmonious with the sage green blog theme.
// Each palette: dark-to-light gradient pair, dot colour, accent circle colour.
// To add a new palette: append an object to this array. It will be picked
// deterministically based on the post slug hash — no other changes needed.
const PALETTES = [
    { bg1: '#2c3e2d', bg2: '#4a6741', dot: '#8fb882', accent: '#c5e3bb' }, // sage (brand)
    { bg1: '#1e2d3d', bg2: '#2b4a6b', dot: '#6a9fc4', accent: '#a8ccdf' }, // slate
    { bg1: '#3d2c1e', bg2: '#6b4a2d', dot: '#c49060', accent: '#e8c4a0' }, // clay
    { bg1: '#2d1e3d', bg2: '#4a2d6b', dot: '#9a6ac4', accent: '#ccaadf' }, // plum
    { bg1: '#1e3d35', bg2: '#2a6b5a', dot: '#5ac4a8', accent: '#a0ddd0' }, // teal
    { bg1: '#3d3520', bg2: '#6b5c2d', dot: '#c4a85a', accent: '#e8d4a0' }, // gold
];

function hashSlug(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

function makeRng(seed: number) {
    let s = seed | 1;
    return () => {
        s = (Math.imul(s, 1664525) + 1013904223) | 0;
        return (s >>> 0) / 0x100000000;
    };
}

interface PostCoverProps {
    slug: string;
    variant?: 'card' | 'banner';
}

export function PostCover({ slug, variant = 'card' }: PostCoverProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const H = CANVAS_H[variant];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const hash = hashSlug(slug);
        const rand = makeRng(hash);
        const palette = PALETTES[hash % PALETTES.length];

        // Diagonal gradient background
        const grad = ctx.createLinearGradient(0, 0, CANVAS_W, H);
        grad.addColorStop(0, palette.bg1);
        grad.addColorStop(1, palette.bg2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, CANVAS_W, H);

        // Dot grid with sine-wave opacity — unique per post
        const cell = 18 + Math.floor(rand() * 8);
        const f1 = 0.008 + rand() * 0.006;
        const f2 = 0.010 + rand() * 0.006;
        const p1 = rand() * Math.PI * 2;
        const p2 = rand() * Math.PI * 2;
        const dotR = 1.5 + rand() * 1.0;

        for (let x = cell / 2; x < CANVAS_W; x += cell) {
            for (let y = cell / 2; y < H; y += cell) {
                const wave = 0.5 + 0.5 * Math.sin(x * f1 + p1) * Math.cos(y * f2 + p2);
                ctx.globalAlpha = 0.08 + 0.30 * wave;
                ctx.beginPath();
                ctx.arc(x, y, dotR, 0, Math.PI * 2);
                ctx.fillStyle = palette.dot;
                ctx.fill();
            }
        }

        // Two large soft circles for depth
        ctx.globalAlpha = 0.07;
        ctx.beginPath();
        ctx.arc(
            CANVAS_W * (0.65 + rand() * 0.2),
            H * (rand() * 0.6),
            H * (0.6 + rand() * 0.5),
            0, Math.PI * 2
        );
        ctx.fillStyle = palette.accent;
        ctx.fill();

        ctx.globalAlpha = 0.09;
        ctx.beginPath();
        ctx.arc(
            CANVAS_W * (rand() * 0.25),
            H * (0.5 + rand() * 0.5),
            H * (0.4 + rand() * 0.35),
            0, Math.PI * 2
        );
        ctx.fillStyle = palette.accent;
        ctx.fill();

        ctx.globalAlpha = 1;
    }, [slug, H]);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={H}
            className={`post-cover post-cover--${variant}`}
            aria-hidden="true"
        />
    );
}
