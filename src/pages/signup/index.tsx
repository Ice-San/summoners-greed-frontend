export const SignUpPage = () => {
    return (
        <main className="bg-[#120e16] flex items-center justify-center p-4 w-full h-dvh">
            <section className="bg-[#1d1826] rounded-xl space-y-6 p-8 w-full max-w-sm min-w-75" >
                <div className="text-center space-y-2">
                    <h1 className="text-[#ffc107] text-2xl font-bold tracking-tight cursor-default">Create an account</h1>
                    <p className="text-[#a0a0b0] text-sm cursor-default">Join the Summoner's Greed community</p>
                </div>

                <form className="space-y-4">
                    <input className="bg-[#120e16] text-[#FFFFFF] h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-[#a0a0b0] focus:ring-2 focus:ring-[#ffc107] focus:outline-none" placeholder="Email" type="text" required/>
                    <input className="bg-[#120e16] text-[#FFFFFF] h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-[#a0a0b0] focus:ring-2 focus:ring-[#ffc107] focus:outline-none" placeholder="Tag (e.g. king)" type="text" required/>
                    <input className="bg-[#120e16] text-[#FFFFFF] h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-[#a0a0b0] focus:ring-2 focus:ring-[#ffc107] focus:outline-none" placeholder="Password" type="text" required/>
                    <button className="rounded-md text-sm font-medium transition-colors hover:cursor-pointer focus-visible:ring-2 bg-[#ffc107] text-[#120e16] hover:bg-[#ffc107]/90 h-10 px-4 py-2 w-full" type="submit">Sign Up</button>
                </form>

                <p className="text-[#a0a0b0] text-center text-xs uppercase cursor-default">Or continue with</p>

                <div className="flex justify-between gap-4">
                    <button className="rounded-md text-[#FFFFFF] text-sm font-medium bg-[#120e16] hover:cursor-pointer h-10 px-4 py-2 w-full">Google</button>
                    <button className="rounded-md text-[#FFFFFF] text-sm font-medium bg-[#120e16] hover:cursor-pointer h-10 px-4 py-2 w-full">X.com</button>
                </div>

                <p className="text-center text-sm text-[#a0a0b0] cursor-default">Already have an account?<a href="./signin" className="text-[#ffc107] font-medium hover:underline"> Log in</a></p>
            </section>
        </main>
    );
}