import { z } from 'zod';

export const firstFormSchema = z.object({
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

export type FirstFormSchema = typeof firstFormSchema;
