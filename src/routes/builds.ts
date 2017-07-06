import * as cm from './common';
import * as vm from 'vso-node-api';
import * as ba from 'vso-node-api/BuildApi';
import * as bi from 'vso-node-api/interfaces/BuildInterfaces';

export async function getBuilds() {
    try {
        let vsts: vm.WebApi = await cm.getWebApi();
        let vstsBuild: ba.IBuildApi = vsts.getBuildApi();
        let project = cm.getProject();

        // get top N completed builds 
        let builds: bi.Build[] = await vstsBuild.getBuilds(
            project,
            null,                       // definitions: number[] 
            null,                       // queues: number[]
            null,                       // buildNumber
            null,                       // minFinishTime
            null,                       // maxFinishTime
            null,                       // requestedFor: string
            bi.BuildReason.All,         // reason
            bi.BuildStatus.Completed,
            bi.BuildResult.Succeeded,
            null,                       // tagFilters: string[]
            null,                       // properties: string[]
            //bi.DefinitionType.Build,
            10                          // top: number
        );

        let buildStats: Object[] = [];
        builds.forEach((b: bi.Build) => {
            buildStats.push({
                "id": b.id,
                "project": b.project.name,
                "requestedFor": b.requestedFor.uniqueName,
                "buildNumber": b.buildNumber,
                "sourceBranch": b.sourceBranch,
                "startTime": b.startTime.toUTCString(),
                "finishTime": b.finishTime.toUTCString(),
                "result": bi.BuildResult[b.result],
                "url": b.url,
            })
        });

        return buildStats;
    }
    catch (err) {
        console.error('Error: ' + err.stack);
    }
}

export default getBuilds;