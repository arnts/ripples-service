import * as cm from './common';
import * as vm from 'vso-node-api';
import * as ga from 'vso-node-api/GitAPI';
import * as gi from 'vso-node-api/interfaces/GitInterfaces';

export async function getCommits(project:string, repositoryId: string) {
    try {
        let vsts: vm.WebApi = await cm.getWebApi();
        let vstsGit: ga.IGitApi = vsts.getGitApi();
        let vstsProject = cm.getProject(project);

        let vstsCommits: gi.GitCommitRef[] = await vstsGit.getCommits(
            repositoryId,       // string
            null,               // GitQueryCommitsCriteria
            vstsProject,        // project: string
            null,               // skip: number
            null,               // top: number
        )

        let commits: Object[] = [];
        vstsCommits.forEach((c: gi.GitCommitRef) => {
            commits.push({
                "commitId": c.commitId,
                "comment": c.comment,
                "committerName": c.committer.name,
                "committerEmail": c.committer.email,
                "committerDate": c.committer.date.toUTCString(),
                "changeCountsAdd": c.changeCounts['Add'],
                "changeCountsDelete": c.changeCounts['Delete'],
                "changeCountsEdit": c.changeCounts['Edit'],
                "url": c.url,
            })
        })
        return commits;
    }
    catch (err) {
        console.error('Error: ' + err.stack);
    }
}

export default getCommits;