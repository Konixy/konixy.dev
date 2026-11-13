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
	<path fill="var(--color-white, #eeeeee)" d="M376 0v512H136V0z" />
	<path fill="var(--color-blue-500, #002266)" d="M168 0v512H0V0z" />
	<path fill="var(--color-red-500, #d80027)" d="M512 0v512H344V0z" />
</svg>
