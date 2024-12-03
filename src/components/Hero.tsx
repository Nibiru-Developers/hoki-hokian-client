export default function Hero() {
  return (
    <div className="max-w-[450px] py-2 px-4 rounded-tl-3xl rounded-tr-3xl rounded-bl-md rounded-br-md mx-auto bg-slate-300 mt-16 md:mt-0">
      <h1 className="text-4xl text-center mb-3 font-bold mt-2">Hoki-hokian</h1>
      <p className="text-md text-end -rotate-6">
        by{" "}
        <a
          className="text-blue-600 font-bold"
          target="blank"
          href="https://www.linkedin.com/in/andry-pebrianto/"
        >
          Andry Pebrianto
        </a>
      </p>
    </div>
  );
}
