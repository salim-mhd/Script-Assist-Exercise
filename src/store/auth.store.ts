import { create } from "zustand";

// user InterFace
interface UserDetails {
  email: string;
  password: string;
  userName: string;
  image: string;
}

// Defining the AuthState type
type AuthState = {
  token: string | null;
  userDetails: UserDetails | null;
  isAuthenticated: boolean;
  login: (data: { token: string; userDetails: UserDetails }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  // Retrieve stored userDetails from localStorage
  const storedUserDetails = localStorage.getItem("userDetails");
  const parsedUserDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;

  return {
    token: localStorage.getItem("token"), // Fetch token from localStorage if available
    userDetails: parsedUserDetails, // Fetch and parse userDetails if available
    isAuthenticated: !!localStorage.getItem("token"), // Check if token exists in localStorage

    // Updated login function that accepts both token and userDetails
    login: (data: { token: string; userDetails: UserDetails }) => {
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("userDetails", JSON.stringify(data.userDetails)); // Store userDetails in localStorage
      set({
        token: data.token,
        userDetails: data.userDetails,
        isAuthenticated: true, // Set isAuthenticated to true when logged in
      });
    },

    // Logout function clears token and userDetails
    logout: () => {
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("userDetails"); // Remove userDetails from localStorage
      set({
        token: null,
        userDetails: null, // Clear userDetails when logged out
        isAuthenticated: false, // Set isAuthenticated to false when logged out
      });
    },
  };
});
