// This store manages all the data related to the authenticated user.
// It will automatically refresh the jwt token after login, and exposes different functions
import { writable } from 'svelte/store';

export const auth = writable({
    user: {
        role: 0,
    },
    jwt: null,
});

// Writable/Readable ?
// Sync to local storage
// Store only jwt's ?
// Refresh jwt's automatically
// Expose functions to manage user auth state?
