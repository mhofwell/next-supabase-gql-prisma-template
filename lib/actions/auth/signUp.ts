'use server';
import { headers } from 'next/headers';
import { createClient } from '../../supabase/server';
import { redirect } from 'next/navigation';

export default async function signUp(formData: FormData) {
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // change this to any metadata we want about the user!
            data: {
                username: 'Dragonfire',
                age: 12,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
}
