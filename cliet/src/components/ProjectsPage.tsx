import React, { useState } from 'react';
import { ProjectsTable } from './ProjectsTable';
import { getRepos } from '../api';
import { Repo } from '../types/Repo';
import { Loader } from './Loader';

export const ProjectsPage: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposOwner, setReposOwner] = useState('');

  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const reposMesageError = !isLoading && !fetchError && !repos.length;
  const isRepos = !isLoading && !!repos.length;


  const handleSetReposOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReposOwner(event.target.value)
  }

  const removeRepo = (id: number) => {
    const updatedRepo = repos.filter(item => item.id !== id);

    setRepos(updatedRepo);
  }

  const fetchRepos = async () => {
    try {
      setRepos([]);
      setIsLoading(true)

      const repoFromServer = await getRepos(reposOwner)
      setRepos(repoFromServer);
    } catch(err) {
      setFetchError(true);
    } finally {
      setFetchError(false);
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="block">
        <div className="box table-container">

          <div className="field">
            <input
              placeholder="Write a Github owner name"
              className='input'
              required
              value={reposOwner}
              onChange={handleSetReposOwner}
            />
            <button
              className='button is-success has-text-weight-bold'
              onClick={fetchRepos}
            >
              Search
            </button>
          </div>

          {isLoading && (
            <Loader />
          )}

          {fetchError && (
            <p className="has-text-danger">
              Something went wrong
            </p>
          )}

          {reposMesageError && (
            <p>There are no repos on this owner</p>
          )}

          {isRepos && (
            <ProjectsTable
              repos={repos}
              removeRepo={removeRepo}
            />
          )}
        </div>
      </div>
    </>
  )
};