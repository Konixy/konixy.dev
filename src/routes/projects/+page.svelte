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
			class="text-foreground/60 hover:text-foreground focus-visible:text-foreground group relative flex cursor-pointer flex-row items-center justify-center gap-2 pb-0.5 text-sm transition-colors outline-none"
		>
			<ArrowLeftIcon class="size-3" /> back
			<span
				aria-hidden="true"
				class="bg-foreground/40 pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
			></span>
		</a>
	{/snippet}
</LandingShell>
