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

function copyEmail() {
	navigator.clipboard.writeText('anatole.duf@gmail.com');
}
</script>

<LandingShell pageId="home">
	<NavItem href="/cv.pdf" download="CV Anatole Dufour.pdf" {onclick}>
		Download CV
	</NavItem>
	<NavItem
		href="mailto:anatole.duf@gmail.com"
		icon="copy"
		onclick={(e) => {
			e.preventDefault();
			copyEmail();
		}}
	>
		Copy Email
	</NavItem>
	<NavItem href="https://github.com/Konixy">GitHub</NavItem>
	<NavItem href="https://linkedin.com/in/anatole-dufour/">LinkedIn</NavItem>
	<NavItem href="https://x.com/anatoleduf">X</NavItem>
	<NavItem href="https://instagram.com/anatole.music">Instagram</NavItem>

	{#snippet footer()}
		<a
			href="/projects"
			data-sveltekit-preload-data="hover"
			class="text-foreground/60 hover:text-foreground focus-visible:text-foreground group relative flex cursor-pointer flex-row items-center justify-center gap-2 pb-0.5 text-sm transition-colors outline-none"
		>
			projects <ArrowRightIcon class="size-3" />
			<span
				aria-hidden="true"
				class="bg-foreground/40 pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
			></span>
		</a>
	{/snippet}
</LandingShell>
