<script>
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '../clients/query';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
