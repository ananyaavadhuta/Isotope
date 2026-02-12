import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    angle: number;
}

const IronFilingsEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const count = Math.floor((width * height) / 4000);
        for (let i = 0; i < Math.min(count, 300); i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0,
                size: Math.random() * 2.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                angle: Math.random() * Math.PI * 2,
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(canvas.width, canvas.height);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const magnetRadius = 250;
            const magnetStrength = 0.8;

            for (const p of particlesRef.current) {
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < magnetRadius && dist > 5) {
                    const force = (1 - dist / magnetRadius) * magnetStrength;
                    const ax = (dx / dist) * force;
                    const ay = (dy / dist) * force;
                    p.vx += ax;
                    p.vy += ay;
                    // Align angle toward mouse like iron filings
                    p.angle = Math.atan2(dy, dx);
                    p.opacity = Math.min(0.7, p.opacity + 0.02);
                } else {
                    // Drift back to original opacity
                    p.opacity = Math.max(0.08, p.opacity - 0.005);
                    p.angle += (Math.random() - 0.5) * 0.02;
                }

                // Friction
                p.vx *= 0.92;
                p.vy *= 0.92;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw as small lines (iron filings look)
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.beginPath();
                ctx.moveTo(-p.size * 2, 0);
                ctx.lineTo(p.size * 2, 0);
                ctx.strokeStyle = `hsla(175, 60%, 65%, ${p.opacity})`;
                ctx.lineWidth = p.size * 0.7;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.restore();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            style={{ opacity: 0.8 }}
        />
    );
};

export default IronFilingsEffect;