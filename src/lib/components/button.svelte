<script lang="ts" module>
import { cn } from 'cn';
import type { WithElementRef } from '$lib/utils';
import { type VariantProps, tv } from 'tailwind-variants';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

const buttonVariants = tv({
	base: cn(
		'group relative flex w-fit items-center justify-between gap-2 rounded-xl text-sm font-normal transition-all outline-none',
		'[&>svg]:animate-in [&>svg]:fade-in [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-colors',
		'focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2'
	),
	variants: {
		variant: {
			default: cn(
				'bg-foreground/10 text-foreground/80',
				'hover:bg-foreground/15 hover:text-foreground'
			),
			primary: cn('bg-foreground text-background', 'hover:bg-foreground/80 hover:text-background'),
			outline: cn(
				'border-2 border-foreground/20 text-foreground/80',
				'hover:bg-foreground/15 hover:text-foreground hover:border-transparent',
				'[&>svg]:text-muted-foreground hover:[&>svg]:text-foreground'
			),
			ghost: cn(
				'hover:bg-foreground/10 hover:text-foreground',
				'[&>svg]:text-muted-foreground hover:[&>svg]:text-foreground'
			)
		},
		size: {
			default: 'px-3 py-2',
			icon: 'p-2'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
	WithElementRef<HTMLAnchorAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		icon?: 'external' | 'download' | 'copy';
		external?: boolean;
	};
</script>

<script lang="ts">
import { IconCheck, IconCopy, IconDownload, IconExternalLink } from '@tabler/icons-svelte';
import { onDestroy } from 'svelte';
import { stroke } from '$lib/constants';

let {
	variant = 'default',
	size = 'default',
	ref = $bindable(null),
	href = undefined,
	type = 'button',
	disabled,
	children,
	class: className,
	icon,
	external = true,
	onclick,
	...props
}: ButtonProps = $props();

const showsConfirmFeedback = $derived(icon === 'download' || icon === 'copy');

let confirmed = $state(false);
let confirmTimeout: ReturnType<typeof setTimeout> | undefined;

onDestroy(() => clearTimeout(confirmTimeout));

function handleClick(
	event: MouseEvent & { currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement) }
) {
	onclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });

	if (!showsConfirmFeedback) return;

	confirmed = true;
	clearTimeout(confirmTimeout);
	confirmTimeout = setTimeout(() => {
		confirmed = false;
	}, 2000);
}
</script>

{#if href}
	<a
		{...props}
		{href}
		{type}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		onclick={handleClick}
		class={cn(buttonVariants({ variant, size }), className)}
	>
		{@render children?.()}
		{@render buttonIcon()}
	</a>
{:else}
	<button
		{...props}
		{type}
		{disabled}
		onclick={handleClick}
		class={cn(buttonVariants({ variant, size }), className)}
	>
		{@render children?.()}
		{@render buttonIcon()}
	</button>
{/if}

{#snippet buttonIcon()}
	{#if confirmed}
		<IconCheck {stroke} />
	{:else if icon === 'download'}
		<IconDownload {stroke} />
	{:else if icon === 'copy'}
		<IconCopy {stroke} />
	{:else if icon === 'external'}
		<IconExternalLink {stroke} />
	{/if}
{/snippet}
