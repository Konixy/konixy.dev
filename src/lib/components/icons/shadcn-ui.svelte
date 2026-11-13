<script lang="ts">
import type { SVGAttributes } from 'svelte/elements';

let props: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
	<line
		x1="208"
		y1="128"
		x2="128"
		y2="208"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="28"
	/>
	<line
		x1="192"
		y1="40"
		x2="40"
		y2="192"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="28"
	/>
</svg>
