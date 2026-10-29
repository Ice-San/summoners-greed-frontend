import { House, Search, User, Shield, LogOut, Feather } from 'lucide-react';
import { useRef } from "react";

import { Comment } from './elements/Comment';

export const PostPage = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <main className="bg-[#120e16] text-white flex min-h-screen">
            <div className="hidden sm:flex flex-col justify-between p-4 w-64 h-screen shrink-0">
                <div className="mt-[39px] space-y-4">
                    <a className="text-xl font-bold flex items-center gap-4 p-3 rounded-full hover:bg-[#1d1826]/50" href=""><House color="#ffffff" size={25}/> Home</a>
                    <a className="text-xl font-bold flex items-center gap-4 p-3 rounded-full hover:bg-[#1d1826]/50" href=""><Search color="#ffffff" size={25}/> Explore News</a>
                    <a className="text-xl font-bold flex items-center gap-4 p-3 rounded-full hover:bg-[#1d1826]/50" href=""><User color="#ffffff" size={25}/> Profile</a>
                    <a className="text-xl font-bold flex items-center gap-4 p-3 rounded-full hover:bg-[#1d1826]/50" href=""><Shield color="#ffffff" size={25}/> Dashboard</a>
                    <button className="rounded-md text-[#120e16] text-sm font-bold bg-[#ffc107] hover:bg-[#ffc107]/90 w-full h-10 cursor-pointer">Post</button>
                </div>

                <div className="rounded-full flex items-center gap-3 p-3 cursor-pointer hover:bg-[#1d1826]/50">
                    <div className="bg-[#1d1826] rounded-full flex justify-center items-center shrink-0 text-[#ffc107] w-10 h-10">E</div>
                    <div className="overflow-hidden">
                        <p className="font-bold truncate">example@gmail.com</p>
                        <p className="text-[#a0a0b0] text-sm truncate">example@gmail.com</p>
                    </div>
                    <LogOut color="#ffffff" size={25}/>
                </div>
            </div>

            <div className="flex-1 w-full max-w-2xl border-x border-[#1d1826] pb-24 sm:pb-0">
                <div className="bg-black font-bold text-lg flex justify-center items-center h-[55px]">For you</div>

                <div className="p-4 border-b border-[#1d1826] flex gap-4">
                    <div className="bg-[#1d1826] rounded-full flex justify-center items-center shrink-0 text-[#ffc107] font-bold w-10 h-10">
                        E
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <textarea 
                            ref={textareaRef}
                            name="post-content"
                            placeholder="What is happening?!"
                            rows={3}
                            className="bg-transparent rounded-md text-lg p-3 resize-none w-full focus:outline-3 focus:outline-[#ffc107]"
                        />
                        <div className="flex justify-end">
                            <button className="bg-[#ffc107] flex-1 rounded-md text-sm font-bold text-[#120e16] hover:bg-[#ffc107]/90 px-6 py-2 cursor-pointer sm:flex-none">
                                Post
                            </button>
                        </div>
                    </div>
                </div>

                <Comment  subcomment={false}>
                    <Comment  subcomment={true} />
                    <Comment  subcomment={true} />
                </Comment>
            </div>

            {/* Elements for Mobile version */}

            {/* -------------------------------------------------------------------------------- */}

            <button onClick={() => textareaRef.current?.focus()} className="sm:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full bg-[#ffc107] text-[#120e16] shadow-lg flex justify-center items-center cursor-pointer hover:bg-[#ffc107]/90 active:scale-95 transition-transform">
                <Feather size={24}/>
            </button>

            <nav className="sm:hidden fixed bottom-0 inset-x-0 h-16 bg-[#120e16]/95 backdrop-blur border-t border-[#1d1826] flex justify-around items-center px-2">
                <a href=""><House size={24} color="#ffc107"/></a>
                <a href=""><Search size={24} color="#a0a0b0"/></a>
                <a href=""><User size={24} color="#a0a0b0"/></a>
                <a href=""><Shield size={24} color="#a0a0b0"/></a>
            </nav>

            {/* -------------------------------------------------------------------------------- */}
        </main>
    );
}