<script lang="ts">
import { cn } from 'cn';
import type { HTMLAnchorAttributes } from 'svelte/elements';

let { class: className, children, ...props }: HTMLAnchorAttributes = $props();
</script>

<a
	{...props}
	class={cn(
		'text-foreground/70 w-full bg-linear-to-r to-transparent py-1 pl-4 text-lg font-normal tracking-wider transition-colors after:absolute after:left-0 after:h-9 after:w-0.75 after:-translate-y-1 after:rounded-full after:transition-colors lg:max-w-56',
		'hover:not-data-active:after:bg-foreground/20 hover:text-foreground hover:not-data-active:from-foreground/10',
		'data-active:after:bg-foreground data-active:from-foreground/20 data-active:text-foreground',
		className
	)}
>
	{@render children?.()}
</a>
