<script>
	import { ShoppingCart, House, Table } from 'lucide-svelte';
	import SidebarItem from './_components/SidebarItem.svelte';
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
		<div
			class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
		>
			<House class="h-4 w-4 transition-all group-hover:scale-110" />
			<span class="sr-only">Acme Inc</span>
		</div>
		<SidebarItem path="/home" tooltip="Dashboard">
			<Table class="h-5 w-5" />
		</SidebarItem>
		<SidebarItem path="/test" tooltip="Dashboard">
			<ShoppingCart class="h-5 w-5" />
		</SidebarItem>
	</nav>
</aside>
<slot />
