const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      
      <div className="w-10 h-10 border-4 border-gray-300 border-t-violet-600 rounded-full animate-spin"></div>

      <p className="text-sm text-gray-500">Loading blog...</p>

    </div>
  );
};

export default Loader;