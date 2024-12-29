import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/auth";


type IUser = {
  id: string; // Corresponds to _id in MongoDB
  name: string;
  email: string;
  profilePhoto: string;
  designation: string;
  address: string;
  description: string;
};


export interface IUserProviderValues {
  user: IUser | null;
}

// Create context with IUserProviderValues type
export const UserContext = createContext<IUserProviderValues | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Function to fetch and set the current user
  const handleUser = async () => {
    const fetchedUser = await getCurrentUser();
    setUser(fetchedUser);
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }
  return context as IUserProviderValues;
};

export default UserProvider;
