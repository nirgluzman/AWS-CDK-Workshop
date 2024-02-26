import { App, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
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

    // define an API Gateway REST API resource backed by "hello" function, using Lambda proxy integration.
    new LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
