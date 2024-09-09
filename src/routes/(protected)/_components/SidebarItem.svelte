<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let path: string;
	export let tooltip: string;

	const pathname = $page.url.pathname;
	const disabled = pathname === path;

	console.log(disabled);
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			size="icon"
			on:click={() => goto(path)}
			disabled={disabled || undefined}
		>
			<slot />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right">{tooltip}</Tooltip.Content>
</Tooltip.Root>
