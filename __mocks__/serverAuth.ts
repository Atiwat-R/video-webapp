import { NextApiRequest } from 'next';
import { getSession } from './next-auth/react';

const mockServerAuth = async (req: NextApiRequest) => {
  // Mock implementation for serverAuth function
  const session = await getSession({ req });
  if (!session?.user?.email) throw new Error("Not Signed In");

  // Mock implementation for fetching user data
  const currentUser = {
    id: 1,
    email: session.user.email,
    // Add any other relevant user data here
  };

  return { currentUser };
};

export default mockServerAuth;