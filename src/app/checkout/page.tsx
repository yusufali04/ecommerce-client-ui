import { getSession } from '@/lib/session';
import CustomerForm from './components/customerForm';
import { redirect } from 'next/navigation';

export default async function Checkout({
    searchParams,
}: {
    searchParams: { restaurant: string };
}) {
    const session = await getSession();
    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();
    if (!session) {
        redirect(`/login?${existingQueryString}`)
    }

    sParams.append('return-to', `/checkout?${existingQueryString}`);
    return <CustomerForm />;
}