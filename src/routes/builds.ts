import * as cm from './common';
import * as vm from 'vso-node-api';
import * as ba from 'vso-node-api/BuildApi';
import * as bi from 'vso-node-api/interfaces/BuildInterfaces';

export async function getBuilds(project: string, defs: string, top: number = 10) {
    try {
        let vsts: vm.WebApi = await cm.getWebApi();
        let vstsBuild: ba.IBuildApi = vsts.getBuildApi();
        let vstsProject = cm.getProject(project);
        let vstsBuildDefs: number[] = null;

        if (defs) {
            let strArr: string[] = defs.split(',');
            vstsBuildDefs = [];
            for (let i in strArr) {
                vstsBuildDefs.push(parseInt(strArr[i]));
            }
        }
        
        // get top N completed builds 
        let vstsBuilds: bi.Build[] = await vstsBuild.getBuilds(
            vstsProject,
            vstsBuildDefs,              // definitions: number[] 
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
            top                         // top: number
        );

        let builds: Object[] = [];
        vstsBuilds.forEach((b: bi.Build) => {
            builds.push({
                "id": b.id,
                "project": b.project.name,
                "requestedFor": b.requestedFor.uniqueName,
                "buildNumber": b.buildNumber,
                "sourceBranch": b.sourceBranch,
                "startTime": b.startTime.toUTCString(),
                "finishTime": b.finishTime.toUTCString(),
                "result": bi.BuildResult[b.result],
                "url": b.url,
                "buildDefId": b.definition.id,
                "buildDefName": b.definition.name,
            })
        });

        return builds;
    }
    catch (err) {
        console.error('Error: ' + err.stack);
    }
}

export default getBuilds;