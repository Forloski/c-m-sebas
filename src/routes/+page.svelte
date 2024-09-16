<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import BridgeImage from '$lib/images/bridge-black-white.webp';
	import { goto } from '$app/navigation';
	import { createQuery } from '@tanstack/svelte-query';
	import { getViaCep } from './_api/viacep';

	const query = createQuery({
		queryKey: ['todos'],
		queryFn: () => getViaCep()
	});

	const handleClick = () => {
		goto('/form');
	};

	export const toImageUrl = (processedImagePath: string) =>
		`url('${processedImagePath.slice(1).replaceAll('\\', '/')}')`;
</script>

<div
	style="background-image: {toImageUrl(
		BridgeImage
	)};  background-position: center; background-size: cover"
	class="flex min-h-screen flex-row items-center justify-center"
>
	<Card.Root class="z-10 w-full max-w-sm">
		<Card.Header class="grid gap-4">
			<Card.Title class="text-center text-2xl font-bold">Cordeiro e Moura: CEBAS</Card.Title>
			<Card.Description class="text-center"
				>Entre com suas credenciais para acessar</Card.Description
			>
		</Card.Header>
		<Card.Content class="my-2 grid gap-4">
			<div class="grid gap-2 space-y-4">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="email@exemplo.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Senha</Label>
				<Input id="password" type="password" required />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button on:click={handleClick} class="w-full">Entrar</Button>
		</Card.Footer>
	</Card.Root>
</div>
