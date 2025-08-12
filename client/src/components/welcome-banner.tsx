interface WelcomeBannerProps {
  onGetStarted: () => void;
}

export default function WelcomeBanner({ onGetStarted }: WelcomeBannerProps) {
  return (
    <div className="gradient-primary rounded-xl p-8 mb-8 text-white animate-fade-in-up modern-card">
      <div className="flex items-center justify-between">
        <div className="animate-slide-in">
          <h1 className="text-4xl font-bold mb-3 animate-scale-in">
            Welcome to AutoFlow! 
            <span className="inline-block animate-bounce-gentle ml-2">🚀</span>
          </h1>
          <p className="text-blue-100 text-lg mb-6 animate-fade-in-up stagger-2">
            Deploy your projects effortlessly with automated CI/CD pipelines
          </p>
          <div className="flex items-center space-x-4 animate-fade-in-up stagger-3">
            <button 
              onClick={onGetStarted}
              className="btn-modern bg-white text-primary px-8 py-3 rounded-lg font-semibold hover-lift interactive"
            >
              <i className="fas fa-play mr-2"></i>
              Get Started
            </button>
            <button className="btn-modern border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover-lift interactive glass">
              <i className="fas fa-book mr-2"></i>
              View Guide
            </button>
          </div>
        </div>
        <div className="hidden lg:block animate-slide-in-right">
          <div className="w-48 h-36 glass rounded-lg flex items-center justify-center animate-float">
            <i className="fas fa-code-branch text-6xl text-white opacity-70 animate-pulse-slow"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
