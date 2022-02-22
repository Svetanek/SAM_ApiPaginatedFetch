import { PollerJob, TaskStateMap } from '../services/models';
import { ParamResolver } from '../services/params-resolver';
import { AwsProxy } from '../services/aws-proxy';
import { PayloadProxyService } from '../services/payload-proxy-service';
import { JobService } from '../services/job-service';

// const paramResolver = new ParamResolver();
// const awsProxy = new AwsProxy(paramResolver);
// const jobService = new JobService(awsProxy, paramResolver);
// const payloadProxyService = new PayloadProxyService();


/// tasks = [{start: 0, count: 20, url}, {start: 20, count: 20, url}...]

const users = [];
const ItemsPerPage = 50;
``
  export const handler = async (event) => {


    // const jobId = event.id;
    const metadata = await getMetadataAsync(event.url, ecent.users);
    const tasks = createPollerTasks(metadata);

    return {
        tasks: tasks,
        taskStateMap: new TaskStateMap()
    };
}



