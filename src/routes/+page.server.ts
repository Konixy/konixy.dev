export async function load() {
	const responses = await Promise.all([
		fetch(`https://api.github.com/users/Konixy`),
		fetch(`https://api.github.com/repos/Konixy/better-svelte-email`)
	]);
	if (!responses[0].ok || !responses[1].ok) {
		console.error(`GitHub API error: ${responses[0].status} ${responses[1].status}`);
	}
	const [userData, repoData] = await Promise.all(responses.map((response) => response.json()));

	return {
		reposCount: userData.public_repos,
		avatarUrl: userData.avatar_url,
		starsCount: repoData.stargazers_count,
		forksCount: repoData.forks_count
	};
}
