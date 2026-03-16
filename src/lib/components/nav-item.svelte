<script lang="ts">
import { cn } from '$lib/utils';
import { DownloadSimpleIcon, ArrowSquareOutIcon } from 'phosphor-svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';

let {
	children,
	variant = 'external',
	...props
}: { children?: any; variant?: 'external' | 'download' } & HTMLAnchorAttributes = $props();
</script>

<a
	href={props.href}
	{...props}
	class={cn('group relative flex h-8 w-56 items-center justify-start outline-none', props.class)}
>
	<div
		class={cn(
			'absolute -z-10 h-full w-0 transition-all not-sm:w-full group-hover:w-full group-focus-visible:w-full',
			variant === 'external'
				? 'from-muted sm:bg-muted to-transparent not-sm:bg-linear-to-r'
				: 'bg-foreground'
		)}
	></div>
	<div
		class={cn(
			'text-foreground/80 flex w-full items-center gap-4 px-4 transition-colors',
			variant === 'external'
				? 'not-sm:text-foreground group-hover:text-foreground group-focus-visible:text-foreground'
				: 'not-sm:text-black group-hover:text-black group-focus-visible:text-black'
		)}
	>
		{@render children?.()}
		{#if variant === 'external'}
			<ArrowSquareOutIcon
				class="text-muted-foreground size-4 opacity-0 transition-opacity not-sm:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100"
			/>
		{:else if variant === 'download'}
			<DownloadSimpleIcon
				class="text-muted-foreground size-4 opacity-0 transition-opacity not-sm:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100"
			/>
		{/if}
	</div>
</a>
