<script>
import { cn } from 'cn';
let { class: className } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 512 512"
	class={cn('size-5 rounded-sm', className)}
	fill="none"
>
	<path fill="var(--color-blue-500, #0052b4)" d="M0 0h512v512H0z" />
	<path
		fill="var(--color-white, #eeeeee)"
		d="M464 512h48v-48L304 256 512 48V0h-48L256 208 48 0H0v48l208 208L0 464v48h48l208-208z"
	/>
	<path fill="var(--color-white, #eeeeee)" d="M512 320V192H320V0H192v192H0v128h192v192h128V320z" />
	<path fill="var(--color-red-500, #d80027)" d="M512 288v-64H288V0h-64v224H0v64h224v224h64V288z" />
	<path
		fill="var(--color-red-500, #d80027)"
		d="M0 32V0l192 192h-32zm512 448v32L320 320h32zM32 512H0l192-192v32zM480 0h32L320 192v-32z"
	/>
</svg>
