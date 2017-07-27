import * as vm from 'vso-node-api';
import * as lim from 'vso-node-api/interfaces/LocationsInterfaces';

function getEnv(name: string): string {
    let val = process.env[name];
    if (!val) {
        console.error(name + ' env var not set');
        process.exit(1);
    }
    return val;
}

export async function getWebApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
        try {
            let serverUrl = getEnv('API_URL');
            let token = getEnv('API_TOKEN');
            let authHandler = vm.getPersonalAccessTokenHandler(token);

            let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler);
            let connData: lim.ConnectionData = await vsts.connect();
            resolve(vsts);
        }
        catch (err) {
            reject(err);
        }
    });
}

export function getProject(proj: string): string {
    if (proj) {
        return proj;
    } else {
        return getEnv('API_PROJECT');
    }
}