import CustomerForm from './components/customerForm';

export default async function Checkout({
    searchParams,
}: {
    searchParams: { restaurant: string };
}) {

    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.append('return-to', `/checkout?${existingQueryString}`);
    return <CustomerForm />;
}