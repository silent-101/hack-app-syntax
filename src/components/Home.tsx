

export function HomeUI() {
    return (
        <div className="w-full h-full">
            {/* <header className="h-20 w-full">
                <nav className="h-full w-full flex items-center justify-end px-20">
                    <div>
                        <a href="/" className="text-sm">
                            Home
                        </a>
                        <a href="/gallery" className="ml-10 text-sm">
                            Gallery
                        </a>
                    </div>
                </nav>
            </header> */}
            <div className="w-full max-h-svh overflow-hidden flex items-center justify-center relative bg-black mix-blend-multiply">
                <img src="https://plus.unsplash.com/premium_photo-1661964079694-ccfaf7dc8028?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover"
                alt="Home" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                    <h1
                    className="text-[25vh] bg-transparent tracking-[-0.5rem] font-bold z-10 metrophobic-regular flex items-center justify-center absolute inset-0"
                    >India</h1>
                </div>
            </div>
            {/* <div className="w-full flex items-center max-h-svh justify-center relative bg-black mix-blend-multiply">
                <Section1UI />
            </div> */}
        </div>
    )
}