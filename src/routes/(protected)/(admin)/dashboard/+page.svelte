<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		LayoutDashboard,
		UserPlus,
		Menu,
		CircleAlert,
		Clock,
		LogOut,
		ChevronRight,
		ChevronLeft,
		Filter
	} from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';
	import { Sheet, SheetTrigger, SheetContent } from '$lib/components/ui/sheet';
	import { derived, writable } from 'svelte/store';
	import Detailsmodal from './_components/Detailsmodal.svelte';

	let sidebarOpen = writable(false);
	let sidebarExpanded = writable(true);
	let selectedDetails = writable(null);
	let filterValue = writable('');
	let filterColumn = writable('nome');
	let currentPage = writable(1);
	let itemsPerPage = writable(5);
	let showFilterDropdown = writable(false);

	const menuItems = [
		{ icon: LayoutDashboard, label: 'Painel' },
		{ icon: UserPlus, label: 'Criar Usuário' }
	];

	const statsData = [
		{ title: 'Fim de SLA', value: '12', icon: Clock, color: 'text-yellow-500' },
		{ title: 'Novos', value: '25', icon: CircleAlert, color: 'text-green-500' },
		{ title: 'Sem Atendimento', value: '5', icon: CircleAlert, color: 'text-red-500' }
	];

	const data = [
		{
			detalhes: {
				tipoSaude: 'TIPO SAÚDE - 60% SUS',
				nomeCliente: 'João Silva',
				cnpj: '12.345.678/0001-90',
				email: 'joao.silva@example.com',
				responsavel: 'Maria Santos',
				siscebas: {
					login: 'joao.silva',
					senha: 'senha123'
				},
				numeroCNES: '1234567'
			},
			nome: 'João Silva',
			dataSolicitacao: '01/05/2023',
			dataEnvio: '02/05/2023',
			tempoStatus: '1 dia',
			status: 'Documentos Pendentes'
		}
		// Add more table data with the new details structure
		// ...
	];

	let tableData = writable(data);

	function filterData(data: any, column: any, value: any) {
		return data.filter((row: any) =>
			String(row[column]).toLowerCase().includes(value.toLowerCase())
		);
	}

	$: filteredTableData = derived(
		[tableData, filterColumn, filterValue],
		([$tableData, $filterColumn, $filterValue]) =>
			filterData($tableData, $filterColumn, $filterValue)
	);

	$: paginatedData = derived(
		[filteredTableData, currentPage, itemsPerPage],
		([$filteredTableData, $currentPage, $itemsPerPage]) =>
			$filteredTableData.slice(($currentPage - 1) * $itemsPerPage, $currentPage * $itemsPerPage)
	);

	$: totalPages = derived(
		[filteredTableData, itemsPerPage],
		([$filteredTableData, $itemsPerPage]) => Math.ceil($filteredTableData.length / $itemsPerPage)
	);

	function toggleSidebar() {
		$sidebarExpanded = !$sidebarExpanded;
	}

	function handleSheetOpenChange(event: any) {
		sidebarOpen = event.detail;
	}

	function openDetailsModal(details: any) {
		selectedDetails = details;
	}

	function handleFilterChange(event: any) {
		filterValue = event.target.value;
		$currentPage = 1;
	}

	function handleFilterColumnChange(value: any) {
		filterColumn = value;
		$currentPage = 1;
	}

	function nextPage() {
		if (currentPage < totalPages) {
			$currentPage++;
		}
	}

	function prevPage() {
		if ($currentPage > 1) {
			$currentPage--;
		}
	}

	function toggleFilterDropdown() {
		$showFilterDropdown = !showFilterDropdown;
	}

	function getStatusBadgeVariant(status: any) {
		switch (status.toLowerCase()) {
			case 'documentos pendentes':
				return 'bg-yellow-500 text-white';
			case 'pendente de análise':
				return 'bg-orange-500 text-white';
			case 'aguardando correção':
				return 'bg-red-500 text-white';
			case 'pendente de protocolo':
				return 'bg-purple-500 text-white';
			case 'protocolado (deferido)':
				return 'bg-green-500 text-white';
			case 'protocolado (indeferido)':
				return 'bg-red-700 text-white';
			case 'protocolado (recursal)':
				return 'bg-blue-500 text-white';
			default:
				return 'bg-gray-500 text-white';
		}
	}
</script>

<div class="flex h-screen bg-gray-100">
	<!-- Sidebar for large screens -->
	<aside
		class="flex flex-col bg-white shadow-md transition-all duration-300 ease-in-out {$sidebarExpanded
			? 'w-48'
			: 'w-20'}"
	>
		<div class="flex items-center justify-between border-b p-4">
			{#if $sidebarExpanded}
				<span class="text-2xl font-bold text-blue-600">CEBAS</span>
			{/if}
			<Button variant="ghost" size="icon" on:click={toggleSidebar}>
				{#if $sidebarExpanded}
					<ChevronLeft class="h-4 w-4" />
				{:else}
					<ChevronRight class="h-4 w-4" />
				{/if}
			</Button>
		</div>
		<nav class="flex-1 p-4">
			{#each menuItems as item}
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							class="mb-2 w-full justify-start {$sidebarExpanded ? '' : 'px-2'}"
						>
							<svelte:component this={item.icon} class="h-4 w-4 {$sidebarExpanded ? 'mr-2' : ''}" />
							{#if $sidebarExpanded}
								{item.label}
							{/if}
						</Button>
					</TooltipTrigger>
					<TooltipContent side="right">
						{item.label}
					</TooltipContent>
				</Tooltip>
			{/each}
		</nav>
		<div class="border-t p-4">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src="/images/user.png" alt="Usuário" />
						<AvatarFallback>US</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<LogOut class="mr-2 h-4 w-4" />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</aside>

	<!-- Main content -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Dashboard content -->
		<main class="flex-1 overflow-y-auto p-4">
			<!-- Statistic cards -->
			<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
				{#each statsData as stat}
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
							<svelte:component this={stat.icon} class="h-4 w-4 {stat.color}" />
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">{stat.value}</div>
						</CardContent>
					</Card>
				{/each}
			</div>

			<!-- Table -->
			<Card>
				<CardHeader>
					<CardTitle>Documentos Recentes</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="mb-4 flex gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="outline">
									<Filter class="mr-2 h-4 w-4" />
									Filtrar
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<div class="p-2">
									<Select>
										<SelectTrigger class="mb-2 w-[180px]">
											<SelectValue placeholder="Selecionar coluna" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="nome">Nome</SelectItem>
											<SelectItem value="dataSolicitacao">Data de Solicitação</SelectItem>
											<SelectItem value="dataEnvio">Data de Envio</SelectItem>
											<SelectItem value="tempoStatus">Tempo nesse status</SelectItem>
											<SelectItem value="status">Status</SelectItem>
										</SelectContent>
									</Select>
									<Input
										placeholder="Filtrar..."
										value={filterValue}
										on:input={handleFilterChange}
									/>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div class="min-h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Detalhes</TableHead>
									<TableHead>Nome</TableHead>
									<TableHead>Data de Solicitação</TableHead>
									<TableHead>Data de Envio</TableHead>
									<TableHead>Tempo nesse status</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{#each $paginatedData as row}
									<TableRow>
										<TableCell>
											<Detailsmodal />
										</TableCell>
										<TableCell>{row.nome}</TableCell>
										<TableCell>{row.dataSolicitacao}</TableCell>
										<TableCell>{row.dataEnvio}</TableCell>
										<TableCell>{row.tempoStatus}</TableCell>
										<TableCell>
											<Badge class={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
										</TableCell>
									</TableRow>
								{/each}
							</TableBody>
						</Table>
					</div>
					<div class="mt-4 flex items-center justify-between">
						<div>
							Mostrando {($currentPage - 1) * $itemsPerPage + 1} a {Math.min(
								$currentPage * $itemsPerPage,
								$filteredTableData.length
							)} de {$filteredTableData.length} entradas
						</div>
						<div class="flex gap-2">
							<Button variant="outline" size="sm" on:click={prevPage} disabled={$currentPage === 1}
								>Anterior</Button
							>
							<Button
								variant="outline"
								size="sm"
								on:click={nextPage}
								disabled={currentPage === totalPages}>Próxima</Button
							>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	</div>
</div>
