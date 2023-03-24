import boto3

# Connect to the AWS services
lambda_client = boto3.client('lambda')
apigateway_client = boto3.client('apigateway')

# Define the API Gateway endpoint configuration
rest_api_name = 'my-rest-api'
lambda_function_name = 'my-lambda-function'
resource_path = '/my-resource'
http_method = 'POST'

# Create the API Gateway endpoint
rest_api = apigateway_client.create_rest_api(name=rest_api_name)
resource = apigateway_client.create_resource(restApiId=rest_api['id'], pathPart=resource_path.lstrip('/'))
method = apigateway_client.put_method(restApiId=rest_api['id'], resourceId=resource['id'], httpMethod=http_method, authorizationType='NONE')
apigateway_client.put_integration(restApiId=rest_api['id'], resourceId=resource['id'], httpMethod=http_method, integrationHttpMethod=http_method, type='AWS_PROXY', uri=f'arn:aws:apigateway:{region}:lambda:path/2015-03-31/functions/{lambda_function_arn}/invocations')
apigateway_client.create_deployment(restApiId=rest_api['id'], stageName='prod')
