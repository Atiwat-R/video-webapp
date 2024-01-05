import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
  
        // Obtain request data
        const { name, email, password } = req.body;
  
        // Find if the user already exists (via matching email)
        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }
  
        // From this point on, we move on to Create New User

        // Hash & Salt password
        const hashedPassword = await bcrypt.hash(password, 12);
  
        // Create User
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })

        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }



