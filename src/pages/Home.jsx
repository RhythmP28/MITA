export default function Home() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row gap-8 md:gap-12 p-4 md:p-8">
			<section className="md:w-1/2 w-full aspect-square md:aspect-auto">
				<div className="math-grid shadow-xl relative">
					<img src="/mita-logo.png" alt="Mita logo watermark" className="absolute left-4 top-4 w-20 h-20 opacity-20 pointer-events-none select-none" />
					{Array.from({ length: 64 }).map((_, i) => (
						<div key={i} />
					))}
				</div>
			</section>
			<section className="md:w-1/2 w-full flex flex-col justify-center">
				<div className="inline-block mb-6">
					<h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
						<span className="text-outline-purple">Natural Selection</span> for Mathematicians
					</h1>
				</div>
				<div className="flex items-center gap-6 text-offwhite/80 mb-8">
					<div>
						<span className="font-bold">12,345</span> Problems Today
					</div>
					<div>
						<span className="font-bold">1,234</span> Users Solving Now
					</div>
				</div>
				<div className="flex flex-col sm:flex-row md:flex-col gap-4 max-w-xl">
					<button className="bg-purple hover:bg-purpleDark text-offwhite rounded-lg px-6 py-4 font-bold transition-all duration-300 text-lg w-full">
						Solve Online
						<span className="block text-sm font-normal opacity-90">Play with someone at your level</span>
					</button>
					<button className="bg-[#333] hover:bg-[#444] text-offwhite rounded-lg px-6 py-4 font-bold transition-all duration-300 text-lg w-full">
						Practice Alone
						<span className="block text-sm font-normal opacity-90">Timed solo challenges</span>
					</button>
				</div>
				<div className="mt-10 h-40 rounded-lg bg-[#111] border border-white/5" />
			</section>
		</div>
	)
}




