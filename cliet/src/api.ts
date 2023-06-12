import { Repo } from "./types/Repo";

const API_URL = 'https://api.github.com/users/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getRepos(reposOwner: string): Promise<Repo[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}${reposOwner}/repos`))
    .then(async (response) => {

      const repo = await response.json()

      return repo.map((item: any) => ({
        id: item.id,
        projectOwner: item.owner,
        countForks: item.forks_count,
        projectName: item.name,
        projectURL: item.url,
        countStars: item.stargazers_count,
        countIssues: item.open_issues
      }));
    })
}
