
// import {getMetadataAsync, createPollerTasks, taskStateMap} from './services/utils'
const taskStateMap = {
  started: 'STARTED',
  payloadSaved: 'PAYLOADSAVED',
  complete: 'COMPLETE',
  failed: 'FAILED'
}


const getMetadataAsync = async (url) =>  {
  // const result = await getPayloadtAsync({
  //     BaseUrl: url,
  //     StartAt: 0,
  //     Count: 1
  // });

  const offset = 0;
  const limit = 2
  const total = 8;
  return {
      url: url,
      total: total,
      offset: offset,
      limit: limit
  };
}

const createPollerTasks = (metadata) => {
  const tasks = [];

  let index = 0;
  while (index < metadata.total) {
      tasks.push({
          request: {
              offset: index,
              limit: metadata.limit,
              url: metadata.url
          },
          // userId: userId,
          // taskId: uuid.v1(),
          // ttl: ttl
      });
      index += metadata.limit;
  }
  return tasks;
}

  exports.handler = async (event) => {


    // const jobId = event.id;
    const metadata = await getMetadataAsync(event.url);
    const tasks = createPollerTasks(metadata);

    return {
        tasks: tasks,
        taskStateMap: taskStateMap
    };
}



