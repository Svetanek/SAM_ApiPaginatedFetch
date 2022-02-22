import { PayloadService } from '../services/payload-service';
import { PayloadProxyService } from '../services/payload-proxy-service';
import { AwsProxy } from '../common/aws-proxy';
import { ParamResolver } from '../common/params-resolver';
import { PollerTask } from '../common/models';





// const paramResolver = new ParamResolver();
// const awsProxy = new AwsProxy(paramResolver);
// const payloadService = new PayloadService(awsProxy, paramResolver);

// const payloadProxyService = new PayloadProxyService();




export const handler = async (event) => {

    const task = event.task;

    if (!task) {
        console.log('event', event);
        throw new Error("Task cannot be found");
    }

    const payload = await getPayloadAsync({
       BaseUrl: task.request.BaseUrl,
       Count: task.request.Count,
       StartAt: task.request.StartAt
    });

    // note that if the payloade size is > 256 KB, you will need to store it in S3 first
    // that's what we are doing
    // const storageLocation = await payloadService.savePayloadToS3Async(task.jobId, task.taskId, payload);

    return {
        ...event,
      ...payload
    };
}


// getPayloadAsync = async (request: PagedRequest) : Promise<any> =>  {
//         return await this.executeRequestAsync(request);
//     }

//     private executeRequestAsync = async (request: PagedRequest) : Promise<any> => {
//         try {
//             const result = await axios.get(request.BaseUrl, {
//                 headers: {
//                     'cache-control': 'no-cache',
//                     'content-type': 'text/plain'
//                 },
//                 params: {
//                     'startAt': request.StartAt,
//                     'count': request.Count
//                 }
//             });

//             return result.data;
//         } catch (err) {
//             console.log('Error', JSON.stringify(err));
//             // we are considering this error intermittent and will want to retry it
//             throw retriableErrorFactory.retriablePollerError(err);
//         }
//     }
// }
