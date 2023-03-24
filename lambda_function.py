# create an AWS Lambda function to handle the incoming API requests.
# use the AWS SDK for Python (boto3) to interact with other AWS services.

import boto3

# Connect to the AWS services
lambda_client = boto3.client('lambda')
dynamodb_client = boto3.client('dynamodb')

# Define the Lambda function handler
def lambda_handler(event, context):
  # Perform application logic
  # ...

  # Write the data to DynamoDB
  dynamodb_client.put_item(
    TableName='my-table',
    Item={
      'id': {'S': '123'},
      'data': {'S': 'Hello, world!'}
    }
  )

  # Return a response
  response = {
    'statusCode': 200,
    'body': 'Success'
  }
  return response
