<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let loading = false;
	let message: { type: 'success' | 'error'; text: string } | null = null;

	let currentUsername = '';
	$: currentUsername = $page.params.username ?? '';

	let name = '';
	let email = '';
	let username = '';
	let password = '';
	let url1: string | null = '';
	let url2: string | null = '';

	onMount(async () => {
		username = currentUsername;
		try {
			const res = await fetch(`/api/user/get?username=${encodeURIComponent(currentUsername)}`);
			if (res.ok) {
				const data = await res.json();
	
				const u = data?.user;
				if (u) {
					email = u.email ?? '';
					name = u.name ?? '';
					username = u.username ?? currentUsername;
					url1 = u.url1 ?? '';
					url2 = u.url2 ?? '';
				}
			}
		} catch (e) {
		}
	});

	async function submitForm(e: Event) {
		e.preventDefault();
		message = null;
		loading = true;
		try {
			const form = new FormData();
			form.append('currentUsername', currentUsername);

			form.append('email', email.trim());
			form.append('name', name.trim());
			form.append('username', username.trim());
			form.append('url1', (url1 || '').toString());
			form.append('url2', (url2 || '').toString());
			form.append('password', password);

			const res = await fetch('/api/user/edit', {
				method: 'POST',
				body: form
			});

			const data = await res.json().catch(() => ({}));
			if (!res.ok || data?.success === false) {
				message = { type: 'error', text: data?.error || 'Não foi possível atualizar o perfil.' };
				return;
			}

			message = { type: 'success', text: 'Perfil atualizado com sucesso.' };

			if (username && username !== currentUsername) {
				await goto(`/${encodeURIComponent(username)}/edit-profile`);
			}
		} catch (err) {
			message = { type: 'error', text: 'Ocorreu um erro ao enviar os dados.' };
		} finally {
			loading = false;
		}
	}
</script>

<section class="container">
	<h1>Editar perfil</h1>

	{#if message}
		<div class:success={message.type === 'success'} class:error={message.type === 'error'} role="status">
			{message.text}
		</div>
	{/if}

		<form on:submit|preventDefault={submitForm} class="form">
			<fieldset disabled={loading}>
			<legend>Dados da conta</legend>

			<label>
				Nome
				<input type="text" bind:value={name} name="name" autocomplete="name" required />
			</label>

			<label>
				Email
				<input type="email" bind:value={email} name="email" autocomplete="email" required />
			</label>

			<label>
				Username
				<input type="text" bind:value={username} name="username" minlength="1" maxlength="20" required />
			</label>

			<label>
				Senha
				<input type="password" bind:value={password} name="newPassword" autocomplete="new-password" />
			</label>
		</fieldset>

		<fieldset disabled={loading}>
			<legend>Perfil</legend>

			<label>
				URL 1
				<input type="url" bind:value={url1} name="url1" placeholder="https://" />
			</label>

			<label>
				URL 2
				<input type="url" bind:value={url2} name="url2" placeholder="https://" />
			</label>

		
		</fieldset>

		<div class="actions">
			<button type="submit" disabled={loading}>
				{#if loading}Salvando...{/if}
				{#if !loading}Salvar alterações{/if}
			</button>
		</div>
	</form>
</section>

<style>
	.container {
		max-width: 720px;
		margin: 2rem auto;
		padding: 1rem;
		display: grid;
		gap: 1rem;
	}
	h1 {
		font-size: 1.5rem;
		margin: 0 0 .5rem;
	}
	.form {
		display: grid;
		gap: 1rem;
	}
	fieldset {
		border: 1px solid #e0e0e0;
		border-radius: .5rem;
		padding: 1rem;
		display: grid;
		gap: .75rem;
	}
	label {
		display: grid;
		gap: .25rem;
		font-size: .9rem;
	}
	input {
		padding: .6rem .7rem;
		border: 1px solid #d0d0d0;
		border-radius: .4rem;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
	}
	button {
		background: black;
		color: white;
		padding: .7rem 1rem;
		border-radius: .4rem;
	}
	.success {
		color: #0a7c27;
	}
	.error {
		color: #b00020;
	}
</style>
