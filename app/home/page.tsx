import AuthButton from '@/components/AuthButton';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <div className="py-6 font-bold bg-purple-950 text-center">
                    {`Welcome ${user.user_metadata.username}`}
                </div>
                {/* Nav */}
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <div>Avatar/Logo</div>
                        <AuthButton />
                    </div>
                </nav>
            </div>

            {/* Main */}
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <Header />
                <main className="flex-1 flex justify-center  gap-6">
                    <h2 className="font-bold text-4xl mb-4">Test</h2>
                </main>
            </div>

            {/* Footer */}
            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Powered by{' '}
                    <a
                        href=""
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        The Hof
                    </a>
                </p>
            </footer>
        </div>
    );
}
