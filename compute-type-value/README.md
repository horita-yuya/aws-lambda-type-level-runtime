```shell
node dist/compute-type-value.js sampleIndex.Handler '{"n1":1,"n2":2}'  "$(pwd)"
```


```shell
 aws lambda invoke --function-name tlrt-sample --payload '{"n1": 15, "n2": 102}' --cli-binary-format raw-in-base64-out /tmp/res.json && cat /tmp/res.json | jq
```