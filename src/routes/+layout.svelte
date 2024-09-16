<script>
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '../clients/query';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	export const prerender = true;
	export const trailingSlash = 'always';
</script>

<ModeWatcher />
<Toaster />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
