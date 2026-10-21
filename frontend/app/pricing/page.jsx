import PricingGrid from '../../components/PricingGrid';
import FaqAccordion from '../../components/FaqAccordion';

export const metadata = {
    title: 'Subscription Plans – Ezuca',
    description: 'Flexible monthly and yearly subscription plans with unrestricted course access and 1-on-1 mentorship.',
};

export default function PricingPage() {
    return (
        <div style={{ paddingTop: '20px' }}>
            <PricingGrid />
            <FaqAccordion />
        </div>
    );
}
