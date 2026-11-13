<script lang="ts">
import confetti from 'canvas-confetti';
import Button, { buttonVariants } from '#lib/components/button.svelte';
import { EMAIL, GITHUB_URL, stroke } from '#lib/constants.js';
import Link from '#lib/components/link.svelte';
import {
	IconBrandDocker,
	IconBrandFigma,
	IconBrandGit,
	IconBrandGithub,
	IconBrandGolang,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandMongodb,
	IconBrandNextjs,
	IconBrandPrisma,
	IconBrandReact,
	IconBrandRust,
	IconBrandSvelte,
	IconBrandTailwind,
	IconBrandTypescript,
	IconBrandVercelFilled,
	IconBrandX,
	IconCheck,
	IconExternalLink,
	IconGitFork,
	IconLanguage,
	IconMail,
	IconStarFilled
} from '@tabler/icons-svelte';
import * as m from '#lib/paraglide/messages.js';
import { getLocale, setLocale } from '#lib/paraglide/runtime.js';
import FlagUk from '#lib/components/icons/flag-uk.svelte';
import FlagFr from '#lib/components/icons/flag-fr.svelte';
import * as Tooltip from '#lib/components/ui/tooltip/index.js';
import { cn } from 'cn';
import { onMount } from 'svelte';
import ScrollNav from '#lib/components/scroll-nav.svelte';
import MyStoryFr from './my-story-fr.svelte';
import MyStoryEn from './my-story-en.svelte';
import ShadcnUi from '#lib/components/icons/shadcn-ui.svelte';
import Trpc from '#lib/components/icons/trpc.svelte';
import Cursor from '#lib/components/icons/cursor.svelte';
import Bun from '#lib/components/icons/bun.svelte';

const SCROLL_SECTION_OFFSET = 300;

let { data } = $props();
let reposCount = $derived(data.reposCount);
let avatarUrl = $derived(data.avatarUrl);

function onclick(e: MouseEvent) {
	if (e.clientX === 0 && e.clientY === 0) return;
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
	});
}

let container: HTMLDivElement | null = $state(null);

function onScroll() {
	if (!container) return;
	if (container.scrollTop < SCROLL_SECTION_OFFSET) {
		document.querySelector('a[href="#my-story"]')?.setAttribute('data-active', 'true');
		return;
	}
	if (container.scrollHeight - container.scrollTop - window.innerHeight === 0) {
		document.querySelector('a[href="#my-projects"]')?.removeAttribute('data-active');
		document.querySelector('a[href="#my-skills"]')?.setAttribute('data-active', 'true');
		return;
	}
	document
		?.querySelectorAll('.scrollsection')
		.values()
		.forEach((e) => {
			const top = e.getBoundingClientRect().top;
			const navEl = document.querySelector(`a[href='#${e.id}']`);
			if (top < SCROLL_SECTION_OFFSET && top > -SCROLL_SECTION_OFFSET) {
				navEl?.setAttribute('data-active', 'true');
			} else {
				navEl?.removeAttribute('data-active');
			}
		});
}

onMount(() => {
	onScroll();
	container?.addEventListener('scroll', onScroll);

	return () => {
		container?.removeEventListener('scroll', onScroll);
	};
});

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
		href: 'https://x.com/anatoleduf',
		label: 'X'
	},
	{
		icon: IconBrandLinkedin,
		href: 'https://linkedin.com/in/anatole-dufour',
		label: 'LinkedIn'
	},
	{
		icon: IconBrandInstagram,
		href: 'https://instagram.com/anatole.duf',
		label: 'Instagram'
	}
];

const projects = $derived([
	{
		name: 'djPilot',
		description: m.project_description_djpilot(),
		href: 'https://djpilot.app',
		icon: '/assets/djpilot.svg',
		kind: 'product',
		slopPercentage: 30
	},
	{
		name: 'Better Svelte Email',
		description: m.project_description_better_svelte_email(),
		href: 'https://github.com/Konixy/better-svelte-email',
		icon: 'https://raw.githubusercontent.com/Konixy/better-svelte-email/refs/heads/main/apps/docs/static/favicon.svg',
		kind: 'open-source',
		slopPercentage: 20,
		stars: data.starsCount,
		forks: data.forksCount
	},
	{
		name: 'Shairport Sync for Home Assistant',
		description: m.project_description_shairport_sync_for_home_assistant(),
		href: 'https://github.com/Konixy/hass-shairport-app',
		icon: 'https://raw.githubusercontent.com/Konixy/hass-shairport-app/refs/heads/main/shairport/icon.svg',
		kind: 'open-source',
		slopPercentage: 100
	},
	{
		name: 'BusWidget',
		description: m.project_description_buswidget(),
		href: 'https://github.com/Konixy/buswidget',
		icon: '/assets/buswidget.png',
		kind: 'open-source',
		slopPercentage: 100
	}
]);

type SkillsCategory = { name: string; skills: Skill[] };

type Skill = {
	name: string;
	icon: any;
};

const skillsCategory: SkillsCategory[] = [
	{
		name: 'Languages',
		skills: [
			{
				name: 'TypeScript',
				icon: IconBrandTypescript
			},
			{
				name: 'Go',
				icon: IconBrandGolang
			},
			{
				name: 'Rust',
				icon: IconBrandRust
			}
		]
	},
	{
		name: 'Frontend',
		skills: [
			{
				name: 'Svelte',
				icon: IconBrandSvelte
			},
			{
				name: 'React',
				icon: IconBrandReact
			},
			{
				name: 'Tailwind CSS',
				icon: IconBrandTailwind
			},
			{
				name: 'Shadcn UI',
				icon: ShadcnUi
			}
		]
	},
	{
		name: 'Backend',
		skills: [
			{
				name: 'SvelteKit',
				icon: IconBrandSvelte
			},
			{
				name: 'Next.js',
				icon: IconBrandNextjs
			},
			{
				name: 'Bun',
				icon: Bun
			},
			{
				name: 'Prisma',
				icon: IconBrandPrisma
			},
			{
				name: 'MongoDB',
				icon: IconBrandMongodb
			},
			{
				name: 'tRPC',
				icon: Trpc
			}
		]
	},
	{
		name: 'Tooling',
		skills: [
			{
				name: 'Git',
				icon: IconBrandGit
			},
			{
				name: 'GitHub',
				icon: IconBrandGithub
			},
			{
				name: 'Bun',
				icon: Bun
			},
			{
				name: 'Docker',
				icon: IconBrandDocker
			},
			{
				name: 'Vercel',
				icon: IconBrandVercelFilled
			},
			{
				name: 'Figma',
				icon: IconBrandFigma
			},
			{
				name: 'Cursor',
				icon: Cursor
			}
		]
	}
];
</script>

<div
	bind:this={container}
	class="relative flex h-dvh flex-col gap-10 overflow-y-auto scroll-smooth px-6 sm:px-10 lg:flex-row lg:justify-between lg:px-16 pointer-fine:scrollbar-none"
>
	<div
		class="relative flex flex-col gap-10 pt-10 sm:pt-16 lg:sticky lg:top-0 lg:justify-between lg:py-16"
	>
		<div class="flex flex-col gap-10">
			<div class="flex w-full flex-row items-center gap-6">
				<img
					src={avatarUrl}
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
						<div>{m.full_stack_engineer()}</div>
					</div>
				</div>
			</div>

			<!-- <div class="flex flex-col gap-4">
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

				<Button
					variant="default"
					icon="download"
					href="/resume.pdf"
					download="CV Anatole Dufour.pdf"
					external={false}
					{onclick}
				>
					{m.download_resume()}
				</Button>
			</div> -->
		</div>

		<div class="flex w-full flex-col lg:absolute lg:top-1/2 lg:-translate-y-1/2">
			<ScrollNav data-active={true} href="#my-story">
				{m.my_story()}
			</ScrollNav>
			<ScrollNav href="#my-projects">
				{m.my_projects()}
			</ScrollNav>
			<ScrollNav href="#my-skills">
				{m.my_skills()}
			</ScrollNav>
		</div>

		<div class="flex flex-col">
			<div class="flex flex-row gap-2">
				<Tooltip.Provider>
					{#each socials as social}
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<Button size="icon" variant="ghost" href={social.href} {...props}>
										<social.icon class="size-4" {stroke} />
									</Button>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Content>
								<div class="flex flex-row items-center">
									<span class="text-background/70">
										{social.href.split('/').slice(2, -1).join('/')}/
									</span>
									<span>{social.href.split('/').pop()}</span>
								</div>
							</Tooltip.Content>
						</Tooltip.Root>
					{/each}
					<Tooltip.Root disableCloseOnTriggerClick>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button size="icon" variant="ghost" {...props} onclick={copyEmail}>
									{#if isEmailCopied}
										<IconCheck class="animate-in fade-in size-3.5 shrink-0" {stroke} />
									{:else}
										<IconMail class="animate-in fade-in size-3.5 shrink-0" {stroke} />
									{/if}
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							{#if isEmailCopied}
								{m.email_copied()}
							{:else}
								{EMAIL}
							{/if}
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</div>
	</div>
	<div class="flex h-fit flex-col gap-4 pb-10 sm:pb-16 lg:max-w-1/2 lg:py-16">
		<div class="flex flex-row items-center gap-2">
			<h2 id="my-story" class="scrollsection">{m.my_story()}</h2>

			<Tooltip.Provider>
				<Tooltip.Root disableHoverableContent>
					<Tooltip.Trigger
						class={cn(
							buttonVariants({ variant: 'ghost' }),
							'group relative size-7 items-center justify-center rounded-lg p-1'
						)}
						onclick={() => {
							setLocale(getLocale() === 'fr' ? 'en' : 'fr');
						}}
					>
						<IconLanguage class="absolute size-4 transition-all! group-hover:opacity-0" {stroke} />
						{#if getLocale() === 'en'}
							<FlagFr class="absolute opacity-0 transition-opacity! group-hover:opacity-100" />
						{:else}
							<FlagUk class="absolute opacity-0 transition-opacity! group-hover:opacity-100" />
						{/if}
					</Tooltip.Trigger>
					<Tooltip.Content>
						{m.switch_language()}
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>

		{#if getLocale() === 'fr'}
			<MyStoryFr />
		{:else}
			<MyStoryEn />
		{/if}

		<div class="mt-4 flex flex-col gap-4">
			<h2 id="my-projects" class="scrollsection">{m.my_projects()}</h2>

			<div class="flex w-full scrollbar-none flex-col gap-4 overflow-x-auto">
				{#each projects as project}
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						class="group border-foreground/10 hover:bg-foreground/5 flex flex-row items-center gap-4 rounded-2xl border-2 px-5 py-4 transition-colors hover:border-transparent"
					>
						{#if project.icon}
							<div class="relative">
								<img
									src={project.icon}
									alt={project.name}
									class="size-8 opacity-100 transition-opacity group-hover:opacity-0"
								/>
								<IconExternalLink
									class="text-foreground/70 absolute top-0 right-0 size-8 opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</div>
						{/if}
						<div class="flex w-full flex-col gap-1">
							<div class="flex flex-row items-center justify-between">
								<div
									class="text-foreground flex flex-col text-lg font-medium sm:flex-row sm:items-center sm:gap-4"
								>
									<span>{project.name}</span>
									<div class="flex flex-row items-center gap-2">
										{#if project.stars}
											<span
												class="text-foreground/70 flex flex-row items-center gap-1 text-sm font-medium"
											>
												{project.stars}
												<IconStarFilled class="size-3" {stroke} />
											</span>
										{/if}
										{#if project.forks}
											<span
												class="text-foreground/70 flex flex-row items-center gap-1 text-sm font-medium"
											>
												{project.forks}
												<IconGitFork class="size-3" {stroke} />
											</span>
										{/if}
									</div>
								</div>
								<div
									class={cn(
										'rounded-lg px-2 py-1 text-xs text-nowrap',
										project.kind === 'product'
											? 'bg-blue-500/10 text-blue-500/90'
											: 'bg-green-500/10 text-green-500/90'
									)}
								>
									{project.kind}
								</div>
							</div>
							<div class="text-foreground/70 text-sm">{project.description}</div>
						</div>
					</a>
				{/each}
				<div class="text-foreground/70 text-center text-sm">
					{m.and_more_repositories({ count: (reposCount || projects.length) - projects.length })}
					<Link href="{GITHUB_URL}?tab=repositories">GitHub</Link>
				</div>
			</div>
		</div>

		<div class="mt-4 flex flex-col gap-4">
			<h2 id="my-skills" class="scrollsection">{m.my_skills()}</h2>

			<div class="flex flex-col gap-4">
				{#each skillsCategory as category}
					<div class="flex flex-col gap-2">
						<div class="text-foreground/70 text-sm font-medium">{category.name}</div>
						<div class="flex flex-row flex-wrap items-center gap-4">
							{#each category.skills as skill}
								<div class="flex flex-row items-center gap-1">
									<skill.icon class="size-4" />
									<span>{skill.name}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
