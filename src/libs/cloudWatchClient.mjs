import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";

const cwClient = new CloudWatchClient({});

export { cwClient };
