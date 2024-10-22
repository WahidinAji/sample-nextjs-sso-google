import { NextApiRequest, NextApiResponse } from 'next';

let callbackURL = 'http://localhost:9000/api/v1/auth/google/signup';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, state } = req.query;

    if (req.method === 'GET') {
        try {
            let cookie = req.headers.cookie;
            const response = await fetch(callbackURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': 'token',
                    'Cookie': cookie || '',
                },
                body: JSON.stringify({ code, state }),
                credentials: 'include',
            });

            const cookies = response.headers.getSetCookie();
            if (cookies) {
                res.setHeader('Set-Cookie', cookies);
            }

            if(response.status === 204){
                res.status(response.status).json({
                    "message": "CHEK PIIUN",
                });
            }
            
            const data = await response.json();
            if (response.status === 200) {

                res.status(response.status).json({
                    "message": "Logged in successfully",
                    "url": data.url,
                    "fulldata": data
                });
            } else if (response.status === 404) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else if (response.status === 409) {
                res.status(response.status).json({
                    "message": "Already Registered",
                    "data": data
                });
            } else {
                res.status(response.status).json({
                    "message": "Authentication failed",
                });
            }
        } catch (error) {
            console.error('Error in callback:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        console.log("apa dia bang versi 2");
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}