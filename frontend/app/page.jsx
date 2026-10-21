import { getHomeData } from '../lib/api';
import { 
    HeroSection, 
    TickerSection, 
    StatsSection, 
    ProgramsSection, 
    OutcomesSection, 
    TestimonialsSection, 
    CtaBannerSection 
} from '../components/LandingSections';
import SkillsCarousel from '../components/SkillsCarousel';
import CourseCatalog from '../components/CourseCatalog';
import WhyUsAccordion from '../components/WhyUsAccordion';
import PricingGrid from '../components/PricingGrid';
import FaqAccordion from '../components/FaqAccordion';

export default async function HomePage() {
    const { thumbnails, courses, reviews } = await getHomeData();

    return (
        <>
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Marquee Ticker */}
            <TickerSection />

            {/* 3. Stats & Floating Pills */}
            <StatsSection />

            {/* 4. Featured Tracks */}
            <ProgramsSection />

            {/* 5. Essential Skills Carousel (Side-by-Side Eductix Design) */}
            <SkillsCarousel thumbnails={thumbnails} />

            {/* 6. Dynamic Courses with Live Filters */}
            <CourseCatalog initialCourses={courses} />

            {/* 7. Why Eductix / Outcomes Accordion */}
            <WhyUsAccordion />

            {/* 8. Core Outcomes Timeline */}
            <OutcomesSection />

            {/* 9. Student Testimonials */}
            <TestimonialsSection reviews={reviews} />

            {/* 10. Pricing Plans */}
            <PricingGrid />

            {/* 11. FAQ Accordion */}
            <FaqAccordion />

            {/* 12. Bottom CTA Banner */}
            <CtaBannerSection />
        </>
    );
}
