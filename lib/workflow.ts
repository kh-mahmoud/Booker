import {Client as WorkflowClient} from "@upstash/workflow"
import {Client as QStashClient} from "@upstash/qstash"

import config from "./config"


export const workflowClient = new WorkflowClient({
    baseUrl:config.env.upshatsh.qstashUrl,
    token:config.env.upshatsh.qstashToken
})


export const qstashClient = new QStashClient({
    token:config.env.upshatsh.qstashToken
})