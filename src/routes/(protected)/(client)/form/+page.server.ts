import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	file: z
		.instanceof(File)
		.nullable()
		.refine((file) => file !== null, {
			message: 'Por favor, selecione um arquivo.'
		}),
	checkItems: z
		.array(
			z.object({
				id: z.number(),
				label: z.string(),
				checked: z.boolean()
			})
		)
		.refine((items) => items.every((item) => item.checked), {
			message: 'Por favor, verifique todos os itens da lista.'
		})
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	// Always return { form } in load functions
	return { form };
};
