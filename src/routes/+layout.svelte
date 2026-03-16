<script lang="ts">
import { beforeNavigate, onNavigate } from '$app/navigation';
import '../app.css';

let { children } = $props();

const routeOrder = ['/', '/projects'] as const;

type ViewTransitionDocument = Document & {
	startViewTransition?: (updateCallback: () => Promise<void> | void) => void;
};

function normalizePathname(pathname: string) {
	return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function getRouteIndex(pathname: string) {
	return routeOrder.indexOf(normalizePathname(pathname) as (typeof routeOrder)[number]);
}

beforeNavigate(({ from, to }) => {
	if (!from?.url || !to?.url) return;

	const fromIndex = getRouteIndex(from.url.pathname);
	const toIndex = getRouteIndex(to.url.pathname);

	if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

	document.documentElement.dataset.navDirection = toIndex > fromIndex ? 'forward' : 'back';
});

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
