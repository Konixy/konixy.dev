<script lang="ts">
import { locales, setLocale } from '#lib/paraglide/runtime.js';
import '../app.css';

let { children } = $props();
</script>

{@render children?.()}

<div style="display:none">
	{#each locales as locale (locale)}
		<button
			onclick={() => {
				setLocale(locale);
			}}
		>
			{locale}
		</button>
	{/each}
</div>
