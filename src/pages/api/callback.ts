import { NextApiRequest, NextApiResponse } from 'next';

let callbackURL = 'http://localhost:9000/api/v1/auth/google/callback';


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
                console.log(cookies);
                res.setHeader('Set-Cookie', cookies);
            }
            if (response.status === 200) {
                const data = await response.json();

                // // Forward the Set-Cookie header from the backend to the client
                // const cookies = response.headers.get('Set-Cookie');
                // if (cookies) {
                //     console.log(cookies);
                //     res.setHeader('Set-Cookie', cookies);
                // }

                // const setCookieHeaders = response.headers.raw()['set-cookie'];
                // if (setCookieHeaders) {
                //     res.setHeader('Set-Cookie', setCookieHeaders);
                // }

                // // Handle multiple Set-Cookie headers
                // const setCookieHeader = response.headers.get('set-cookie');
                // if (setCookieHeader) {
                //     const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
                //     console.log(cookies);
                //     res.setHeader('Set-Cookie', cookies);
                // }

                // // Handle Set-Cookie headers
                // const setCookieHeader = response.headers.get('set-cookie');
                // console
                // if (setCookieHeader) {
                //     const cookies = parseSetCookieHeader(setCookieHeader);
                //     console.log('Parsed cookies:', cookies);
                //     res.setHeader('Set-Cookie', cookies);
                // }

                //remove state-token cookie
                // console.log(res.headers);
                // res.setHeader('Set-Cookie', 'state-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');


                // Redirect to the home page
                // res.redirect(302, '/');
                res.status(response.status).json({
                    "message": "Logged in successfully",
                    "url": data.url,
                    "fulldata": data
                });
                // res.redirect(200, '/user');
                res.status(200).redirect(302, '/user');
            } else {
                if (response.status === 404) {
                    const data = await response.json();
                    res.status(response.status).json(data);
                } else {
                    res.status(response.status).json({
                        "message": "Authentication failed",
                    });
                }
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