import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Ezuca – Online Courses & Skill Development',
    description: 'Build in-demand tech and creative skills that shape your career. Guided pathways, portfolio projects, and expert mentorship.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
