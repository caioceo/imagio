<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ExternalLink } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { projeto } = data;

	let links: String[] = $state([]);
</script>

<section class="bg-white py-7">
	<nav class="container mx-auto flex items-center gap-6">
		<div>
			<a class="f1 text-xl font-semibold" href="/">Imagio</a>
		</div>
		<div class="flex-grow">
			<input
				type="text"
				placeholder="Search for a profissional"
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
			/>
		</div>

		<div class="flex gap-2">
			<a
				class="rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
				href="/{projeto.user.username}/project/new">Upload</a
			>
			<a
				class="cursor-pointer rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
				href="/{projeto.user.username}">My space</a
			>
		</div>
	</nav>
</section>

<hr
	class="m-px3 h-[1px] w-1/1 border-0 bg-gradient-to-r from-transparent via-black to-transparent shadow-2xl"
/>

<section class="bg-white">
	<div class="container mx-auto mt-14 mb-14 flex items-start">
		<div class="grid gap-5">
			<h1 class="f1 text-2xl font-semibold">{projeto.name}</h1>
			<div class="flex items-center gap-3">
				<img class="h-8 rounded-full" src={projeto.user.profilePic} alt="">
				<div>
					Published by <a href="/{projeto.user.username}"><span class="hover:text-blue-500">{projeto.user.username}</span></a>
					{#if projeto.helpers.length > 0}
						{#each projeto.helpers as helper, i}
							<a href="/{helper}">, {helper}</a>
						{/each}
					{/if}
				</div>
			</div>
			<div>
				<h1 class="f1 font-semibold">About this project</h1>
				<h1 class="text-md">{projeto.desc}</h1>
			</div>
			<div class="flex gap-1">
				{#if projeto.link1}
					<a href={projeto.link1}><ExternalLink size="20" /></a>
				{/if}
				{#if projeto.link2}
					<a href={projeto.link1}><ExternalLink size="20" /></a>
				{/if}
			</div>
		</div>
	</div>
</section>

{#if projeto.ytID}
	<section class="p-14 bg-gray-100">
		<div class="container mx-auto flex justify-center">
			<iframe
				class="rounded-xl"
				width="960"
				height="540"
				src="https://www.youtube.com/embed/{projeto.ytID}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
	</section>
	{#if projeto.images}
		<section class="mb-24 bg-white p-14">		
			<div class="container mx-auto">
				<div class="columns-3 gap-5 ...">
					{#each projeto.images as image, i}
						<img class="mb-5 rounded-xl" src={image.url} alt="" />
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/if}

{#if projeto.images && !projeto.ytID}
	<section class="mb-24 bg-neutral-300 p-14">
		<div class="container mx-auto">
			<div class="columns-3 gap-5 ...">
				{#each projeto.images as image, i}
					<img class="mb-5 rounded-md" src={image.url} alt="" />
				{/each}
			</div>
		</div>
	</section>
{/if}

<section class="fixed inset-x-0 bottom-0 z-50 flex h-24 bg-black text-white">
	<div class="container mx-auto flex items-center justify-between">
		<a class="f1 text-xl font-semibold" href="/">Imagio</a>
	</div>
</section>
