<script lang="ts">
import confetti from 'canvas-confetti';
import LandingShell from '$lib/components/landing-shell.svelte';
import NavItem from '$lib/components/nav-item.svelte';
import { ArrowRightIcon } from 'phosphor-svelte';

function onclick() {
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.45 }
	});
}
</script>

<LandingShell pageId="home">
	<NavItem href="/cv.pdf" variant="download" download="CV Anatole Dufour.pdf" {onclick}>
		Download CV
	</NavItem>
	<NavItem href="https://github.com/Konixy">GitHub</NavItem>
	<NavItem href="https://linkedin.com/in/anatole-dufour/">LinkedIn</NavItem>
	<NavItem href="https://x.com/anatoleduf">X</NavItem>
	<NavItem href="https://instagram.com/anatole.music">Instagram</NavItem>

	{#snippet footer()}
		<a
			href="/projects"
			data-sveltekit-preload-data="hover"
			class="text-foreground/60 hover:text-foreground focus-visible:text-foreground flex min-w-24 cursor-pointer flex-row items-center justify-center gap-2 text-sm transition-colors outline-none"
		>
			projects <ArrowRightIcon class="size-3" />
		</a>
	{/snippet}
</LandingShell>
