import type { AuthResponse } from "@/api.types";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: Partial<AuthResponse>;
		}
	}
}

export { };