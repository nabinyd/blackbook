export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce200"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce400"></div>
            </div>
        </div>
    );
}
