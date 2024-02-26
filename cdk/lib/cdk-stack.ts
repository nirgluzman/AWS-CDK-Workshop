import { App, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { HitCounter } from './hitcounter';
import { TableViewer } from 'cdk-dynamo-table-viewer';
import path = require('path');

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // define an AWS Lambda resource.
    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_16_X, // execution environment
      code: Code.fromAsset(path.join(__dirname, '..', 'lambda')), // code loaded from "lambda" folder
      handler: 'hello.handler' // file is "hello", function is "handler"
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // define an API Gateway REST API resource backed by "hello" function, using Lambda proxy integration.
    new LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

    // CDK construct which exposes a public HTTP endpoint which displays an HTML page with the contents of a DynamoDB table in your stack.
    // https://www.npmjs.com/package/cdk-dynamo-table-viewer
    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table
    });
  }
}
