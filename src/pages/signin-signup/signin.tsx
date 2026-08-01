import { useNavigate } from 'react-router';

type SignInForm = {
    email: string;
    password: string;
}

export const SignInPage = () => {
    const navegate = useNavigate();

    const onSubmit = async (dataForm: SignInForm) => {
        navegate("/dashboard");
    }

    const onError = (err: any) => {
        Object.values(err).map((error: any) => {
            window.alert(error.message);
        });
    }

    return (
        <div className="bg-[#120e16] flex items-center justify-center p-4 w-full h-dvh">
            <div className="bg-[#1d1826] rounded-xl space-y-6 p-8 w-full max-w-sm min-w-[300px]" >
                <div className="text-center space-y-2">
                    <h1 className="text-[#ffc107] text-2xl font-bold tracking-tight cursor-default">Welcome back</h1>
                    <p className="text-[#a0a0b0] text-sm cursor-default">Enter your credentials to access your account</p>
                </div>

                <form className="space-y-4">
                    <input className="bg-[#120e16] text-[#FFFFFF] h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-[#a0a0b0] focus:ring-2 focus:ring-[#ffc107] focus:outline-none" placeholder="Email" type="text" required/>
                    <input className="bg-[#120e16] text-[#FFFFFF] h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-[#a0a0b0] focus:ring-2 focus:ring-[#ffc107] focus:outline-none" placeholder="Password" type="text" required/>
                    <button className="rounded-md text-sm font-medium transition-colors hover:cursor-pointer focus-visible:ring-2 bg-[#ffc107] text-[#120e16] hover:bg-[#ffc107]/90 h-10 px-4 py-2 w-full" type="submit">Log In</button>
                </form>

                <p className="text-[#a0a0b0] text-center text-xs uppercase cursor-default">Or continue with</p>

                <div className="flex justify-between gap-4">
                    <button className="rounded-md text-[#FFFFFF] text-sm font-medium bg-[#120e16] hover:cursor-pointer h-10 px-4 py-2 w-full">Google</button>
                    <button className="rounded-md text-[#FFFFFF] text-sm font-medium bg-[#120e16] hover:cursor-pointer h-10 px-4 py-2 w-full">X.com</button>
                </div>

                <p className="text-center text-sm text-[#a0a0b0] cursor-default">Don't have an account?<a href="./signup.tsx" className="text-[#ffc107] font-medium hover:underline"> Sign up</a></p>
            </div>
        </div>
    );
}