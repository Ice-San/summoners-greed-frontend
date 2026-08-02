import { motion } from "framer-motion"
import { User, MessageSquare, Heart, Mail, TrendingUp, Share2, Flame, Calendar } from 'lucide-react';

export const Home = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#120e16]">
            <div className="relative">
                <header className="fixed h-auto inset-x-0 top-4 flex justify-center items-center font-bold z-10">
                    <div className="flex px-6 mx-2 h-16 justify-between items-center w-full md:w-3/5 min-w-50 bg-[#1d1826]/95 rounded-xl">
                        <p className="cursor-pointer  text-xl tracking-tight text-[#ffc107]">Summoner's Greed</p>

                        <button className="bg-[#ffc107] w-29 inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-6 shadow-md hover:scale-105 hover:bg-[#ffc107]/90">
                            Let's Start
                        </button>
                    </div>
                </header>

                <section className="flex h-dvh w-full flex-col items-center justify-center">
                    <div className="w-full h-full bg-[url('/imgs/banner.webp')] bg-cover bg-center bg-no-repeat">
                        <div className="w-full h-full bg-linear-to-b from-[#1d1826]/55 via-slate-950/90 to-[#1d1826] pt-25">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                className="w-full mx-auto px-4 flex flex-col items-center text-center">

                                <div className="space-y-8 max-w-6xl ">
                                    <h1 className="mt-25 md: items-center justify-center text-5xl md:text-8xl font-black tracking-tight text-white drop-shadow-lg leading-tight ">
                                        ENTER THE WORLD OF {' '}
                                        <span className=" pl-0 text-transparent bg-clip-text bg-linear-to-r justify-content-end text-secondary from-[#ffc107] to-[#9b5de5] ">
                                            SUMMONER'S GREED
                                        </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed  mb-15">
                                        Connect with fellow Summoners, share your ultimate monster grids, discover the meta, and crush the King's pathetic army together.
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-center w-full h-auto">
                                    <button className="inline-flex items-center  justify-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#ffc107] text-background hover:bg-[#ffc107]/90 rounded-md px-6 w-50 text-xl py-5 shadow-[0_0_30px_rgba(255,193,7,0.4)] hover:scale-105 transition-transform duration-300 ">
                                        Let's Start!
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-14 bg-[#120e16]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col items-left justify-center w-full md:w-2/3 h-50 gap-4">
                            <h2 className="text-white font-extrabold md:text-5xl text-3xl ">Community Feed</h2>
                            <p className="text-xl text-gray-400 ">See what other summoners are sharing.</p>
                        </div>                  
                        <div className="flex items-center justify-center">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0.5, y: 70 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3 }}
                                    className="p-6 rounded-3xl bg-[#1d1826]/50 border border-white/5 backdrop-blur-sm space-y-6">
                                    <div className="flex w-full h-auto gap-3">
                                        <div className="flex items-center justify-center h-12 w-12 min-w-12 bg-[#ffc107]/20 rounded-full"><User size={30} color="#ffc107" /></div>
                                        <div className="flex flex-col h-12 w-full">
                                            <h3 className="text-white font-bold text-xl">MasterSummoner99</h3>
                                            <p className="text-gray-400">@summoner99 • 2h ago</p>
                                        </div>
                                    </div>
                                    <div className="h-20 w-full mt-7 mb-15">
                                        <p className=" text-gray-300 text-lg md:text-xl leading-relaxed ">Just beat the Joint Revenge on Nightmare difficulty! The new Speedy + Kevin combo is absolutely broken. Who else is using this? 🔥</p>
                                    </div>
                                    <div className="w-full h-130 rounded-3xl bg-[url('/imgs/sg.jpg')] bg-cover bg-center bg-no-repeat"></div>
                                    <div className="flex gap-5 w-full h-10 border-t border-white/5 pt-3">
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors delay-75 ease-in">
                                            <MessageSquare />
                                            <span>20</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors delay-75 ease-in">
                                            <Heart />
                                            <span>20</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors delay-75 ease-in">
                                            <Share2 />
                                        </button>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    className=" flex flex-col items-center justify-start p-6 h-auto md:h-80 rounded-3xl bg-[#1d1826]/50 border border-white/5 backdrop-blur-sm space-y-6 ">
                                    <div className="flex w-full h-auto gap-3">
                                        <div className="flex items-center justify-center h-12 w-12 min-w-12 bg-[#9b5de5]/20 rounded-full"><User size={30} color="#9b5de5" /></div>
                                        <div className="flex flex-col h-12 w-full">
                                            <h3 className="text-white font-bold text-xl">KingSlime</h3>
                                            <p className="text-gray-400">@slimeking • 5h ago</p>
                                        </div>
                                    </div>
                                    <div className="h-auto  w-full ">
                                        <p className="h-full  text-gray-300 text-lg md:text-xl leading-relaxed ">Does anyone know the drop rate for mythic gems in the current event? I've been grinding all day and only got 2! 😭 Need that new mythical monster ASAP.</p>
                                    </div>
                                    <div className="flex gap-5 w-full h-10  border-t border-white/5 pt-3">
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors delay-75 ease-in">
                                            <MessageSquare />
                                            <span>20</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors delay-75 ease-in">
                                            <Heart />
                                            <span>20</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors delay-75 ease-in">
                                            <Share2 />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full md:p-15 pb-20 bg-[#0B080D]/90">
                    <div className="max-w-7xl mx-auto px-4 h-full">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-left justify-center w-full md:w-2/3 h-50 gap-4">
                                <h2 className="text-white font-extrabold md:text-5xl text-3xl ">Latest News</h2>
                                <p className="text-xl text-gray-400 ">Patch notes, events, and updates.</p>
                            </div>
                            <div className="flex items-center justify-center  min-w-30 ">
                                <button className="flex items-center justify-center text-[#ffc107]  cursor-pointer transition-colors delay-75 ease-in hover:bg-gray-500/10 p-2 rounded-lg">View All News</button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 ">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: [40, 15, 15, 0] }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                                className="flex group flex-col w-full h-auto p-6 rounded-xl hover:bg-[#1d1826]/20 bg-[#1d1826]/50 border border-white/5 cursor-pointer hover:text-yellow-300">
                                <div className="flex w-full h-10 items-center justify-between mb-7">
                                    <div className="flex items-center justify-center p-3 transition group-hover:scale-110 bg-black rounded-xl">
                                        <Flame color="#ff6900" />
                                    </div>
                                    <div className="flex items-start justify-center h-full">
                                        <div className="flex items-center justify-center w-23 h-5 rounded-2xl text-xs font-bold bg-white/5 text-gray-400 ">
                                            <span>Patch Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start pb-5">
                                    <h3 className="text-white font-bold text-xl  group-hover:text-yellow-400">Patch 3.2.0: The Mythical Uprising</h3>
                                </div>
                                <div className="flex items-center justify-start">
                                    <p className="text-gray-500 text-sm ">July 18, 2026</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: [40, 15, 15, 0] }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                className="flex group flex-col w-full h-auto p-6 rounded-xl bg-[#1d1826]/50 border border-white/5 cursor-pointer">
                                <div className="flex w-full h-10 items-center justify-between mb-7">
                                    <div className="flex items-center justify-center p-3 transition group-hover:scale-110 bg-black rounded-xl">
                                        <Calendar color="#54a2ff" />
                                    </div>
                                    <div className="flex items-start justify-center h-full">
                                        <div className="flex items-center justify-center w-14 h-5 rounded-2xl text-xs font-bold bg-white/5 text-gray-400 ">
                                            <span>Event</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start pb-5">
                                    <h3 className="text-white font-bold text-xl  group-hover:text-yellow-400">Summer Event: Beach Party Bosses</h3>
                                </div>
                                <div className="flex items-center justify-start">
                                    <p className="text-gray-500 text-sm ">July 15, 2026</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: [40, 15, 15, 0] }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                className="flex group flex-col w-full h-auto p-6 rounded-xl bg-[#1d1826]/50 border border-white/5 cursor-pointer">
                                <div className="flex w-full h-10 items-center justify-between mb-7">
                                    <div className="flex items-center justify-center p-3 transition group-hover:scale-110 bg-black rounded-xl">
                                        <TrendingUp color="#05df72" />
                                    </div>
                                    <div className="flex items-start justify-center h-full">
                                        <div className="flex items-center justify-center w-23 h-5 rounded-2xl text-xs font-bold bg-white/5 text-gray-400 ">
                                            <span>Community</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start pb-5">
                                    <h3 className="text-white font-bold text-xl  group-hover:text-yellow-400">Meta Shift: Why Slime King is Back</h3>
                                </div>
                                <div className="flex items-center justify-start">
                                    <p className="text-gray-500 text-sm ">July 10, 2026</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="w-full md:p-15 pb-20 bg-[#120e16]">
                    <div className="flez items-center justify-center max-w-4xl mx-auto px-4 h-full">
                        <div className="flex flex-col items-center justify-center w-full h-50 gap-4">
                            <h2 className="text-white font-extrabold md:text-5xl text-3xl ">Player Profiles</h2>
                            <p className="text-xl text-gray-400 ">Showcase your achievements and stats.</p>
                        </div>
                        <div className="flex items-center justify-center w-full h-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col items-center justify-Start w-full h-auto bg-black/50 rounded-2xl border border-white/5">
                                <div className="w-full h-40 rounded-t-2xl bg-linear-to-r from-[#ffc10733]/90 via-[#9b5de533]/90 relative">
                                    <div className="absolute -bottom-16 left-8 p-2 bg-[#120e16] rounded-full">
                                        <div className="w-28 h-28 rounded-full bg-[#ffc10733]/20 border-4 border-[#120e16] flex items-center justify-center">
                                            < User color="#ffc107" size={60} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-full pt-20 px-8 pb-8">
                                    <div className="flex flex-col md:flex-row gap-5 justify-between items-start h-auto w-full mb-8">
                                        <div className="">
                                            <h3 className="text-3xl font-black text-white flex items-center gap-3 ">
                                                GrandMaster
                                                <span className="flex items-center justify-center bg-[#ffc107]/20 text-[#ffc107] text-xs w-15 p-1 rounded-md border border-[#ffc107]/20">Lvl 120</span>
                                            </h3>
                                            <p className="text-gray-400 text-lg mt-1">@grandmaster • Top 1% Summoner</p>
                                        </div>
                                        <button className="flex items-center justify-center rounded-md bg-[#ffc107]  transition-colors delay-75 ease-in hover:bg-[#ffc107]/80  w-35 md:w-30 h-10 ">Follow</button>
                                    </div>
                                    <p className="text-gray-300 text-lg mb-8 max-w-2xl ">Collecting mythicals and optimizing grids since 2021. Always down to discuss new meta strategies and theorycrafting!</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 h-30 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center justify-center ">
                                            <p className="text-white font-black text-lg mb-1">Joint Revenge (Hard)</p>
                                            <p className="text-gray-400 text-sm font-medium">Highest Stage</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center justify-center ">
                                            <p className="text-white font-black text-xl mb-1">14</p>
                                            <p className="text-gray-400 text-sm font-medium">Mythicals</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center justify-center ">
                                            <p className="text-white font-black text-xl mb-1">12.4K</p>
                                            <p className="text-gray-400 text-sm font-medium">Followers</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center justify-center ">
                                            <p className="text-white font-black text-xl mb-1">482</p>
                                            <p className="text-gray-400 text-sm font-medium">Posts</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                <footer className="w-full bg-[#111111] text-white mt-auto">
                    <div className="w-full max-w-6xl mx-auto px-4 pt-16 pb-8">
                        <div className="bg-linear-to-br from-[#7B2CBF] to-[#5A189A] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center overflow-hidden shadow-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-md ">Join Summoner's Greed Community</h2>
                            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl ">Connect with fellow summoners, share strategies, and climb the leaderboards together!</p>
                            <div className="flex items-center justify-center">
                                <button className="bg-white text-black py-3 px-9 rounded-xl text-xl font-bold hover:bg-gray-100 transition-colors delay-75 ease-in flex items-center justify-center gap-2">Join the Cult!</button>
                            </div>
                            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 z-10 border-t border-white/20 pt-8">
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black ">+10M</h3>
                                    <p className="text-sm md:text-base text-white/80 ">Players Worldwide</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black ">+2M</h3>
                                    <p className="text-sm md:text-base text-white/80 ">Community Posts</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black ">+500K</h3>
                                    <p className="text-sm md:text-base text-white/80 ">Active Summoners</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black ">+100</h3>
                                    <p className="text-sm md:text-base text-white/80 ">Monsters to Collect</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">Summoner's Greed</h3>
                                <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">The ultimate community hub for Summoner's Greed players. Share strategies, discuss the meta, and connect with summoners worldwide.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-white">Explore</h4>
                                <ul className="space-y-3 text-sm text-gray-400" >
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">HomePage</a>
                                    </li>
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">How It Works?</a>
                                    </li>
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">Frequently Asked Questions</a>
                                    </li>
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
                                <ul className="space-y-3 text-sm text-gray-400" >
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">UserAgreement</a>
                                    </li>
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a className="cursor-pointer hover:text-white transition-colors delay-75 ease-in" href="">Cookie Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                            <p>© 2026 SUMMONER'S GREED INFORMATION TECHNOLOGIES LIMITED COMPANY. All rights reserved.</p>
                            <p className="flex items-center gap-2"><Mail size={15} /> info@summonersgreed.com</p>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
};