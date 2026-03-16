<script lang="ts">
	import LandingShell from '$lib/components/landing-shell.svelte';
	import NavItem from '$lib/components/nav-item.svelte';
	import { ArrowLeftIcon } from 'phosphor-svelte';
</script>

<LandingShell pageId="projects">
	<NavItem class="text-sm" href="https://better-svelte-email.konixy.dev">
		Better Svelte Email
	</NavItem>
	<NavItem class="text-sm" href="https://djpilot.app">djPilot</NavItem>
	<NavItem class="text-sm" href="https://groupie-tracker.konixy.dev">Groupie Tracker</NavItem>

	{#snippet footer()}
		<a
			href="/"
			data-sveltekit-preload-data="hover"
			class="text-foreground/60 hover:text-foreground focus-visible:text-foreground flex min-w-24 cursor-pointer flex-row items-center justify-center gap-2 text-sm transition-colors outline-none"
		>
			<ArrowLeftIcon class="size-3" /> back
		</a>
	{/snippet}
</LandingShell>
