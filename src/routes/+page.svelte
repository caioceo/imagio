<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let search: string = $state('');
	let name: string = $state('');
	let username: string = $state('');
	let email: string = $state('');
	let phone: string = $state('');
	let password: string = $state('');

	let loginStatus: boolean = $state(false);

	onMount(() => {
		loginStatus = localStorage.getItem('login') === 'true';
	});

	async function Register() {
		const userInfo = new FormData();

		userInfo.append('name', name);
		userInfo.append('username', username);
		userInfo.append('email', email);
		userInfo.append('phone', phone || '');
		userInfo.append('password', password);

		const reply = await fetch('api/register', {
			method: 'POST',
			body: userInfo
		});

		const result = await reply.json();
		if (result.success) {
			alert('Usuário cadastrado');
		} else alert('Erro ao registrar usuário, tente novamente.');
	}

	async function Login() {
		const tryLogin = new FormData();

		tryLogin.append('LoginId', username || email);
		tryLogin.append('password', password);

		const reply = await fetch('api/login', {
			method: 'POST',
			body: tryLogin
		});

		const result = await reply.json();

		if (result.success) {
			localStorage.setItem('login', 'true');
			loginStatus = true;
		} else alert('Usuário e/ou senha incorreto.');
	}

	function Logout() {
		localStorage.setItem('login', 'false');
		loginStatus = false;
	}
</script>

<hr
	class="h-[1px] border-0 bg-gradient-to-r from-transparent via-black to-transparent shadow-2xl"
/>

<!-- NAVBAR -->

<section class="bg-white py-7">
	<nav class="container mx-auto flex items-center gap-6">
		<div>
			<a class="f1 text-xl font-semibold" href="/">Imagio</a>
		</div>
		<div class="flex-grow">
			<input
				bind:value={search}
				type="text"
				placeholder="Search for a profissional"
				class="w-full rounded-xl border-1 border-gray-700 bg-gray-100 px-5 py-2 outline-none"
			/>
		</div>

		<div class="flex gap-2">
			{#if loginStatus}
				<a
					class="rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					href="/projects">Upload</a
				>
				<button class="cursor-pointer"><span class="material-icons">notifications</span></button>
				<button class="cursor-pointer"><span class="material-icons">settings</span></button>
			{:else}
				<a
					class="rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					href="/register">Sing In</a
				>
				<a
					class="rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					href="/login">Sign Up</a
				>
			{/if}
		</div>
	</nav>
</section>

<hr
	class="m-px3 h-[1px] w-1/1 border-0 bg-gradient-to-r from-transparent via-black to-transparent shadow-2xl"
/>

<!-- ACTION -->

<section class="container mx-auto mt-24 mb-24 flex items-start">
	<div class="grid w-1/3 gap-y-4 px-4">
		<h1 class="text-7xl font-bold">
			Put your creations in <br /> <span class=" px- font-extrabold italic">the spotlight.</span>
		</h1>
		<p>
			A modern platform to display your work, grow your presence, and share your profissional
			journey.
		</p>
		{#if loginStatus}
			<a
				class="f1 cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
				href="/register">PUBLISH NOW</a
			>
		{:else}
			<a
				class="f1 cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
				href="/register">START NOW</a
			>
		{/if}
	</div>
</section>

<hr class="container mx-auto" />
<!-- TOPICS -->

<section class="container mx-auto mt-24 mb-24 grid grid-cols-2 items-start gap-x-20">
	<div class="flex flex-col gap-y-4">
		<h1 class="center text-3xl font-semibold">
			How <span class="f1 text-2xl">Imagio</span> works
		</h1>
		<p>
			Imagio is designed to help you build your presence by allowing you to create a profile and
			showcase featured projects, whether you're a designer, artist, developer, freelancer, or
			entrepreneur. Since your work deserves more than just a simple link, Imagio lets you present
			it in a dynamic and visually engaging way that captures attention and helps you stand out.
			Essentially, it’s a space to share, connect, and get discovered.
		</p>
	</div>
	<div class="flex flex-col gap-y-4">
		<h1 class="center text-3xl font-semibold">Our purpose</h1>
		<p>
			At Imagio, our purpose is simple: to provide a free, professional, and practical space where
			creators can present their projects in a more dynamic and engaging way. We believe every idea
			deserves to be seen, and we’re here to help you showcase yours with clarity, style, and
			impact.
		</p>
	</div>
</section>

<hr class="h-[1px] border-0 bg-gradient-to-r from-transparent via-black to-transparent" />

<!-- FOOTER -->

<section class="container mx-auto mt-12 mb-6 flex items-start justify-between">
	<div class="grid">
		<h1 class="mb-3 font-semibold">Titulo</h1>
		<div class="grid gap-y-1"></div>
		<a href="/">Subtitulo</a>
		<a href="/">Sobre Titulo</a>
		<a href="/">Sobre Titulo</a>
		<a href="/">Sobre Titulo</a>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Contato</h1>
		<div class="grid gap-y-1">
			<a href="/">Fale Conosco</a>
			<a href="/">Suporte</a>
			<a href="/">Suporte</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Serviços</h1>
		<div class="grid gap-y-1">
			<a href="/">Catálogo</a>
			<a href="/">Preços</a>
			<a href="/">Preços</a>
			<a href="/">Preços</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Empresa</h1>
		<div class="grid gap-y-1">
			<a href="/">Quem Somos</a>
			<a href="/">Carreiras</a>
			<a href="/">Carreiras</a>

			<a href="/">Carreiras</a>
			<a href="/">Carreiras</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Ajuda</h1>
		<div class="grid gap-y-1">
			<a href="/">FAQ</a>
			<a href="/">Central de Ajuda</a>
			<a href="/">Central de Ajuda</a>

			<a href="/">Central de Ajuda</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Redes Sociais</h1>
		<div class="grid gap-y-1">
			<a href="/">Facebook</a>
			<a href="/">Instagram</a>
			<a href="/">Twitter</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Blog</h1>
		<div class="grid gap-y-1">
			<a href="/">Últimas Notícias</a>
			<a href="/">Artigos</a>
			<a href="/">Artigos</a>

			<a href="/">Artigos</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Legal</h1>
		<div class="grid gap-y-1">
			<a href="/">Política de Privacidade</a>
			<a href="/">Termos de Uso</a>
			<a href="/">Termos de Uso</a>
			<a href="/">Termos de Uso</a>
			<a href="/">Termos de Uso</a>
		</div>
	</div>
</section>
