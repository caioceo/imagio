<script lang="ts">
	import { applyAction } from '$app/forms';

	let name: string = $state('');
	let desc: string = $state('');
	let link1: string | null = $state(null);
	let link2: string | null = $state(null);

	let img : string[] = $state([
		'https://static.vecteezy.com/ti/vetor-gratis/p1/4640699-circle-upload-icon-button-isolated-on-white-background-vetor.jpg',
		'https://static.vecteezy.com/ti/vetor-gratis/p1/4640699-circle-upload-icon-button-isolated-on-white-background-vetor.jpg',
		'https://static.vecteezy.com/ti/vetor-gratis/p1/4640699-circle-upload-icon-button-isolated-on-white-background-vetor.jpg'
	]);

	let file: File | null = $state(null);
	let i = 0;
	async function uploadToFile (event: Event){
		const input = event.target as HTMLInputElement;
		let image = input.files?.[0] || null;
		
		if(!image) return;
		const form = new FormData();
		form.append('file', image);


		try {
			const res = await fetch('api/project/create/upload_image', {
			method: 'POST',
			body: form
		});

		if (!res.ok) throw new Error('Upload falhou');

		const data = await res.json();
			const link = data.link;
		
		img[i]=link;
		img = [...img];
		i++;

		} catch (error) {
			console.error('Erro no upload:', error);
		}
		
	}

</script>

<!-- FAZER UM GET NO BACKEND QUE VERIFIQUE QUANTOS PROJETOS JA EXISTEM PARA VALIDAR CRIAÇÃO DE NOVO PROJETO -->

<!-- Usuario vai fazer input na imagem, vou fazer post que faça validação e retorne link para exibição-->
<!-- each na exibição das imagens -->

<section class="modal-overlay fixed inset-0 flex items-center justify-center">
	<div class="grid h-auto w-[600px] gap-y-2 rounded-xl bg-white p-6 shadow-2xl">
		<div class="flex justify-between">
			<h1 class="f1 mb-6 text-center font-bold">Publish a new project</h1>
			<button class="cursor-pointer">
				<span class="material-icons">close</span>
			</button>
		</div>

		<hr
			class="mb-3 h-[1px] border-0 bg-gradient-to-r from-transparent via-black to-transparent shadow-2xl"
		/>

		<div class="grid gap-y-2">
			<label for="name">Project Name</label>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
			/>
		</div>
		<div class="grid gap-y-2">
			<label for="desc">Describe your project</label>
			<textarea
				id="desc"
				class="min-h-[100px] w-full resize-y rounded-xl border border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				placeholder="Describe your project here..."
			></textarea>
		</div>

		<div class="grid gap-y-2">
			<label for="desc">Upload Images</label>
			<input
				class="w-1/3 rounded-xl border-1 border-gray-700 bg-zinc-100 px-3 py-1 outline-none"
				type="file"
				accept="image/*"
				onchange={uploadToFile}
			/>
			<!-- value faltando acima -->
			<div class="grid grid-cols-3 gap-3">
				<div class="overflow-hidden rounded-2xl">
					<img class="h-40 w-full object-cover" src={img[0]} alt="" />
				</div>
				<div class="overflow-hidden rounded-2xl">
					<img class="h-40 w-full object-cover" src={img[1]} alt="" />
				</div>
				<div class="overflow-hidden rounded-2xl">
					<img class="h-40 w-full object-cover" src={img[2]} alt="" />
				</div>
			</div>
		</div>

		<div class="grid gap-y-2">
			<label for="desc">Auxiliar Links</label>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
				bind:value={link1}
				placeholder="First link"
			/>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
				bind:value={link2}
				placeholder="Second link"
			/>
		</div>

		<div class="grid gap-y-2">
			<label for="desc">Collaborators</label>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
				placeholder="Put who helped you with the project"
			/>
		</div>
		<button
			class="f1 mt-6 w-full cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
			>PUBLISH NOW</button
		>
		<div class="mt-2 flex items-center gap-1">
			<span class="f2 text-sm font-extralight">Need to create more projects?</span>
			<button class="cursor-pointer text-blue-600">Try premium</button>
		</div>
	</div>
</section>
