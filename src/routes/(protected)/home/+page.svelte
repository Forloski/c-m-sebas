<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { createQuery } from '@tanstack/svelte-query';
</script>

<div class="flex min-h-screen flex-row items-center justify-center bg-white">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="mt-1 flex justify-center text-2xl">Entrar</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="email@exemplo.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Senha</Label>
				<Input id="password" type="password" placeholder="Senha" required />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full">Sign in</Button>
		</Card.Footer>
	</Card.Root>
</div>
