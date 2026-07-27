

export function HomeUI() {
    return (
        <div className="w-full h-full bg-black text-white">
            <header className="h-20 w-full">
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
            </header>
        </div>
    )
}