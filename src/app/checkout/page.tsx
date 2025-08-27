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
    sParams.append('return-to', `/checkout?${existingQueryString}`);
    if (!session) {
        redirect(`/login?${sParams}`)
    }
    return <CustomerForm />;
}