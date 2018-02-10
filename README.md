# Display product orders

## Local DynamoDB & CLI

* Start _Local_ DDB

```shell
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

* To access DynamoDB running locally, use the **--endpoint-url** parameter. The following is an example of using the **AWS CLI** to list the tables in DynamoDB on your computer:

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

* The AWS CLI can't use the downloadable version of DynamoDB as a default endpoint; therefore, you must specify **--endpoint-url** with each AWS CLI command.

* Verify that the AWS CLI installed correctly by running **aws --version.**

```
$ aws --version

  _aws-cli/1.11.84 Python/3.6.2 Linux/4.4.0-59-generic botocore/1.5.47_
```

* The AWS CLI is updated regularly to add support for new services and commands. To update to the latest version of the **AWS CLI**, run the installation command again.

```
$ pip install awscli --upgrade --user
```

* If you need to uninstall the AWS CLI, use pip uninstall.

```
$ pip uninstall awscli
```

* Create Table

  For example, the following command creates a table named Music. The partition key is Artist, and the sort key is SongTitle. (For easier readability, long commands in this section are broken into separate lines.)

```
aws dynamodb create-table \
  --table-name Music \
  --attribute-definitions \
      AttributeName=Artist,AttributeType=S \
      AttributeName=SongTitle,AttributeType=S \
  --key-schema AttributeName=Artist,KeyType=HASH AttributeName=SongTitle,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url http://localhost:8000
```

* The following commands add new items to the table. These examples use a combination of shorthand syntax and JSON.

```
aws dynamodb put-item \
--table-name Music \
--item \
 '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}}' \
--return-consumed-capacity TOTAL \
--endpoint-url http://localhost:8000

aws dynamodb put-item \
--table-name Music \
--item \
 '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today 2"}, "AlbumTitle": {"S": "Somewhat Famous"}}' \
--return-consumed-capacity TOTAL \
--endpoint-url http://localhost:8000

aws dynamodb put-item \
 --table-name Music \
 --item '{"Artist": {"S": "Acme Band"}, "SongTitle": {"S": "Happy Day"}, "AlbumTitle": {"S": "Songs About Life"} }' \
 --return-consumed-capacity TOTAL \
 --endpoint-url http://localhost:8000
```

```
aws dynamodb query --table-name Music --key-conditions \
file:///home/gqq/MyProjects/nodejs/aws_lambda/queries/query_by_partition_sort.json \
--endpoint-url http://localhost:8000

aws dynamodb query --table-name Music --key-conditions \
file:///home/gqq/MyProjects/nodejs/aws_lambda/queries/query_by_partition.json \
--endpoint-url http://localhost:8000
```

* Some useful CLI commands **Describe Table**, **Table Count**

```
aws dynamodb describe-table --table-name MusicCollection --endpoint-url http://localhost:8000
aws dynamodb scan --table-name Music --select "COUNT" --endpoint-url http://localhost:8000
aws dynamodb scan --table-name iot_order --endpoint-url http://localhost:8000
aws dynamodb scan --table-name DevicesData --endpoint-url http://localhost:8000
```
