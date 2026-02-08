import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Users, Film, Skull, Zap } from 'lucide-react';
import Hero from './components/Hero';
import DailyBugleFeed from './components/DailyBugleFeed';
import { MOVIES, VILLAINS, PRODUCTS, NFTS } from './constants';
import { chatWithSpideyLore } from './services/geminiService';
import { Movie, Villain, Product, NFTItem } from './types';

// --- COMPONENTS FOR PAGES ---

const Home = () => (
  <div className="min-h-screen bg-spidey-black">
    <Hero />
    <section className="py-16 px-4 bg-white/5">
        <h2 className="text-3xl font-bold text-center mb-10 uppercase tracking-widest text-white">Latest Updates</h2>
        <DailyBugleFeed />
    </section>
    
    <section className="py-20 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-widest text-white">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { title: "Movies", icon: <Film size={32} />, link: "/movies", color: "bg-spidey-red" },
                { title: "Merch", icon: <ShoppingBag size={32} />, link: "/shop", color: "bg-spidey-blue" },
                { title: "Villains", icon: <Skull size={32} />, link: "/villains", color: "bg-green-600" },
                { title: "Donate", icon: <Heart size={32} />, link: "/donate", color: "bg-yellow-500" },
            ].map((tile, idx) => (
                <Link key={idx} to={tile.link} className={`${tile.color} h-40 rounded-xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform shadow-lg group`}>
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                        {tile.icon}
                    </div>
                    <span className="font-bold text-xl">{tile.title}</span>
                </Link>
            ))}
        </div>
    </section>
  </div>
);

const About = () => (
  <div className="pt-24 pb-12 px-4 container mx-auto max-w-4xl text-gray-200">
    <h1 className="text-5xl font-black text-spidey-red mb-8 border-b border-gray-800 pb-4">Origin Story</h1>
    <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
            <p className="text-lg leading-relaxed mb-6">
                Peter Parker was an orphaned teenage science whiz living with his Uncle Ben and Aunt May in Queens, New York. His life changed forever when he was bitten by a radioactive spider at a science exhibit.
            </p>
            <p className="text-lg leading-relaxed text-gray-400 italic border-l-4 border-spidey-blue pl-4">
                "With great power, there must also come great responsibility."
            </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="text-yellow-400"/> Powers & Abilities</h3>
            <ul className="space-y-3">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-spidey-red rounded-full"></span> Wall-Crawling</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-spidey-red rounded-full"></span> Superhuman Strength</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-spidey-red rounded-full"></span> Spider-Sense (Precognition)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-spidey-red rounded-full"></span> Genius-level Intellect</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-spidey-red rounded-full"></span> Web-Shooters (Tech)</li>
            </ul>
        </div>
    </div>
    
    <h2 className="text-4xl font-bold text-spidey-blue mb-8">The Spider-Verse</h2>
    <div className="grid md:grid-cols-3 gap-6">
        {[
            { name: "Miles Morales", desc: "Brooklyn teen with bio-electricity powers." },
            { name: "Gwen Stacy", desc: "Ghost-Spider from Earth-65." },
            { name: "Spider-Man 2099", desc: "Miguel O'Hara, a geneticist from the future." }
        ].map((spider, idx) => (
            <div key={idx} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-spidey-blue transition-colors">
                <h3 className="font-bold text-xl mb-2">{spider.name}</h3>
                <p className="text-sm text-gray-400">{spider.desc}</p>
            </div>
        ))}
    </div>
  </div>
);

const Movies = () => {
    const [filter, setFilter] = useState<'All' | 'Maguire' | 'Garfield' | 'Holland' | 'Animated'>('All');
    
    const filteredMovies = filter === 'All' ? MOVIES : MOVIES.filter(m => m.era === filter);

    return (
        <div className="pt-24 pb-12 px-4 container mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h1 className="text-4xl font-bold mb-4 md:mb-0">Cinematic Universe</h1>
                <div className="flex flex-wrap gap-2">
                    {['All', 'Maguire', 'Garfield', 'Holland', 'Animated'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === f ? 'bg-spidey-red text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="bg-gray-900 rounded-xl overflow-hidden group shadow-lg hover:shadow-spidey-red/20 transition-all duration-300">
                        <div className="h-96 overflow-hidden relative">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold leading-tight mb-1">{movie.title}</h3>
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>{movie.year}</span>
                                    <span className="bg-yellow-500 text-black px-1 rounded text-xs font-bold flex items-center">{movie.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-sm text-gray-400 line-clamp-3">{movie.synopsis}</p>
                            <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                                <span className="text-green-400 font-mono text-sm">{movie.boxOffice}</span>
                                <button className="text-spidey-blue text-sm font-bold hover:underline">Watch Trailer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Villains = () => {
    const [selectedVillain, setSelectedVillain] = useState<Villain | null>(null);

    return (
        <div className="pt-24 pb-12 px-4 container mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center text-green-500 uppercase tracking-widest font-mono">Rogues Gallery</h1>
            <div className="grid md:grid-cols-3 gap-8">
                {VILLAINS.map(villain => (
                    <div 
                        key={villain.id} 
                        onClick={() => setSelectedVillain(villain)}
                        className="cursor-pointer bg-gray-900 rounded-lg border-2 border-gray-800 hover:border-green-500 transition-all transform hover:-translate-y-2 relative overflow-hidden group"
                    >
                        <img src={villain.image} alt={villain.name} className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">{villain.name}</h3>
                            <p className="text-gray-500 text-sm mb-4">{villain.alias}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase text-gray-400">Threat Level</span>
                                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-600" style={{ width: `${villain.dangerLevel * 10}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedVillain && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVillain(null)}>
                    <div className="bg-gray-900 border border-green-500 max-w-2xl w-full rounded-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedVillain(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                        <div className="flex flex-col md:flex-row gap-8">
                            <img src={selectedVillain.image} alt={selectedVillain.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-green-500 mx-auto md:mx-0" />
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-green-400">{selectedVillain.name}</h2>
                                <h4 className="text-xl text-gray-400 mb-4 font-mono">{selectedVillain.alias}</h4>
                                <p className="text-gray-300 mb-6">{selectedVillain.description}</p>
                                <h5 className="font-bold text-white mb-2 uppercase text-sm">Abilities</h5>
                                <div className="flex flex-wrap gap-2">
                                    {selectedVillain.powers.map((p, i) => (
                                        <span key={i} className="bg-gray-800 text-xs px-3 py-1 rounded-full border border-gray-700">{p}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Shop = () => (
    <div className="pt-24 pb-12 px-4 container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Merchandise Shop</h1>
        <div className="grid md:grid-cols-4 gap-6">
            {PRODUCTS.map(product => (
                <div key={product.id} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
                    <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img src={product.image} className="h-full object-cover" alt={product.name}/>
                    </div>
                    <div className="p-4">
                        <div className="text-xs font-bold text-gray-500 uppercase mb-1">{product.category}</div>
                        <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-spidey-red">${product.price}</span>
                            <button className="bg-black text-white p-2 rounded-full hover:bg-spidey-blue transition-colors">
                                <ShoppingBag size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const NFTMarketplace = () => (
    <div className="pt-24 pb-12 px-4 container mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 spidey-gradient-text">Spider-Verse NFTs</h1>
            <p className="text-gray-400">Collect exclusive digital artifacts from the multiverse.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            {NFTS.map(nft => (
                <div key={nft.id} className="bg-gray-900 border border-purple-500/30 rounded-2xl overflow-hidden hover:border-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{nft.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded bg-gray-800 border ${nft.rarity === 'Legendary' ? 'border-yellow-500 text-yellow-500' : 'border-blue-500 text-blue-500'}`}>{nft.rarity}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-purple-400 font-bold text-xl">{nft.priceEth} ETH</div>
                                <div className="text-xs text-gray-500">Current Bid</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
                            Created by {nft.creator}
                        </div>
                        <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors">Place Bid</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Donate = () => (
    <div className="pt-24 pb-12 px-4 container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Support the Cause</h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Even superheroes need help. Your donations support the Peter Parker Memorial Scholarship Fund and STEM initiatives for underprivileged youth in Queens.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-spidey-blue hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold text-spidey-blue mb-2">Friendly Neighborhood</h3>
                <div className="text-4xl font-black mb-6">$50 - $100</div>
                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-2"><Heart size={20} className="text-spidey-red"/> Exclusive Wallpapers</li>
                    <li className="flex gap-2"><Heart size={20} className="text-spidey-red"/> Monthly Newsletter</li>
                    <li className="flex gap-2"><Heart size={20} className="text-spidey-red"/> Name on the "Web of Thanks"</li>
                </ul>
                <button className="w-full py-3 border border-spidey-blue text-spidey-blue hover:bg-spidey-blue hover:text-white rounded-lg font-bold transition-colors">Donate Now</button>
            </div>

            <div className="bg-gradient-to-b from-gray-900 to-red-900/20 p-8 rounded-2xl border border-spidey-red hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-spidey-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <h3 className="text-2xl font-bold text-spidey-red mb-2">Avenger Level</h3>
                <div className="text-4xl font-black mb-6">$500+</div>
                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-2"><Zap size={20} className="text-yellow-400"/> All Previous Perks</li>
                    <li className="flex gap-2"><Zap size={20} className="text-yellow-400"/> Virtual Meet & Greet</li>
                    <li className="flex gap-2"><Zap size={20} className="text-yellow-400"/> 20% Off Merch Store</li>
                    <li className="flex gap-2"><Zap size={20} className="text-yellow-400"/> Behind-the-scenes Content</li>
                </ul>
                <button className="w-full py-3 bg-spidey-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors">Donate Now</button>
            </div>
        </div>
    </div>
);

const Community = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question) return;
        setLoading(true);
        const response = await chatWithSpideyLore(question);
        setAnswer(response);
        setLoading(false);
    };

    return (
        <div className="pt-24 pb-12 px-4 container mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center">Community Hub</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users /> Fan Art Gallery</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <img key={i} src={`https://picsum.photos/200/200?random=${i+20}`} className="rounded-lg hover:opacity-75 transition-opacity cursor-pointer" alt="Fan Art" />
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-spidey-blue"><Zap /> Ask Spidey AI</h2>
                    <p className="text-sm text-gray-400 mb-6">Have a question about the lore, the multiverse, or just want to chat? Ask the AI assistant!</p>
                    
                    <div className="mb-4">
                        <input 
                            type="text" 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Who was the first villain?"
                            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-spidey-blue outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                        />
                    </div>
                    <button 
                        onClick={handleAsk}
                        disabled={loading}
                        className="w-full bg-spidey-blue hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Consulting the Web...' : 'Ask Spidey'}
                    </button>

                    {answer && (
                        <div className="mt-6 p-4 bg-black/50 rounded-lg border-l-4 border-spidey-red animate-pulse-fast">
                            <p className="italic text-gray-200">"{answer}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- LAYOUT SHELL ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Movies", path: "/movies" },
        { name: "Villains", path: "/villains" },
        { name: "Shop", path: "/shop" },
        { name: "NFTs", path: "/nfts" },
        { name: "Community", path: "/community" },
        { name: "Donate", path: "/donate" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-white flex items-center gap-2">
                    <span className="text-spidey-red">Spider</span>Verse
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6">
                    {links.map(link => (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            className={`text-sm font-bold uppercase tracking-wide hover:text-spidey-red transition-colors ${location.pathname === link.path ? 'text-spidey-red' : 'text-gray-300'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-gray-800">
                    <div className="flex flex-col p-4 gap-4">
                        {links.map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-bold uppercase ${location.pathname === link.path ? 'text-spidey-red' : 'text-gray-300'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-black py-12 border-t border-gray-800 text-gray-500 text-sm">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 mb-8">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
            <p className="mb-2">&copy; {new Date().getFullYear()} Spider-Verse Hub. Fan made project.</p>
            <p>Spider-Man is a trademark of Marvel Characters, Inc. This site is not affiliated with Marvel or Sony.</p>
        </div>
    </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
        <div className="min-h-screen bg-spidey-black text-white selection:bg-spidey-red selection:text-white">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/villains" element={<Villains />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/nfts" element={<NFTMarketplace />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/community" element={<Community />} />
                </Routes>
            </main>
            <Footer />
        </div>
    </HashRouter>
  );
};

export default App;