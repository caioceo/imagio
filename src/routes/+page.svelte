<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let search: string = $state('');
	let name: string = $state('');
	let username: string = $state('');
	let email: string = $state('');
	let password: string = $state('');

	let loginStatus: boolean = $state(false);

	onMount(() => {
		loginStatus = localStorage.getItem('login') === 'true';
	});

	async function Register() {
		const userInfo = new FormData();

		userInfo.append('email', email);
		userInfo.append('name', name);
		userInfo.append('username', username);
		userInfo.append('password', password);

		const reply = await fetch('api/user/register', {
			method: 'POST',
			body: userInfo
		});

		const result = await reply.json();

		if (result.success) {
			toggleForm();
		} else alert('Erro ao registrar usuário.');
	}

	async function Login() {
		const tryLogin = new FormData();

		tryLogin.append('LoginId', username || email);
		tryLogin.append('password', password);

		const reply = await fetch('api/user/login', {
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

	// FORMULARIO

	let showForm: boolean = $state(false);

	function toggleForm() {
		showForm = !showForm;
		if (showForm) {
			document.body.style.overflow = 'hidden';
		} else document.body.style.overflow = '';
	}
	// authType true = Sing Up
	function toggleAuth() {
		authType = !authType;
	}

	let authType: boolean = $state(true);
</script>

<!-- FORMULARIO -->

{#if showForm}
	<section class="modal-overlay fixed inset-0 flex items-center justify-center">
		<div class="grid h-auto w-[450px] gap-y-2 rounded-xl bg-white p-6 shadow-2xl">
			<div class="flex justify-between">
				{#if authType}
					<h1 class="f1 mb-6 text-center font-bold">
						Sing In <span class="f2 text-sm font-extralight"
							>already have an account? <button
								onclick={toggleAuth}
								class="cursor-pointer hover:text-blue-600">Login</button
							></span
						>
					</h1>
				{:else}
					<h1 class="f1 mb-6 text-center font-bold">
						Login <span class="f2 text-sm font-extralight"
							>Need to create an account? <button
								onclick={toggleAuth}
								class="cursor-pointer hover:text-blue-600">Sing Up</button
							></span
						>
					</h1>
				{/if}
				<button class="cursor-pointer" onclick={toggleForm}>
					<span class="material-icons">close</span>
				</button>
			</div>

			<hr
				class="h-[1px] border-0 bg-gradient-to-r from-transparent via-black to-transparent shadow-2xl"
			/>

			{#if authType}
				<div class="grid gap-y-2">
					<label for="name">Name</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="text"
						bind:value={name}
					/>
				</div>
				<div class="grid gap-y-2">
					<label for="username">Username</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="text"
						bind:value={username}
					/>
				</div>
				<div class="grid gap-y-2">
					<label for="email">Email</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="email"
						bind:value={email}
					/>
				</div>
				<div class="grid gap-y-2">
					<label for="password">Password</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="password"
						bind:value={password}
					/>
				</div>
			{:else}
				<div class="grid gap-y-2">
					<label for="email">Email</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="email"
						bind:value={email}
					/>
				</div>
				<div class="grid gap-y-2">
					<label for="password">Password</label>
					<input
						class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
						type="password"
						bind:value={password}
					/>
				</div>
			{/if}

			<button
				onclick={Register}
				class="f1 mt-6 w-full cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
				>SUBMIT</button
			>
		</div>
	</section>
{/if}

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
				class="w-full rounded-xl border-1 border-gray-700 bg-zinc-100 px-5 py-2 outline-none"
			/>
		</div>

		<div class="flex gap-2">
			{#if loginStatus}
				<a
					class="rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					href="/publish-new-project">Upload</a
				>
				<button class="cursor-pointer"><span class="material-icons">notifications</span></button>
				<button class="cursor-pointer"><span class="material-icons">settings</span></button>
			{:else}
				<button
					id="registerID"
					onclick={() => {
						toggleForm();
						authType = true;
					}}
					class="cursor-pointer rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					>Sing In</button
				>
				<button
					id="loginID"
					onclick={() => {
						toggleForm();
						authType = false;
					}}
					class="cursor-pointer rounded-xl bg-black px-5 py-2 text-white transition-all hover:text-white"
					>Sing Up</button
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
				href="/projects/new-submit">PUBLISH NOW</a
			>
		{:else}
			<button
				id="registerID"
				onclick={() => {
					toggleForm();
					authType = true;
				}}
				class="f1 cursor-pointer rounded-xl bg-black py-4 text-center text-2xl font-extrabold text-white"
				>START NOW</button
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
		<h1 class="mb-3 font-semibold">Navegação</h1>
		<div class="grid gap-y-1"></div>
		<a href="/">Início</a>
		<a href="/">Explorar Projetos</a>
		<a href="/">Criadores em Destaque</a>
		<a href="/">Categorias</a>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Contato</h1>
		<div class="grid gap-y-1">
			<a href="/">Fale Conosco</a>
			<a href="/">Ajuda Técnica</a>
			<a href="/">Feedback</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Recursos</h1>
		<div class="grid gap-y-1">
			<a href="/">Planos</a>
			<a href="/">Ferramentas</a>
			<a href="/">Integrações</a>
			<a href="/">Tutoriais</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Sobre Nós</h1>
		<div class="grid gap-y-1">
			<a href="/">Missão</a>
			<a href="/">Equipe</a>
			<a href="/">História</a>
			<a href="/">Imprensa</a>
			<a href="/">Parcerias</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Suporte</h1>
		<div class="grid gap-y-1">
			<a href="/">Perguntas Frequentes</a>
			<a href="/">Central de Ajuda</a>
			<a href="/">Status do Serviço</a>
			<a href="/">Relatar Problema</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Conecte-se</h1>
		<div class="grid gap-y-1">
			<a href="/">LinkedIn</a>
			<a href="/">Instagram</a>
			<a href="/">YouTube</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Conteúdo</h1>
		<div class="grid gap-y-1">
			<a href="/">Blog</a>
			<a href="/">Casos de Sucesso</a>
			<a href="/">Dicas de Portfólio</a>
			<a href="/">Entrevistas</a>
		</div>
	</div>
	<div>
		<h1 class="mb-3 font-semibold">Legal</h1>
		<div class="grid gap-y-1">
			<a href="/">Política de Privacidade</a>
			<a href="/">Termos de Uso</a>
			<a href="/">Direitos Autorais</a>
			<a href="/">Cookies</a>
			<a href="/">Licenciamento</a>
		</div>
	</div>
</section>
