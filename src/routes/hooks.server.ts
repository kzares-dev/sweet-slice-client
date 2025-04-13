import type { Handle } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private'
import jwt from 'jsonwebtoken';
import { api } from '@/api';


const handle: Handle = async ({ event, resolve }) => {
    const authCookie = event.cookies.get('AuthorizationToken');

    if (authCookie) {
        // Remove Bearer prefix
        const token = authCookie.split(' ')[1];

        const sessionUser = await api.verifyToken(token);
        if('message' in sessionUser) {
            // failed to load user
        }else{
            event.locals.user = sessionUser;
        }
    }

    return await resolve(event);
};

export { handle };
