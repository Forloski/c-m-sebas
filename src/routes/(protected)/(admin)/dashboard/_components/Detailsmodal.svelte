<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogFooter
	} from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Badge } from '$lib/components/ui/badge';
	import { FileText, CircleAlert, Check, Download, Eye } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	let open = false;
	let currentStep = 0;

	let clientData = {
		nomeCliente: '',
		cnpj: '',
		email: '',
		responsavel: '',
		siscebas: {
			login: '',
			senha: ''
		},
		numeroCNES: ''
	};

	const documents = [
		{ id: 1, name: 'Dados do Cliente', checkItems: [] },
		{ id: 2, name: 'DECLARAÇÃO ARTIGO 5º Decreto 11.791/2023', checkItems: ['Documento Válido'] },
		{ id: 3, name: 'DECLARAÇÃO ARTIGO 74 Decreto 11.791/2023', checkItems: ['Documento Válido'] },
		{ id: 4, name: 'CND FEDERAL', checkItems: ['Documento Válido'] },
		{ id: 5, name: 'CRF - FGTS', checkItems: ['Documento Válido'] },
		{
			id: 6,
			name: 'ESTATUTO',
			checkItems: [
				'Universalidade de atendimento',
				'Destinação patrimônio em caso de dissolução para entidade certificada ou pública'
			]
		},
		{ id: 7, name: 'ATA POSSE', checkItems: ['Validade ano anterior'] },
		{
			id: 8,
			name: 'RELATÓRIO DE ATIVIDADES',
			checkItems: [
				'Atendimentos realizados',
				'Número de pessoas atendidas',
				'Recursos financeiros envolvidos',
				'Assinatura presidente'
			]
		},
		{
			id: 9,
			name: 'CONTRATUALIZAÇÃO COM SUS ou Declaração do Gestor SUS',
			checkItems: [
				'Validade exercício integral',
				'Período',
				'Descrição',
				'Serviços gratuitos',
				'Descrição atividades (promoção à saúde)'
			]
		},
		{
			id: 10,
			name: 'BALANÇO PATRIMONIAL - BP',
			checkItems: [
				'Ativo e passivo circulante',
				'Não circulante',
				'Composição patrimônio líquido',
				'Provisões',
				'Depreciações',
				'Assinatura contador',
				'Assinatura presidente'
			]
		},
		{
			id: 11,
			name: 'DEMONSTRAÇÃO MUTAÇÃO PATRIMÔNIO LÍQUIDO - DMPL',
			checkItems: [
				'Saldo inicial e final exercício anterior',
				'Ajustes exercícios anteriores',
				'Destinação superávit e déficit',
				'Assinatura contador e presidente'
			]
		},
		{
			id: 12,
			name: 'DEMONSTRAÇÃO DE FLUXO DE CAIXA - DFC',
			checkItems: [
				'Montante de fluxo de caixa operacional',
				'Pagamentos de caixa para aquisição imobilizado',
				'Assinatura contador e presidente'
			]
		},
		{
			id: 13,
			name: 'DEMONSTRAÇÃO RESULTADO DO EXERCÍCIO - DRE',
			checkItems: [
				'Receita bruta anual discriminada e segregada por área',
				'Detalhamento despesas e custos, além despesas em gratuidade',
				'Superávit e déficit',
				'Comparativa com exercício anterior',
				'Valor do benefício fiscal usufruído',
				'Assinatura contador e presidente'
			]
		},
		{
			id: 14,
			name: 'NOTAS EXPLICATIVAS - NE',
			checkItems: [
				'Resumo das práticas contábeis',
				'Critério de apuração receitas, despesas, doações subvenções, convênios e aplicação de recursos',
				'Detalhamento, por elemento de despesa, em ações de gratuidade na saúde, e critério de apuração',
				'Detalhamento das ações em promoção à saúde (caso faça)',
				'Valor dos benefícios fiscais usufruídos ou não',
				'Assinatura contador e presidente'
			]
		}
	];

	let checkedItems = writable(documents.map(() => ({})));
	let observations = writable(documents.map(() => ''));

	function setStep(index: number) {
		currentStep = index;
	}

	function downloadDocument() {
		console.log('Baixando documento:', documents[currentStep].name);
	}

	function returnToClient() {
		open = false;
	}

	function concludeAnalysis() {
		open = false;
	}
</script>

<Button variant="ghost" size="icon" on:click={() => (open = true)}>
	<Eye class="h-4 w-4" />
</Button>

<Dialog bind:open>
	<DialogContent class="flex max-h-[80vh] max-w-5xl">
		<div class="w-1/3 rounded-l bg-gray-100 p-4">
			<h3 class="mb-4 text-lg font-semibold">Documentos</h3>
			<ScrollArea class="h-[calc(80vh-8rem)]">
				{#each documents as doc, index}
					<button
						class="mb-2 flex w-full items-center rounded p-2 text-left transition-colors hover:bg-gray-200"
						on:click={() => setStep(index)}
					>
						<div
							class={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-300'}`}
						>
							{#if index < currentStep}
								<Check class="h-4 w-4" />
							{:else if index === currentStep}
								<CircleAlert class="h-4 w-4" />
							{:else}
								{index + 1}
							{/if}
						</div>
						<span class={index === currentStep ? 'font-semibold' : ''}>{doc.name}</span>
					</button>
				{/each}
			</ScrollArea>
		</div>
		<div class="flex w-2/3 flex-col p-4">
			<DialogHeader>
				<DialogTitle>Verificar {documents[currentStep].name}</DialogTitle>
			</DialogHeader>
			<ScrollArea class="flex-grow">
				{#if currentStep === 0}
					<div class="my-4 space-y-4 pr-4">
						<div class="space-y-2">
							<Label for="nomeCliente">NOME CLIENTE</Label>
							<Input id="nomeCliente" bind:value={clientData.nomeCliente} />
						</div>
						<div class="space-y-2">
							<Label for="cnpj">CNPJ (Cnae SAÚDE)</Label>
							<Input id="cnpj" bind:value={clientData.cnpj} />
						</div>
						<div class="space-y-2">
							<Label for="email">EMAIL</Label>
							<Input id="email" type="email" bind:value={clientData.email} />
						</div>
						<div class="space-y-2">
							<Label for="responsavel">RESPONSÁVEL</Label>
							<Input id="responsavel" bind:value={clientData.responsavel} />
						</div>
						<div class="space-y-2">
							<Label for="siscebas-login">SISCEBAS (login)</Label>
							<Input id="siscebas-login" bind:value={clientData.siscebas.login} />
						</div>
						<div class="space-y-2">
							<Label for="siscebas-senha">SISCEBAS (senha)</Label>
							<Input id="siscebas-senha" type="password" bind:value={clientData.siscebas.senha} />
						</div>
						<div class="space-y-2">
							<Label for="numeroCNES">NÚMERO DO CNES</Label>
							<Input id="numeroCNES" bind:value={clientData.numeroCNES} />
						</div>
					</div>
				{:else}
					<div class="my-4 space-y-4 pr-4">
						<FileText class="mb-2 h-12 w-12" />
						<Button variant="outline" on:click={downloadDocument} class="mb-4">
							<Download class="mr-2 h-4 w-4" />
							Baixar Documento
						</Button>
						<p>Por favor, verifique se o documento está válido:</p>
						{#each documents[currentStep].checkItems as item}
							<div class="mb-2 flex items-center space-x-2">
								<Checkbox id={item} bind:checked={$checkedItems[currentStep][item]} />
								<label for={item}>{item}</label>
							</div>
						{/each}
						<div class="mt-4 space-y-2">
							<Label for="observations">Observações</Label>
							<Textarea
								id="observations"
								bind:value={$observations[currentStep]}
								placeholder="Insira suas observações aqui..."
							/>
						</div>
					</div>
				{/if}
			</ScrollArea>
			<Separator class="my-4" />
			<DialogFooter class="flex-col items-stretch sm:flex-row sm:justify-between">
				<div class="mb-2 flex-1 sm:mb-0">
					<Badge variant="secondary" class="bg-blue-100 text-blue-800">Pendente de Análise</Badge>
				</div>
				<div class="flex justify-end space-x-2">
					<Button variant="outline" on:click={returnToClient}>Retornar para o Cliente</Button>
					<Button on:click={concludeAnalysis}>Concluir Análise</Button>
				</div>
			</DialogFooter>
		</div>
	</DialogContent>
</Dialog>
