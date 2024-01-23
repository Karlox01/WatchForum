import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        let isMounted = true; // Flag to track if the component is mounted

        const handleMount = async () => {
            try {
                // Attempt to refresh the authentication token
                await axios.post("/dj-rest-auth/token/refresh/");

                // Check if the user is still logged in after refresh
                const response = await axios.get("/dj-rest-auth/user/");
                const userIsLoggedIn = response.status === 200;

                // If the user is logged in and the status is "loggedIn", redirect to "/"
                if (isMounted && userIsLoggedIn && userAuthStatus === "loggedIn") {
                    history.push("/");
                }
            } catch (err) {
                // If token refresh fails or user is not logged in, redirect to "/"
                if (isMounted && userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };

        // Call the function on mount
        handleMount();

        // Cleanup function
        return () => {
            isMounted = false; // Set the flag to false when the component is unmounted
        };
    }, [history, userAuthStatus]);
};
