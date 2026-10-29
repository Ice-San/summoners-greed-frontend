import { MessageSquare, Heart, Share2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type CommentProps = {
    subcomment: boolean;
    children?: ReactNode;
};

export const Comment = ({ subcomment, children }: CommentProps) => {
    const [show, setShow] = useState(false);

    if (subcomment) {
        return (
            <div className="p-4 flex gap-4 cursor-default hover:bg-[#1d1826]/30 transition-colors">
                <div className="flex shrink-0 w-10"></div>
                <div className="bg-[#1d1826] rounded-full flex justify-center items-center shrink-0 text-[#ffc107] font-bold w-7 h-7 cursor-pointer">
                    U
                </div>
                <div className="bg-[#1d182680] rounded-md p-3 flex-1 flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <span className="font-bold hover:underline cursor-pointer">The King</span>
                        <span className="text-[#a0a0b0] text-sm">· 2h ago</span>
                    </div>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
                        Finally unlocked the Slime King level 400! Now my setup at the front line is completely unbreakable. Any advice on the best totems to buff him further?
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 border-y border-[#1d1826] flex gap-4 cursor-default hover:bg-[#1d1826]/30 transition-colors">
            <div className="bg-[#1d1826] rounded-full flex justify-center items-center shrink-0 text-[#ffc107] font-bold w-10 h-10 cursor-pointer">
                K
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <span className="font-bold hover:underline cursor-pointer">The King</span>
                    <span className="text-[#a0a0b0] text-sm">@theking</span>
                    <span className="text-[#a0a0b0] text-sm">· 2h ago</span>
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
                    Finally unlocked the Slime King level 400! Now my setup at the front line is completely unbreakable. Any advice on the best totems to buff him further?
                </p>
                <div className="flex items-center justify-between sm:justify-start sm:gap-6 text-[#a0a0b0] text-xs mt-2">
                    <button className="flex items-center gap-2 hover:text-[#ef4444] cursor-pointer">
                        <Heart size={16} />
                        <span>24</span>
                    </button>
                    <button onClick={() => {setShow(!show)}} className="flex items-center gap-2 hover:text-[#ffc107] cursor-pointer">
                        <MessageSquare size={16} />
                        <span>3</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#9b5de5] cursor-pointer">
                        <Share2 size={16} />
                    </button>
                </div>
                {show && 
                    <>
                        <div className="mt-4 border-t border-[#1d1826] pt-4">
                            <div className="flex gap-4">
                                <input type="text" placeholder="Post your reply" className="bg-[#1d182680] text-sm rounded-md flex-1 p-2 focus:outline-3 focus:outline-[#ffc107]"/>
                                <button className="bg-[#ffc107] rounded-md text-sm font-bold text-[#120e16] hover:bg-[#ffc107]/90 px-6 py-2 cursor-pointer">
                                    Post
                                </button>
                            </div>
                        </div>

                        {children}
                    </>
                }
            </div>
        </div>
    );
}