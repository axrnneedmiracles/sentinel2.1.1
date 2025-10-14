'use client';

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
       <div className="absolute -bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-6000"></div>
    </div>
  );
}
