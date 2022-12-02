// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		getSession: import("@lucia-auth/sveltekit").GetSession;
		getSessionUser: import("@lucia-auth/sveltekit").GetSessionUser;
		setSession: import("@lucia-auth/sveltekit").SetSession;
	}
	interface PageData { }
	// interface Platform {}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("$lib/server/lucia").Auth;
	interface UserAttributes {
		isAdmin: boolean;
		username: string;
	};
}