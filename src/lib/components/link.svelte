<script lang="ts">
import { cn } from 'cn';
import type { HTMLAnchorAttributes } from 'svelte/elements';

const { children, ...props }: HTMLAnchorAttributes = $props();
</script>

<a
	class={cn(
		'group relative inline-flex items-center gap-0.5 text-blue-500',
		'after:absolute after:bottom-px after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-500/20',
		'after:transition-all hover:after:bottom-0.5 hover:after:bg-blue-500/70',
		'focus-visible:ring-offset-background rounded-md focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none',
		props.class
	)}
	{...props}
>
	{@render children?.()}

	<!-- {#if props.target === '_blank'}
		<IconArrowUpRight
			class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
			{stroke}
		/>
	{/if} -->
</a>
