const NotFound = () => (
    <div className="text-center space-y-6 py-12">
        <div className="card max-w-md mx-auto">
            <div className="card-content p-8 text-center">
                <div className="w-16 h-16 bg-destructive rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="icon-lg text-destructive-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
                <p className="text-muted-foreground mb-4">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <a href="/" className="btn btn-primary">
                    Go Home
                </a>
            </div>
        </div>
    </div>
);

export default NotFound;