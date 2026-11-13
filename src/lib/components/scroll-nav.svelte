<script lang="ts">
import { cn } from 'cn';
import type { HTMLAnchorAttributes } from 'svelte/elements';

let { class: className, children, ...props }: HTMLAnchorAttributes = $props();
</script>

<a
	{...props}
	class={cn(
		'text-foreground/70 hover:text-foreground data-active:from-foreground/20 hover:from-foreground/10 data-active:text-foreground w-full bg-linear-to-r to-transparent py-1 pl-4 text-lg font-normal tracking-wider transition-colors lg:max-w-56',
		'hover:after:bg-foreground/20 data-active:after:bg-foreground after:absolute after:left-0 after:h-9 after:w-0.75 after:-translate-y-1 after:rounded-full after:transition-colors',
		className
	)}
>
	{@render children?.()}
</a>
