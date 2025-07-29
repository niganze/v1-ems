

export default function Contact() {
  return (
    <section className="min-h-screen w-full bg-[#f3f3f3] flex flex-col justify-center items-center px-4 py-16">
      <form className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Name */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <label className="flex-1 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight text-left">
            HELLO,<br />MY NAME IS
          </label>
          <input
            type="text"
            placeholder="Enter your name here"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-900 outline-none text-2xl md:text-3xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all w-full"
            required
          />
        </div>
        {/* Email */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <label className="flex-1 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight text-left">
            HERE IS MY EMAIL
          </label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-900 outline-none text-2xl md:text-3xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all w-full"
            required
          />
        </div>
        {/* Project Details */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <label className="flex-1 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight text-left">
            I’M LOOKING FOR
          </label>
          <textarea
            placeholder="Enter your project details here"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-900 outline-none text-2xl md:text-3xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all w-full resize-none"
            rows={1}
            required
          />
        </div>
        {/* Send Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-56 h-56 rounded-full bg-[#FFB347] flex items-center justify-center text-white text-2xl font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
} 