import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function LandingPageLayout() {
	return (
		<>
			<Link to={'/login'}>Login</Link>
			<Outlet/>
			<Footer />
		</>
	);
}
