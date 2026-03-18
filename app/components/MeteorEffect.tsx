'use client';

export default function MeteorEffect() {
  return (
    <div className="meteors">
      {/* 动态生成流星 */}
      {Array.from({ length: 5 }).map((_, index) => {
        const left = Math.random() * 100;
        const top = Math.random() * 30;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 10;
        const endX = Math.random() * 300 + 100;
        const endY = Math.random() * 200 + 100;
        
        return (
          <div
            key={index}
            className="meteor"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              '--duration': `${duration}s`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
