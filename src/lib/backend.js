import { vars } from '$lib/variables';

/**
 * Calls the backend routes
 * @param {String} route The route name (/x/y/...)
 * @param {String} method The HTTP method
 * @param {JSON} body The HTTP Body (optional)
 * @param {JSON} headers The HTTP Headers (optional)
 * @returns The JSON response from the backend
 */
export async function callBackend(route, method, body, headers) {
    body = JSON.stringify(body);

    headers = {
        ...headers,
        'Content-Length': body.length,
        'Content-Type': 'application/json',
    };

    const url = vars.baseApiUrl + route;
    const res = await fetch(url, {
        method,
        headers,
        body,
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

/**
 * Get the role of a user as a string
 * @param {Number} role_id The id of the role
 * @returns A string with the name of the role
 */
export function role(role_id) {
    switch (Number(role_id)) {
        case 0:
            return 'admin';
        case 1:
            return 'professor';
        case 2:
            return 'student';
    }
}
