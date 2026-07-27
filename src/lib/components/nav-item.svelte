<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		ArrowSquareOutIcon,
		CheckIcon,
		CopyIcon,
		DownloadSimpleIcon
	} from 'phosphor-svelte';
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		children,
		class: className,
		download,
		icon,
		onclick,
		...props
	}: {
		children?: Snippet;
		icon?: 'external' | 'download' | 'copy';
	} & HTMLAnchorAttributes = $props();

	const resolvedIcon = $derived(icon ?? (download !== undefined ? 'download' : 'external'));
	const isExternal = $derived(resolvedIcon === 'external');
	const showsConfirmFeedback = $derived(resolvedIcon === 'download' || resolvedIcon === 'copy');

	let confirmed = $state(false);
	let confirmTimeout: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => clearTimeout(confirmTimeout));

	function handleClick(event: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		onclick?.(event);

		if (!showsConfirmFeedback) return;

		confirmed = true;
		clearTimeout(confirmTimeout);
		confirmTimeout = setTimeout(() => {
			confirmed = false;
		}, 2000);
	}
</script>

<a
	{...props}
	{download}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener noreferrer' : undefined}
	onclick={handleClick}
	class={cn(
		'group relative flex h-9 w-64 items-center outline-none',
		'focus-visible:ring-foreground/40 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		className
	)}
>
	<span
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
	></span>

	<span
		class="text-foreground/70 group-hover:text-background group-focus-visible:text-background relative z-10 flex w-full items-center justify-between gap-3 px-4 transition-colors duration-300 motion-reduce:transition-none"
	>
		<span class="relative block h-[1.15em] overflow-hidden leading-none">
			<span
				class="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
			>
				{@render children?.()}
			</span>
			<span
				aria-hidden="true"
				class="absolute inset-x-0 top-0 translate-y-full pb-0.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
			>
				{@render children?.()}
			</span>
		</span>

		{#if confirmed}
			<CheckIcon class="size-3.5 shrink-0" />
		{:else if resolvedIcon === 'download'}
			<DownloadSimpleIcon class="size-3.5 shrink-0" />
		{:else if resolvedIcon === 'copy'}
			<CopyIcon class="size-3.5 shrink-0" />
		{:else}
			<ArrowSquareOutIcon class="size-3.5 shrink-0" />
		{/if}
	</span>

	<span
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left scale-x-0 bg-background/50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
	></span>
</a>
