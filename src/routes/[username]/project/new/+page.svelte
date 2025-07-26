<script lang="ts">

	// TODO: validação on change dos input e na hora de enviar
	import { onMount } from 'svelte';

	type Project = {
		name: string;
		desc: string;
		links: string[];
		imgs: FileList | null;
	};

	let project: Project = $state({
		name: '',
		desc: '',
		links: [],
		imgs: null
	});

	let imagesDisplay: { file: File; url: string }[] = $state([]);

	function deleteDisplayImage(file: File) {
		imagesDisplay = imagesDisplay.filter((i) => i.file.name !== file.name);
	}

	function onUpload() {
		if (!project.imgs) {
			return;
		}
		Array.from(project.imgs).forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				imagesDisplay = [
					...imagesDisplay,
					{
						file,
						url: e.target?.result as string
					}
				];
			};
			reader.readAsDataURL(file);
		});
	}

	let user: { id: string } | undefined = $state();

	onMount(() => {
		const userStr = localStorage.getItem('user');
		user = userStr ? JSON.parse(userStr) : null;
	});

	let estaCarregando = $state(false)

	async function create() {
		estaCarregando = true
		if (!user) {
			return;
		}
		try {
			const request = await fetch('/api/project/create', {
				method: 'POST',
				body: JSON.stringify({
					name: project.name,
					desc: project.desc,
					userID: user.id,
					links: project.links,
					images: imagesDisplay.map((img) => img.url)
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const result = await request.json();
			console.log(result);
			if (result.success) {
			}
		} catch (error) {
			console.log(error)
		} finally {
			estaCarregando = false
		}
	}
</script>

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
				bind:value={project.name}
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
			/>
		</div>
		<div class="grid gap-y-2">
			<label for="desc">Describe your project</label>
			<textarea
				bind:value={project.desc}
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
				multiple
				bind:files={project.imgs}
				onchange={onUpload}
			/>
			<!-- value faltando acima -->
			<div class="grid grid-cols-3 gap-3">
				{#each imagesDisplay as im}
					<div class="rounded-2xl">
						<button
							onclick={() => {
								deleteDisplayImage(im.file);
							}}
							class="group relative"
						>
							<img class="h-40 w-full rounded-2xl object-cover" src={im.url} alt="" />
							<span
								class="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 text-2xl font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
								>x</span
							>
						</button>
					</div>
				{/each}
			</div>
		</div>

		<div class="grid gap-y-2">
			<label for="desc">Auxiliar Links</label>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
				bind:value={project.links[0]}
				placeholder="First link"
			/>
			<input
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
				type="text"
				bind:value={project.links[1]}
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
			onclick={create}
			class="f1 mt-6 w-full cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
			>PUBLISH NOW</button
		>
		<div class="mt-2 flex items-center gap-1">
			<span class="f2 text-sm font-extralight">Need to create more projects?</span>
			<button class="cursor-pointer text-blue-600">Try premium</button>
		</div>
	</div>
</section>
