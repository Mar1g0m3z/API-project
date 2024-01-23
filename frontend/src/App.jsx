// Import necessary dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation-bonus";
import LandingPage from "./components/LandingPage/LandingPage";

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />

			{isLoaded && <Outlet />}
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				index: true,
				path: "/",
				element: <LandingPage />,
			},

			{
				path: "*",
				element: <h1>Page Not Found</h1>,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
