'use client';

export default function StarBackground() {
  return (
    <div className="stars">
      {/* 动态生成星星 */}
      {Array.from({ length: 200 }).map((_, index) => {
        const size = Math.random() < 0.7 ? 'small' : Math.random() < 0.5 ? 'medium' : 'large';
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 1 + Math.random() * 3;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={index}
            className={`star ${size}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
