  const axios = require("axios")

  export class TaskStateMap = {
  constructor() {
    super()
    this.started = 'STARTED',
    this.payloadSaved = 'PAYLOADSAVED',
    this.nqueued = 'ENQUEUED',
    this.complete = 'COMPLETE',
    this.failed = 'FAILED'

  }
}
// export class TaskStateMap {
//   Started: TaskState = TaskState.Started;
//   PayloadSaved: TaskState = TaskState.PayloadSaved;
//   Enqueued: TaskState = TaskState.Enqueued;
//   Complete: TaskState = TaskState.Complete;
//   Failed: TaskState = TaskState.Failed;
// }

// export interface PollerJob {
//   tasks: PollerTask[],
//   taskStateMap: TaskStateMap
// }

//fieldName, offset, itemPerPage
// {appPoolId, totalItems, itemsPerPage, startIndex, currentItemCount}

// export interface PollerTask extends Task {
//   request: PagedRequest
// }
// export const PagedRequest {
//   BaseUrl: string,
//   StartAt: number,
//   Count: number
// }

export const getMetadataAsync = async (url) =>  {
    const result = await executeRequestAsync({
        BaseUrl: url,
        StartAt: 0,
        Count: 1
    });

    return {
        BaseUrl: url,
        MaxRecordsPerPage: result.maxRecordsPerPage,
        TotalRecordsToBeLoaded: result.totalRecords
    };
}

export const getPayloadAsync = async (request) : =>  {
  return await executeRequestAsync(request);
}
//ADD AUTHORIZATION HEADERS
const executeRequestAsync = async (request) => {
      try {
          const result = await axios.get(request.BaseUrl, {
              headers: {
                  'cache-control': 'no-cache',
                  'content-type': 'text/plain'
              },
              params: {
                  'startAt': request.StartAt,
                  'count': request.Count
              }
          });

          return result.data;
      } catch (err) {
          console.log('Error', JSON.stringify(err));
          // we are considering this error intermittent and will want to retry it
          // throw retriableErrorFactory.retriablePollerError(err);
      }
  }
  }

    export const createPollerTasks = (metadata) => {
        // const ttl = this.calculateTimeToLive();
        const tasks = [];

        let index = 0;
        while (index < metadata.TotalRecordsToBeLoaded) {
            tasks.push({
                request: {
                    StartAt: index,
                    Count: metadata.MaxRecordsPerPage,
                    BaseUrl: metadata.BaseUrl
                },
                // jobId: jobId,
                // taskId: uuid.v1(),
                // ttl: ttl
            });
            index += metadata.MaxRecordsPerPage;
        }
        return tasks;
    }





