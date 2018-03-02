const res = {
  resource: "/",
  path: "/",
  httpMethod: "POST",
  headers: {
    "Accept-Encoding": "gzip",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "false",
    "CloudFront-Is-Mobile-Viewer": "true",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Content-Type": "text/plain",
    Host: "7x4xxa5z82.execute-api.us-west-2.amazonaws.com",
    "User-Agent":
      "Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus 5 Build/M4B30Z)",
    Via: "1.1 41b2ee7cbe95749816a7586d9ab4629d.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "AG_vKJhrZi5WonVKjIwsFRa9PK-qqsnrrBDU_7SDoSVVjtiPGoTHfA==",
    "X-Amzn-Trace-Id": "Root=1-5a9896c0-a437f57a1a7f4caef61260f7",
    "X-Forwarded-For": "216.38.137.43, 54.239.134.100",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  queryStringParameters: { id: "150102856", timestamp: "2018-03-01-16:11:40" },
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    requestTime: "02/Mar/2018:00:11:44 +0000",
    path: "/rfid",
    accountId: "747472867477",
    protocol: "HTTP/1.1",
    resourceId: "cltercmpq1",
    stage: "rfid",
    requestTimeEpoch: 1519949504034,
    requestId: "4a265024-1dae-11e8-bc78-d9674a874863",
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: "216.38.137.43",
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus 5 Build/M4B30Z)",
      user: null
    },
    resourcePath: "/",
    httpMethod: "POST",
    apiId: "7x4xxa5z82"
  },
  body:
    "000031473336424642355636,E20034120132FB000462CE35141800EE70055FFBFFFFDC50,0000000000000000000000000000000000000000000000000000000000000000,37.3887,-121.9310\n0000314733364245444C444D,E2003412012EF8000B9FECBD180A00EB30055FFBFFFFDC40,0000000000000000000000000000000000000000000000000000000000000000,37.3887,-121.9310\n",
  isBase64Encoded: false
};
