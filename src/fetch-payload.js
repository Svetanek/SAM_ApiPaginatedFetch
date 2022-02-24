const axios = require("axios")

// import {getPayloadAsync} from './services/utils'

const getPayloadAsync = async (request) =>  {
    try {
        const {data} = await axios.get(request.url, {
          //   headers: {
          //       'cache-control': 'no-cache',
          //       'content-type': 'text/plain'
          //   },
            params: {
                'offset': request.offset,
                'limit': request.limit
            }
        });

        return data;

    } catch (err) {
        console.log('Error', JSON.stringify(err));
        // we are considering this error intermittent and will want to retry it
        // throw retriableErrorFactory.retriablePollerError(err);
    }
}



exports.handler = async (event) => {

    const task = event.task;

    if (!task) {
        console.log('event', event);
        throw new Error("Task cannot be found");
    }

    const payload = await getPayloadAsync({
       url: task.request.url,
       offset: task.request.offset,
       limit: task.request.limit
    });

    // note that if the payloade size is > 256 KB, you will need to store it in S3 first
    // that's what we are doing
    // const storageLocation = await payloadService.savePayloadToS3Async(task.jobId, task.taskId, payload);

    return {
        ...event,
      ...payload
    };
}
