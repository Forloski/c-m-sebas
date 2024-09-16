<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Upload, Check, X, FileText, Info } from 'lucide-svelte';

	let currentStep = 0;
	const totalSteps = 8;

	const steps = [
		'Introdução',
		'BALANÇO PATRIMONIAL - BP',
		'DEMONSTRAÇÃO RESULTADO DO EXERCÍCIO -DRE comparativa',
		'NOTAS EXPLICATIVAS - NE',
		'RELATÓRIO DE ATIVIDADES (Minuta Padrão de CT)',
		'ESTATUTO',
		'ATA POSSE',
		'Revisão'
	];

	let uploadedFiles: { [key: number]: File | null } = {
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null
	};

	$: allFilesUploaded = Object.values(uploadedFiles).every((file) => file !== null);

	function setStep(step: number) {
		if (step >= 0 && step <= totalSteps) {
			currentStep = step;
		}
	}

	function nextStep() {
		if (currentStep < totalSteps - 1) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function handleFileUpload(event: DragEvent | Event, step: number) {
		event.preventDefault();
		let files: FileList | null;

		if (event instanceof DragEvent) {
			files = event.dataTransfer?.files || null;
		} else {
			files = (event.target as HTMLInputElement).files;
		}

		if (files && files.length > 0) {
			const file = files[0];
			if (file.type === 'application/pdf') {
				uploadedFiles[step] = file;
			} else {
				alert('Por favor, selecione apenas arquivos PDF.');
			}
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}
</script>

<Card class="mx-auto w-full max-w-6xl p-4">
	<CardHeader>
		<CardTitle>Formulário de Upload de Arquivos</CardTitle>
		<CardDescription>Complete todos os 8 passos para finalizar o processo</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="flex flex-col gap-4 sm:flex-row">
			<div class="sm:w-1/4">
				<Card class="h-full">
					<CardHeader class="p-3">
						<CardTitle class="text-lg">Etapas de Upload</CardTitle>
						<CardDescription class="text-sm"
							>Progresso: {currentStep} de {totalSteps - 1}</CardDescription
						>
					</CardHeader>
					<CardContent class="p-3">
						<ol class="relative ml-3 border-l border-muted text-sm">
							{#each steps as step, index}
								<li class="mb-4 ml-6">
									<button
										class="absolute -left-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-muted ring-2 ring-background"
										on:click={() => setStep(index)}
									>
										{#if index === 0}
											<Info class="h-4 w-4 text-primary" />
										{:else if uploadedFiles[index] || (index === totalSteps - 1 && allFilesUploaded)}
											<Check class="h-4 w-4 text-primary" />
										{:else}
											<div
												class={`h-4 w-4 rounded-full ${index === currentStep ? 'bg-primary' : 'bg-muted-foreground'}`}
											></div>
										{/if}
									</button>
									<h3
										class={`font-medium leading-tight ${index === currentStep ? 'text-primary' : 'text-foreground'} cursor-pointer text-xs`}
										on:click={() => setStep(index)}
									>
										{index === 0
											? 'Introdução'
											: index === totalSteps - 1
												? 'Revisão'
												: `Passo ${index}`}
									</h3>
									<p class="mt-1 text-xs text-muted-foreground">{step}</p>
								</li>
							{/each}
						</ol>
					</CardContent>
				</Card>
			</div>

			<div class="sm:w-3/4">
				<Card class="flex h-full flex-col">
					<CardHeader class="p-3">
						<CardTitle class="text-lg"
							>{currentStep === 0
								? 'Introdução'
								: currentStep === totalSteps - 1
									? 'Revisão'
									: 'Upload de Arquivos'}</CardTitle
						>
						<CardDescription class="text-sm">{steps[currentStep]}</CardDescription>
					</CardHeader>
					<CardContent class="flex-grow p-3">
						{#if currentStep === 0}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Bem-vindo ao Formulário de Upload de Arquivos</h3>
								<p>
									Este formulário guiará você através do processo de upload de vários documentos
									importantes. Aqui estão algumas instruções para usar o formulário:
								</p>
								<ol class="list-inside list-decimal space-y-2">
									<li>
										Navegue pelos passos usando os botões "Anterior" e "Próximo" ou clicando
										diretamente na etapa desejada.
									</li>
									<li>
										Para cada passo, você pode arrastar e soltar um arquivo PDF na área designada ou
										clicar para selecionar um arquivo.
									</li>
									<li>
										Se você não tiver um arquivo específico, pode clicar em "Pular passo" para
										continuar.
									</li>
									<li>
										No final, você terá a chance de revisar todos os arquivos enviados antes de
										finalizar o processo.
									</li>
								</ol>
								<p>Clique em "Próximo" para começar o processo de upload.</p>
							</div>
						{:else if currentStep < totalSteps - 1}
							<form on:submit|preventDefault class="flex h-full flex-col">
								<div class="flex flex-grow flex-col gap-1.5">
									<Label for="file{currentStep}" class="mb-2 text-sm"
										>Selecione o arquivo para {steps[currentStep]}</Label
									>
									<div
										class="flex flex-grow cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted p-6 text-center transition-colors hover:border-muted-foreground"
										on:dragover={handleDragOver}
										on:drop={(e) => handleFileUpload(e, currentStep)}
										on:click={() => document.getElementById(`file${currentStep}`)?.click()}
									>
										{#if uploadedFiles[currentStep]}
											<div class="flex flex-col items-center">
												<FileText class="mb-2 h-12 w-12 text-primary" />
												<p class="text-sm text-muted-foreground">
													{uploadedFiles[currentStep]?.name}
												</p>
											</div>
										{:else}
											<Upload class="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
											<p class="text-sm text-muted-foreground">
												Arraste e solte o arquivo PDF aqui ou clique para selecionar
											</p>
										{/if}
									</div>
									<input
										id="file{currentStep}"
										type="file"
										accept=".pdf"
										class="hidden"
										on:change={(e) => handleFileUpload(e, currentStep)}
									/>
								</div>
							</form>
						{:else}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Revisão dos Arquivos Enviados</h3>
								{#each Object.entries(uploadedFiles) as [step, file]}
									<div class="flex items-center justify-between">
										<span class="text-sm">{steps[parseInt(step)]}</span>
										{#if file}
											<div class="flex items-center">
												<Check class="mr-2 h-4 w-4 text-primary" />
												<span class="text-sm text-primary">{file.name}</span>
											</div>
										{:else}
											<div class="flex items-center">
												<X class="mr-2 h-4 w-4 text-destructive" />
												<span class="text-sm text-destructive">Arquivo não enviado</span>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</CardContent>
					<div class="mt-auto border-t border-muted p-3">
						<div class="flex justify-between">
							<Button
								variant="outline"
								on:click={prevStep}
								disabled={currentStep === 0}
								class="w-24 text-sm">Anterior</Button
							>
							{#if currentStep < totalSteps - 1}
								<Button on:click={nextStep} class="w-24 text-sm">
									{currentStep === 0 || uploadedFiles[currentStep] ? 'Próximo' : 'Pular passo'}
								</Button>
							{:else}
								<Button variant="default" class="w-24 text-sm" disabled={!allFilesUploaded}
									>Finalizar</Button
								>
							{/if}
						</div>
					</div>
				</Card>
			</div>
		</div>
	</CardContent>
</Card>
