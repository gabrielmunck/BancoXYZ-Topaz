const AnimatedLoading = () => {
    return (
        <div className="flex items-center justify-center gap-1">
            <span
                className="text-4xl font-bold text-text-light animate-bounce"
                style={{ animationDelay: "0ms" }}
            >
                X
            </span>
            <span
                className="text-4xl font-bold text-text-light animate-bounce"
                style={{ animationDelay: "200ms" }}
            >
                Y
            </span>
            <span
                className="text-4xl font-bold text-text-light animate-bounce"
                style={{ animationDelay: "400ms" }}
            >
                Z
            </span>
        </div>
    );
};

export default AnimatedLoading;
