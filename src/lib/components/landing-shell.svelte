<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		footer,
		pageId
	}: {
		children?: Snippet;
		footer?: Snippet;
		pageId: 'home' | 'projects';
	} = $props();
</script>

<div class="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-10">
	<div
		class="vt-shell border-foreground/20 flex flex-col items-center justify-center gap-10 border py-10 px-6 text-center"
	>
		<div class="vt-profile flex w-full flex-row items-center justify-center gap-6">
			<img
				src="https://github.com/Konixy.png"
				alt="Anatole Dufour"
				class="pointer-events-none size-16 rounded-full select-none"
			/>
			<div class="text-foreground text-left text-2xl font-medium tracking-normal">
				Anatole<br /><span class="text-foreground/60">Dufour</span>
			</div>
		</div>

		<div
			class="flex w-full flex-col items-center gap-4"
			style={`view-transition-name: content-${pageId}`}
		>
			{@render children?.()}
		</div>
	</div>

	<div class="flex min-h-6 items-center" style={`view-transition-name: footer-${pageId}`}>
		{@render footer?.()}
	</div>
</div>
