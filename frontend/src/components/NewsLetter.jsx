const NewsLetter = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-6 flex flex-col items-center justify-center text-center">
      
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        Never Miss a Blog!
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 text-sm md:text-base mb-6">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      {/* Input + Button */}
      <div className="flex w-full max-w-xl">
        <input
          type="email"
          placeholder="Enter your email id"
          className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 outline-none text-sm"
        />

        <button
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
                     text-white text-sm font-medium rounded-r-md
                     hover:opacity-90 transition cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;