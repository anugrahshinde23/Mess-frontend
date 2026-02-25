// components/Loader.jsx
const Loader = () => (
   
<div className="flex flex-col border bg-indigo-100 justify-center items-center h-screen gap-5">
    <p className="text-2xl font-bold text-indigo-500">MessMate</p>
  <div className="flex gap-2">
  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:.7s]"></div>
  </div>
</div>
  );
  export default Loader;   