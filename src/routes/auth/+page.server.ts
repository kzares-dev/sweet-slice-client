import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema.js";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { api } from "@/api.js";
import type { AuthResponse, ErrorMessage, LoginRequest, RegisterRequest } from "@/api.types.js";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions = {
	signin: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}
		const data = { email: formData.email, password: formData.password } as LoginRequest


		const signInResponse: AuthResponse | ErrorMessage = await api.login(data);

		if ('message' in signInResponse) {
			return fail(signInResponse.status, {
				error: signInResponse.message
			});
		}

		event.cookies.set('AuthorizationToken', `Bearer ${signInResponse.token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30 // 30 days day
		});
	
		return signInResponse;
	},
	signup: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.email || !formData.password || !formData.name) {
			return fail(400, {
				error: 'Missing email, password or username'
			});
		}
		const data = { email: formData.email, password: formData.password, name: formData.name } as RegisterRequest

		const registerResponse = await api.register(data);

		if ('message' in registerResponse) {
			return fail(registerResponse.status, {
				error: registerResponse.message
			});
		}

		event.cookies.set('AuthorizationToken', `Bearer ${registerResponse.token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30 // 30 days day
		});
	

		return registerResponse;

	}
} satisfies Actions;
