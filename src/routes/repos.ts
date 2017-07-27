import * as cm from './common';
import * as vm from 'vso-node-api';
import * as ga from 'vso-node-api/GitAPI';
import * as gi from 'vso-node-api/interfaces/GitInterfaces';

export async function getRepos(project:string) {
    try {
        let vsts: vm.WebApi = await cm.getWebApi();
        let vstsGit: ga.IGitApi = vsts.getGitApi();
        let vstsProject = cm.getProject(project);

        let vstsRepos: gi.GitRepository[] = await vstsGit.getRepositories(vstsProject);

        let repos: Object[] = [];
        vstsRepos.forEach((r: gi.GitRepository) => {
            repos.push( {
                "id": r.id,
                "name": r.name,
                "projectDescription": r.project.description,
                "url": r.url,
            })
        })

        return repos;
    }
    catch (err) {
        console.error('Error: ' + err.stack);
    }
}

export default getRepos;