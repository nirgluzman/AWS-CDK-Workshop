import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // define an AWS Lambda resource
    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_16_X, // execution environment
      code: Code.fromAsset('lambda'), // code loaded from "lambda" folder
      handler: 'hello.handler' // file is "hello", function is "handler"
    });
  }
}
