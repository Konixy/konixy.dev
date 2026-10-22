<script lang="ts">
import confetti from 'canvas-confetti';
import Button from '$lib/components/button.svelte';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, stroke, X_URL } from '$lib/constants';
import Link from '$lib/components/link.svelte';
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandX,
	IconCheck,
	IconCopy
} from '@tabler/icons-svelte';

function onclick(e: MouseEvent) {
	if (e.clientX === 0 && e.clientY === 0) return;
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
	});
}

let isEmailCopied = $state(false);

async function copyEmail() {
	await navigator.clipboard.writeText(EMAIL);
	if (isEmailCopied) {
		return;
	}
	isEmailCopied = true;
	setTimeout(() => {
		isEmailCopied = false;
	}, 2000);
}

const socials = [
	{
		icon: IconBrandGithub,
		href: GITHUB_URL,
		label: 'GitHub'
	},
	{
		icon: IconBrandX,
		href: X_URL,
		label: 'X'
	},
	{
		icon: IconBrandLinkedin,
		href: LINKEDIN_URL,
		label: 'LinkedIn'
	}
];
</script>

<div
	class="flex h-dvh flex-col gap-10 px-6 py-10 sm:px-10 sm:py-16 lg:flex-row lg:justify-between lg:px-16"
>
	<div class="flex flex-col gap-10">
		<div class="flex w-full flex-row items-center gap-6">
			<img
				src="{GITHUB_URL}.png"
				alt="Anatole Dufour"
				class="pointer-events-none size-20 rounded-3xl select-none sm:size-24"
			/>
			<div class="flex flex-col gap-1">
				<div class="text-foreground text-left text-3xl font-bold sm:text-5xl">Anatole Dufour</div>
				<div
					class="text-foreground/70 text-normal flex flex-col text-left sm:flex-row sm:items-center sm:gap-3 sm:text-xl"
				>
					<div><span class="text-foreground/50">@</span>Konixy</div>
					<div class="text-foreground/50 hidden font-thin sm:block">·</div>
					<div>Frontend Engineer</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<Button
				variant="default"
				icon="download"
				href="/resume.pdf"
				download="CV Anatole Dufour.pdf"
				external={false}
				{onclick}
			>
				Download CV
			</Button>

			<Button variant="primary" href="https://www.google.com" icon="external">Another link</Button>
			<Button variant="outline" href="https://www.google.com" icon="external">Another link</Button>

			<div class="flex items-center gap-2">
				<Link href="mailto:{EMAIL}">{EMAIL}</Link>
				<button
					class="hover:bg-foreground/10 border-foreground/10 text-foreground/70 hover:text-foreground focus-visible:ring-offset-background flex cursor-pointer items-center justify-center rounded-lg border-2 p-1.5 transition-colors hover:border-transparent focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none"
					onclick={copyEmail}
				>
					{#if isEmailCopied}
						<IconCheck class="animate-in fade-in size-3.5 shrink-0" {stroke} />
					{:else}
						<IconCopy class="animate-in fade-in size-3.5 shrink-0" {stroke} />
					{/if}
				</button>
			</div>
		</div>

		<div class="flex flex-col lg:grow lg:justify-end">
			<div class="flex flex-row gap-1">
				{#each socials as social}
					<Button size="icon" variant="ghost" href={social.href}>
						<social.icon class="size-4" {stroke} />
					</Button>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 pb-10 lg:max-w-1/2">
		<h2>My story</h2>

		<p>Hi! My name is Anatole, I'm a passionate developer from France.</p>

		<p>
			I was 11 years old playing the rubik's cube when I was introduced to programming in <Link
				href="https://scratch.mit.edu/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scratch
			</Link> at school during a math class. I started using real programming languages soon after when
			I wanted to create my own Minecraft mods.
		</p>

		<p>
			I enjoy web technologies, open-source, working on new projects, learning new technologies and
			challenging myself.
		</p>

		<p>
			I am currently searching for a job in (or near) Rouen, France. I'm also open to hybrid jobs in
			France or full-remote jobs abroad.
		</p>

		<p>
			In my free time, I love to experiment with
			<Link href="https://homarr.konixy.fr" target="_blank" rel="noopener noreferrer">
				my HomeLab
			</Link>
			hosting open-source services, I also like playing with blender and design softwares, although I'm
			not very good at it. I'm also a DJ, I perform regularly at bars and restaurants, I also play and
			organize events for private parties. When I was younger, I played the trumpet, drums and piano,
			but I'm not very good at it anymore.
		</p>
	</div>
</div>
