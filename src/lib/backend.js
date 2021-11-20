import { vars } from '$lib/variables';

export async function getDataFromBE(route, method, body, headers) {
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
