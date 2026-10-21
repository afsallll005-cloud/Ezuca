import { getCourses } from '../../lib/api';
import CourseCatalog from '../../components/CourseCatalog';

export const metadata = {
    title: 'Explore Courses – Ezuca Learning Platform',
    description: 'Browse all hands-on courses in Web Development, AI, Data Science, and UI/UX Design.'
};

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '80vh' }}>
            <CourseCatalog initialCourses={courses} />
        </div>
    );
}
