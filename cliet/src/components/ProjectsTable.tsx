import React, { useState } from 'react';
import { Repo } from '../types/Repo';


interface Props {
  repos: any[],
  removeRepo: (id: number) => void
  // reposOwner: string,
  // handleSetReposOwner: (event: React.ChangeEvent<HTMLInputElement>) => void,
  // fetchRepos: () => Promise<void>
}

export const ProjectsTable: React.FC<Props> = ({
  repos,
  removeRepo,
}) => {

  return (
  <>
    <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Project Owner</th>
            <th>Project Name</th>
            <th>Project URL</th>
            <th>Count Stars</th>
            <th>Count Forks</th>
            <th>Count Issues</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {repos.map(item => {
            const {
            projectOwner,
            countForks,
            projectName,
            projectURL,
            countStars,
            countIssues,
            id
          } = item;

            return (
              <tr
                data-cy="person"
                key={id}
                >
                <td>{projectOwner.login}</td>
                <td>{projectName}</td>
                <td>{projectURL}</td>
                <td>{countForks}</td>
                <td>{countStars}</td>
                <td>{countIssues}</td>
                <td>
                  <button
                    type="button"
                    className="button is-success has-text-weight-bold"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="button is-danger has-text-weight-bold"
                    onClick={() => removeRepo(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
    </table>
  </>
  )
};