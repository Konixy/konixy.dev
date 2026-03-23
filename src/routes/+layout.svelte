<script lang="ts">
import { onNavigate } from '$app/navigation';
import '../app.css';

let { children } = $props();

type ViewTransitionDocument = Document & {
	startViewTransition?: (updateCallback: () => Promise<void> | void) => void;
};

onNavigate((navigation) => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const viewTransitionDocument = document as ViewTransitionDocument;

	if (!viewTransitionDocument.startViewTransition) return;

	return new Promise<void>((resolve) => {
		viewTransitionDocument.startViewTransition!(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

{@render children?.()}
