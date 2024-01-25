// Import necessary dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation-bonus";
import LandingPage from "./components/LandingPage/LandingPage";
import SpotPages from "./components/SpotPages/SpotPages";
import CreateSpotForm from "./components/CreateSpot/CreateSpotForm";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";
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
				index: true,
				path: "/spots/:spotId",
				element: <SpotPages />,
			},
			{
				index: true,
				path: "/spots/new",
				element: <CreateSpotForm title="Create Spot" />,
			},
			{ index: true, path: "/spots/current", element: <ManageSpots /> },
			{ index: true, path: "/spots/:spotId/edit", element: <UpdateSpot /> },
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
